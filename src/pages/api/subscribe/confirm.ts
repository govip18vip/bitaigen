// src/pages/api/subscribe/confirm.ts
// ─────────────────────────────────────────────────────────────
// Double opt-in confirmation endpoint.
//
// GET /api/subscribe/confirm?token=<signed-token>
//
// Flow:
//   1. Verify signature + expiry
//   2. Check replay — markUsed() with 7-day TTL
//   3. Add email to Resend audience (non-fatal on error — we still welcome)
//   4. Send welcome email with unsubscribe link
//   5. 302 redirect to /subscribe/confirmed?lang=<lang>
//
// Any failure redirects to /subscribe/error with a reason param.
// ─────────────────────────────────────────────────────────────

export const prerender = false;

import type { APIRoute } from "astro";
import { markUsed, rateLimit } from "@/utils/rateLimit";
import { createToken, replayKey, verifyToken } from "@/utils/subscribeTokens";
import { buildWelcomeHtml, WELCOME_CONTENT, normalizeLang } from "@/utils/subscribeEmails";

// Token is single-use — 7-day replay window covers late clicks (token itself
// only lasts 24h, but a user might click the same link twice within a few days).
const REPLAY_TTL_SEC = 60 * 60 * 24 * 7;

// Unsubscribe link shouldn't be short-lived — 10 years effective permanent
const UNSUB_TTL_SEC = 60 * 60 * 24 * 365 * 10;

function redirect(origin: string, path: string, params: Record<string, string> = {}): Response {
  const qs = new URLSearchParams(params).toString();
  const url = `${origin}${path}${qs ? `?${qs}` : ""}`;
  return new Response(null, { status: 302, headers: { Location: url } });
}

export const GET: APIRoute = async ({ request, clientAddress, url }) => {
  const origin = url.origin;

  // Mild rate limit — legitimate users click once. Abusers hitting this
  // endpoint with forged tokens get throttled.
  const ip = clientAddress || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rl = await rateLimit(`confirm:${ip}`, { max: 20, windowSec: 600 });
  if (rl.limited) {
    return redirect(origin, "/subscribe/error", { reason: "rate_limited" });
  }

  const token = url.searchParams.get("token");
  if (!token) {
    return redirect(origin, "/subscribe/error", { reason: "missing_token" });
  }

  const verify = verifyToken(token, "confirm");
  if (!verify.ok || !verify.payload) {
    return redirect(origin, "/subscribe/error", { reason: verify.reason ?? "invalid" });
  }

  const { e: email, l: lang, n: nonce } = verify.payload;
  const langKey = normalizeLang(lang);

  // ── Replay protection ─────────────────────────────────────
  const { alreadyUsed } = await markUsed(replayKey(verify.payload), REPLAY_TTL_SEC);
  if (alreadyUsed) {
    // Friendly: treat double-click as success, but don't re-send welcome email.
    return redirect(origin, "/subscribe/confirmed", { lang: langKey, replayed: "1" });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL;
  const audienceId = import.meta.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !fromEmail) {
    console.error("[confirm] Resend not configured");
    return redirect(origin, "/subscribe/error", { reason: "not_configured" });
  }

  const resendHeaders = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  // ── 1. Add to Resend audience ─────────────────────────────
  if (audienceId) {
    try {
      const res = await fetch(
        `https://api.resend.com/audiences/${audienceId}/contacts`,
        {
          method: "POST",
          headers: resendHeaders,
          body: JSON.stringify({ email, unsubscribed: false }),
          signal: AbortSignal.timeout(8000),
        },
      );
      if (!res.ok) {
        const err = await res.text().catch(() => "");
        console.warn("[confirm] audience add failed:", res.status, err);
        // Non-fatal — already-subscribed (409) is fine
      }
    } catch (err) {
      console.warn("[confirm] audience add error:", err);
    }
  }

  // ── 2. Build one-click unsubscribe token + URL ────────────
  let unsubToken = "";
  try {
    unsubToken = createToken("unsub", email, langKey, UNSUB_TTL_SEC);
  } catch (err) {
    console.warn("[confirm] unsub token creation failed:", err);
  }
  const unsubscribeUrl = unsubToken
    ? `${origin}/api/unsubscribe?token=${encodeURIComponent(unsubToken)}`
    : `${origin}/api/unsubscribe?email=${encodeURIComponent(email)}`;

  // ── 3. Send welcome email (non-fatal on error) ────────────
  try {
    const content = WELCOME_CONTENT[langKey];
    const html = buildWelcomeHtml(langKey, unsubscribeUrl, new Date().getFullYear());

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: resendHeaders,
      body: JSON.stringify({
        from:    `Bitaigen <${fromEmail}>`,
        to:      [email],
        subject: content.subject,
        html,
        headers: {
          "List-Unsubscribe":      `<${unsubscribeUrl}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!emailRes.ok) {
      const errText = await emailRes.text().catch(() => "");
      console.warn("[confirm] welcome email failed:", errText);
    }
  } catch (err) {
    console.warn("[confirm] welcome email error:", err);
  }

  // Unused variable guard (nonce referenced above via replayKey)
  void nonce;

  return redirect(origin, "/subscribe/confirmed", { lang: langKey });
};
