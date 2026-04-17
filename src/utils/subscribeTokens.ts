// src/utils/subscribeTokens.ts
// ─────────────────────────────────────────────────────────────
// HMAC-signed, stateless tokens for email confirmation & unsubscribe.
//
// Token format (base64url):
//   payload = { t: "confirm" | "unsub", e: email, l: lang, x: expiryUnix, n: nonce }
//   signature = HMAC-SHA256(secret, JSON(payload))
//   token = b64url(JSON.stringify({ ...payload, s: signature }))
//
// Secret: SUBSCRIBE_TOKEN_SECRET env var. Falls back to a build-time derived
// secret from RESEND_API_KEY (last 32 chars) so local dev without extra config
// still works — in production you MUST set SUBSCRIBE_TOKEN_SECRET.
// ─────────────────────────────────────────────────────────────

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export type TokenType = "confirm" | "unsub";

export interface TokenPayload {
  t: TokenType;
  e: string;    // email (lowercased)
  l: string;    // lang
  x: number;    // expiry unix seconds
  n: string;    // nonce — 12 bytes hex for replay dedupe
}

interface SignedToken extends TokenPayload {
  s: string;    // signature
}

function b64urlEncode(buf: Buffer | string): string {
  const b = typeof buf === "string" ? Buffer.from(buf, "utf8") : buf;
  return b.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(s: string): Buffer {
  const pad = "=".repeat((4 - (s.length % 4)) % 4);
  return Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

function getSecret(): string {
  const explicit = import.meta.env.SUBSCRIBE_TOKEN_SECRET;
  if (explicit && explicit.length >= 16) return explicit;

  // Dev fallback — derive from RESEND key so local dev still works without
  // extra config. Production MUST set SUBSCRIBE_TOKEN_SECRET explicitly.
  const fallback = import.meta.env.RESEND_API_KEY;
  if (fallback && fallback.length >= 16) {
    console.warn(
      "[subscribeTokens] SUBSCRIBE_TOKEN_SECRET not set — using RESEND_API_KEY-derived fallback. " +
      "Set SUBSCRIBE_TOKEN_SECRET in production for proper key rotation.",
    );
    return fallback.slice(-32);
  }

  throw new Error(
    "SUBSCRIBE_TOKEN_SECRET not configured. Set a 32+ char random secret in env.",
  );
}

function sign(payload: TokenPayload): string {
  const secret = getSecret();
  const canonical = `${payload.t}|${payload.e}|${payload.l}|${payload.x}|${payload.n}`;
  return createHmac("sha256", secret).update(canonical).digest("base64url");
}

/** Create a signed token valid for `ttlSec` seconds. */
export function createToken(
  type: TokenType,
  email: string,
  lang: string,
  ttlSec: number,
): string {
  const payload: TokenPayload = {
    t: type,
    e: email.toLowerCase().trim(),
    l: lang,
    x: Math.floor(Date.now() / 1000) + ttlSec,
    n: randomBytes(12).toString("hex"),
  };
  const signed: SignedToken = { ...payload, s: sign(payload) };
  return b64urlEncode(JSON.stringify(signed));
}

export interface VerifyResult {
  ok: boolean;
  reason?: "malformed" | "bad_signature" | "expired" | "wrong_type";
  payload?: TokenPayload;
}

/** Verify token; returns payload on success. Does NOT check replay. */
export function verifyToken(token: string, expectedType: TokenType): VerifyResult {
  let parsed: SignedToken;
  try {
    parsed = JSON.parse(b64urlDecode(token).toString("utf8")) as SignedToken;
  } catch {
    return { ok: false, reason: "malformed" };
  }

  if (!parsed || typeof parsed !== "object" ||
      typeof parsed.t !== "string" ||
      typeof parsed.e !== "string" ||
      typeof parsed.l !== "string" ||
      typeof parsed.x !== "number" ||
      typeof parsed.n !== "string" ||
      typeof parsed.s !== "string") {
    return { ok: false, reason: "malformed" };
  }

  if (parsed.t !== expectedType) {
    return { ok: false, reason: "wrong_type" };
  }

  const { s, ...payload } = parsed;
  const expected = sign(payload);

  // Constant-time compare
  const a = Buffer.from(s);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { ok: false, reason: "bad_signature" };
  }

  if (payload.x < Math.floor(Date.now() / 1000)) {
    return { ok: false, reason: "expired" };
  }

  return { ok: true, payload };
}

/**
 * Dedupe key for replay protection — combines token type + nonce.
 * Pair with markUsed() from utils/rateLimit.
 */
export function replayKey(payload: TokenPayload): string {
  return `sub:used:${payload.t}:${payload.n}`;
}
