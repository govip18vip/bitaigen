// src/pages/api/unsubscribe.ts
// ─────────────────────────────────────────────────────────────
// Unsubscribe endpoint — supports both click-from-email (GET) and
// RFC 8058 one-click (POST with List-Unsubscribe-Post header).
//
//   GET  /api/unsubscribe?token=<signed-unsub-token>
//   GET  /api/unsubscribe?email=<email>           (fallback, less secure — only
//                                                  for cases where token issuance
//                                                  failed at confirm-time)
//   POST /api/unsubscribe?token=<signed-unsub-token>
//
// Flow:
//   1. Verify token (or accept raw email + rate-limit heavily)
//   2. Remove from Resend audience — look up contact, then DELETE
//   3. For GET: 302 redirect to /subscribe/unsubscribed
//   4. For POST: 200 JSON { success: true }
// ─────────────────────────────────────────────────────────────

export const prerender = false;

import type { APIRoute } from "astro";
import { rateLimit } from "@/utils/rateLimit";
import { verifyToken } from "@/utils/subscribeTokens";
import { normalizeLang, type Lang } from "@/utils/subscribeEmails";

function redirect(origin: string, path: string, params: Record<string, string> = {}): Response {
  const qs = new URLSearchParams(params).toString();
  const url = `${origin}${path}${qs ? `?${qs}` : ""}`;
  return new Response(null, { status: 302, headers: { Location: url } });
}

async function resolveTarget(
  request: Request,
  searchParams: URLSearchParams,
  clientAddress: string | undefined,
): Promise<{ ok: true; email: string; lang: Lang } | { ok: false; reason: string; status: number }> {
  const ip = clientAddress || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  const token = searchParams.get("token");
  if (token) {
    const verify = verifyToken(token, "unsub");
    if (!verify.ok || !verify.payload) {
      return { ok: false, reason: verify.reason ?? "invalid", status: 400 };
    }
    return { ok: true, email: verify.payload.e, lang: normalizeLang(verify.payload.l) };
  }

  // Email-only fallback — throttle aggressively because it's lower security
  const email = searchParams.get("email")?.trim().toLowerCase();
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254) {
    const rl = await rateLimit(`unsub:${ip}`, { max: 3, windowSec: 600 });
    if (rl.limited) {
      return { ok: false, reason: "rate_limited", status: 429 };
    }
    return { ok: true, email, lang: normalizeLang(searchParams.get("lang")) };
  }

  return { ok: false, reason: "missing_params", status: 400 };
}

async function removeFromResend(email: string): Promise<boolean> {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const audienceId = import.meta.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    console.warn("[unsubscribe] Resend audience not configured");
    return false;
  }

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  try {
    // Resend supports DELETE by email directly:
    // DELETE /audiences/{audience_id}/contacts/{email}
    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts/${encodeURIComponent(email)}`,
      {
        method: "DELETE",
        headers,
        signal: AbortSignal.timeout(8000),
      },
    );
    // 200 = removed, 404 = wasn't subscribed (treat as success)
    if (res.ok || res.status === 404) return true;

    const errText = await res.text().catch(() => "");
    console.warn("[unsubscribe] DELETE failed, trying UPDATE fallback:", res.status, errText);

    // Fallback: mark as unsubscribed (preserves record for compliance audit)
    const patchRes = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts/${encodeURIComponent(email)}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ unsubscribed: true }),
        signal: AbortSignal.timeout(8000),
      },
    );
    return patchRes.ok;
  } catch (err) {
    console.warn("[unsubscribe] resend error:", err);
    return false;
  }
}

export const GET: APIRoute = async ({ request, clientAddress, url }) => {
  const target = await resolveTarget(request, url.searchParams, clientAddress);
  if (!target.ok) {
    return redirect(url.origin, "/subscribe/error", { reason: target.reason });
  }
  await removeFromResend(target.email);
  return redirect(url.origin, "/subscribe/unsubscribed", { lang: target.lang });
};

export const POST: APIRoute = async ({ request, clientAddress, url }) => {
  const headers = { "Content-Type": "application/json" };
  const target = await resolveTarget(request, url.searchParams, clientAddress);
  if (!target.ok) {
    return new Response(JSON.stringify({ error: target.reason }), { status: target.status, headers });
  }
  const ok = await removeFromResend(target.email);
  return new Response(
    JSON.stringify({ success: ok }),
    { status: ok ? 200 : 502, headers },
  );
};
