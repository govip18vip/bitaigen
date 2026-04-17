// src/utils/rateLimit.ts
// ─────────────────────────────────────────────────────────────
// Unified rate limiter with Upstash Redis backend + in-memory fallback.
//
// Usage:
//   import { rateLimit } from "@/utils/rateLimit";
//   const { limited, remaining, resetInSeconds } = await rateLimit(`subscribe:${ip}`, {
//     max: 5, windowSec: 600,
//   });
//
// If UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN are set in env,
// uses a sliding-window counter in Upstash (survives deploys + multi-region).
// Otherwise falls back to an in-process Map (per-instance only — still catches
// low-effort abuse on a single Vercel serverless worker).
// ─────────────────────────────────────────────────────────────

export interface RateLimitOptions {
  /** Maximum number of allowed requests per window. */
  max: number;
  /** Window duration in seconds. */
  windowSec: number;
}

export interface RateLimitResult {
  /** True if the request should be rejected. */
  limited: boolean;
  /** How many requests are still allowed within the current window. */
  remaining: number;
  /** Seconds until the window resets (approximate). */
  resetInSeconds: number;
}

// ── In-memory fallback store ─────────────────────────────────
const memStore = new Map<string, { count: number; reset: number }>();

function memLimit(key: string, { max, windowSec }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSec * 1000;
  const entry = memStore.get(key);

  if (!entry || now > entry.reset) {
    memStore.set(key, { count: 1, reset: now + windowMs });
    return { limited: false, remaining: max - 1, resetInSeconds: windowSec };
  }

  entry.count++;
  const resetInSeconds = Math.max(0, Math.ceil((entry.reset - now) / 1000));
  if (entry.count > max) {
    return { limited: true, remaining: 0, resetInSeconds };
  }
  return { limited: false, remaining: Math.max(0, max - entry.count), resetInSeconds };
}

// Opportunistic garbage collection — keep the map bounded.
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of memStore) {
    if (now > v.reset) memStore.delete(k);
  }
  // Hard cap to protect memory in worst case.
  if (memStore.size > 10_000) {
    const first = memStore.keys().next().value;
    if (first) memStore.delete(first);
  }
}, 60_000).unref?.();

// ── Upstash REST helper ──────────────────────────────────────
async function upstashPipeline(
  url: string,
  token: string,
  commands: (string | number)[][],
): Promise<unknown[] | null> {
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) {
      console.warn("[rateLimit] upstash non-200:", res.status);
      return null;
    }
    const data = (await res.json()) as { result: unknown }[];
    return data.map((d) => d.result);
  } catch (err) {
    console.warn("[rateLimit] upstash error:", err);
    return null;
  }
}

/**
 * Increment-and-check counter backed by Upstash.
 * Uses INCR + EXPIRE in a pipeline — the first request per window sets the TTL,
 * subsequent requests in the same window just INCR (expire is idempotent-ish
 * because we only set it when count === 1).
 */
async function upstashLimit(
  key: string,
  { max, windowSec }: RateLimitOptions,
  url: string,
  token: string,
): Promise<RateLimitResult | null> {
  const results = await upstashPipeline(url, token, [
    ["INCR", key],
    ["EXPIRE", key, windowSec, "NX"],
    ["TTL", key],
  ]);
  if (!results) return null;

  const count = Number(results[0] ?? 0);
  let ttl = Number(results[2] ?? windowSec);
  if (!Number.isFinite(ttl) || ttl < 0) ttl = windowSec;

  return {
    limited: count > max,
    remaining: Math.max(0, max - count),
    resetInSeconds: ttl,
  };
}

// ── Public API ───────────────────────────────────────────────
export async function rateLimit(
  key: string,
  opts: RateLimitOptions,
): Promise<RateLimitResult> {
  const url = import.meta.env.UPSTASH_REDIS_REST_URL;
  const token = import.meta.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    const upstashResult = await upstashLimit(key, opts, url, token);
    if (upstashResult) return upstashResult;
    // Fall through to in-memory if Upstash hiccups.
  }
  return memLimit(key, opts);
}

/**
 * Set a key/value with TTL — used for dedupe (e.g. token replay protection).
 * Returns true if the set succeeded, false otherwise.
 * Falls back to in-memory when Upstash is unavailable.
 */
const memKv = new Map<string, number>();

export async function markUsed(
  key: string,
  ttlSec: number,
): Promise<{ alreadyUsed: boolean }> {
  const url = import.meta.env.UPSTASH_REDIS_REST_URL;
  const token = import.meta.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    // SET key "1" NX EX ttlSec — atomic "only set if not exists"
    const results = await upstashPipeline(url, token, [
      ["SET", key, "1", "NX", "EX", ttlSec],
    ]);
    if (results) {
      // "OK" = acquired, null = already exists
      return { alreadyUsed: results[0] === null };
    }
  }

  // In-memory fallback
  const now = Date.now();
  const expiresAt = memKv.get(key);
  if (expiresAt && expiresAt > now) {
    return { alreadyUsed: true };
  }
  memKv.set(key, now + ttlSec * 1000);
  return { alreadyUsed: false };
}
