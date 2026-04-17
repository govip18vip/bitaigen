// src/pages/api/subscribe.ts
// ─────────────────────────────────────────────────────────────
// Newsletter subscription — Double opt-in (GDPR / CAN-SPAM compliant)
//
// POST /api/subscribe  { email: string, lang?: string }
//
// Flow:
//   1. Rate-limit by IP (5 req / 10 min) — Upstash if configured, else in-memory
//   2. Validate email + honeypot
//   3. Issue signed HMAC token (24h expiry)
//   4. Send confirmation email with link to /api/subscribe/confirm?token=...
//   5. Return 202 { pending: true } — NOT yet added to Resend audience
//
// The actual audience write + welcome email happens in /api/subscribe/confirm
// once the recipient proves ownership of the email address.
// ─────────────────────────────────────────────────────────────

export const prerender = false;

import type { APIRoute } from "astro";
import { rateLimit } from "@/utils/rateLimit";
import { createToken } from "@/utils/subscribeTokens";
import { buildConfirmHtml, CONFIRM_CONTENT, normalizeLang } from "@/utils/subscribeEmails";

const CONFIRM_TTL_SEC = 60 * 60 * 24; // 24 hours

export const POST: APIRoute = async ({ request, clientAddress, url }) => {
  const headers = { "Content-Type": "application/json" };

  // ── Rate limiting ─────────────────────────────────────────
  const ip = clientAddress || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rl = await rateLimit(`subscribe:${ip}`, { max: 5, windowSec: 600 });
  if (rl.limited) {
    return new Response(
      JSON.stringify({ error: "rate_limited", retryAfter: rl.resetInSeconds }),
      { status: 429, headers: { ...headers, "Retry-After": String(rl.resetInSeconds) } },
    );
  }

  // ── Parse body ────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid_body" }), { status: 400, headers });
  }

  // ── Honeypot check — bots fill hidden fields ──────────────
  if (body.website) {
    // Silently pretend success to fool bots (but do nothing real)
    return new Response(JSON.stringify({ success: true, pending: true }), { status: 200, headers });
  }

  const rawEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const lang = normalizeLang(body.lang);

  // ── Validate email ────────────────────────────────────────
  if (!rawEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail) || rawEmail.length > 254) {
    return new Response(JSON.stringify({ error: "invalid_email" }), { status: 400, headers });
  }

  // ── Check API key ─────────────────────────────────────────
  const apiKey = import.meta.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL;
  if (!apiKey || !fromEmail) {
    console.error("[subscribe] RESEND_API_KEY or RESEND_FROM_EMAIL not configured");
    return new Response(JSON.stringify({ error: "not_configured" }), { status: 500, headers });
  }

  // ── Issue confirmation token + build link ─────────────────
  let token: string;
  try {
    token = createToken("confirm", rawEmail, lang, CONFIRM_TTL_SEC);
  } catch (err) {
    console.error("[subscribe] token creation failed:", err);
    return new Response(JSON.stringify({ error: "server_error" }), { status: 500, headers });
  }

  const origin = url.origin; // e.g. https://bitaigen.com
  const confirmUrl = `${origin}/api/subscribe/confirm?token=${encodeURIComponent(token)}`;

  // ── Send confirmation email ───────────────────────────────
  const content = CONFIRM_CONTENT[lang];
  const html = buildConfirmHtml(lang, confirmUrl, new Date().getFullYear());

  try {
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:    `Bitaigen <${fromEmail}>`,
        to:      [rawEmail],
        subject: content.subject,
        html,
        // RFC 8058: one-click unsubscribe — relevant once the user is actually
        // subscribed. We still include a header here pointing to the site in case
        // the confirmation email itself gets reported as spam.
        headers: {
          "List-Unsubscribe":      `<${origin}/api/unsubscribe?email=${encodeURIComponent(rawEmail)}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text().catch(() => "");
      console.error("[subscribe] confirmation email failed:", emailRes.status, errText);
      return new Response(JSON.stringify({ error: "send_failed" }), { status: 502, headers });
    }
  } catch (err) {
    console.error("[subscribe] unexpected error:", err);
    return new Response(JSON.stringify({ error: "server_error" }), { status: 500, headers });
  }

  // 202 Accepted — request received, pending confirmation
  return new Response(
    JSON.stringify({ success: true, pending: true }),
    { status: 202, headers },
  );
};
