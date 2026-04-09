// src/pages/api/indexnow.ts
// IndexNow API endpoint — call after publishing to notify Bing/Yandex/etc.
// Usage: POST /api/indexnow with body { "urls": ["/posts/xxx", "/coin/btc"] }
// Or GET /api/indexnow?sitemap=1 to submit full sitemap

export const prerender = false;

import type { APIRoute } from "astro";

const INDEXNOW_KEY = "742b49e4c0164b2c95ef3e04dbf7126a";
const HOST = "bitaigen.com";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const urls: string[] = body.urls || [];
    if (!urls.length) return new Response(JSON.stringify({ error: "No urls" }), { status: 400 });

    const fullUrls = urls.map(u => u.startsWith("http") ? u : `https://${HOST}${u}`);

    // Submit to IndexNow (Bing endpoint, shared with Yandex/Seznam/Naver)
    const resp = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: fullUrls,
      }),
    });

    return new Response(JSON.stringify({
      ok: resp.ok,
      status: resp.status,
      submitted: fullUrls.length,
    }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};

// GET: submit sitemap ping to Google + Bing
export const GET: APIRoute = async ({ url }) => {
  const sitemapUrl = `https://${HOST}/sitemap-index.xml`;

  const results: Record<string, string> = {};

  // Ping Google
  try {
    const r = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    results.google = r.ok ? "OK" : `${r.status}`;
  } catch (e: any) { results.google = e.message; }

  // Ping Bing
  try {
    const r = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
    results.bing = r.ok ? "OK" : `${r.status}`;
  } catch (e: any) { results.bing = e.message; }

  return new Response(JSON.stringify({ sitemapUrl, results }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
