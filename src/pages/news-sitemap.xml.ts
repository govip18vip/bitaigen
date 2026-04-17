// src/pages/news-sitemap.xml.ts
// Google News Sitemap — articles published within the last 48 hours.
// Combines: (1) Astro markdown collection posts and (2) Sanity `btgPost` docs.
// Google News requires this specific format for news content indexing.

import { getCollection } from "astro:content";
import { SITE } from "@/config";
import { getPath } from "@/utils/getPath";
import { sanityClient } from "@/utils/sanity";
import { LANG_TO_PATH, type Lang } from "@/i18n/ui";

type SanityNewsRow = {
  title: string;
  slug: { current: string } | string;
  lang?: string;
  pubDatetime: string;
  modDatetime?: string;
};

const LANG_CODE_MAP: Record<string, string> = {
  "zh-CN": "zh-cn",
  "zh-TW": "zh-tw",
  en: "en",
  es: "es",
  pt: "pt",
};

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function sanityNewsUrl(base: string, lang: Lang, slug: string): string {
  const langPath = LANG_TO_PATH[lang] ?? "";
  return langPath
    ? `${base}/${langPath}/news/${slug}`
    : `${base}/news/${slug}`;
}

export async function GET() {
  const siteBase = SITE.website.replace(/\/$/, "");
  const now = Date.now();
  const twoDaysAgo = now - 48 * 60 * 60 * 1000;
  const sinceIso = new Date(twoDaysAgo).toISOString();

  // ── 1) Astro markdown collection posts ───────────────────────────
  const posts = await getCollection("blog").catch(() => []);
  const recentPosts = posts
    .filter(p => !p.data.draft)
    .filter(p => {
      const pubDate = new Date(
        p.data.modDatetime ?? p.data.pubDatetime,
      ).getTime();
      return pubDate >= twoDaysAgo;
    })
    .sort(
      (a, b) =>
        new Date(b.data.pubDatetime).getTime() -
        new Date(a.data.pubDatetime).getTime(),
    );

  const mdItems = recentPosts.map(post => {
    const postLang = ((post.data as any).lang ?? "zh-CN") as string;
    const url = `${siteBase}${getPath(post.id, post.filePath)}`;
    const pubDate = new Date(post.data.pubDatetime).toISOString();
    const title = xmlEscape(post.data.title);
    const langCode = LANG_CODE_MAP[postLang] ?? "zh-cn";

    return `  <url>
    <loc>${url}</loc>
    <news:news>
      <news:publication>
        <news:name>${xmlEscape(SITE.title)}</news:name>
        <news:language>${langCode}</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
  });

  // ── 2) Sanity btgPost news docs (all languages) ──────────────────
  const sanityNews = await sanityClient
    .fetch<SanityNewsRow[]>(
      `*[_type == "btgPost" && draft != true && pubDatetime > $since]
        | order(pubDatetime desc) [0...500] {
          title, slug, lang, pubDatetime, modDatetime
        }`,
      { since: sinceIso },
    )
    .catch(() => [] as SanityNewsRow[]);

  const sanityItems = sanityNews.map(row => {
    const lang = (row.lang ?? "zh-CN") as Lang;
    const slug =
      typeof row.slug === "string" ? row.slug : row.slug?.current ?? "";
    if (!slug) return "";
    const url = sanityNewsUrl(siteBase, lang, slug);
    const pubDate = new Date(row.pubDatetime).toISOString();
    const title = xmlEscape(row.title ?? "");
    const langCode = LANG_CODE_MAP[lang] ?? "zh-cn";

    return `  <url>
    <loc>${url}</loc>
    <news:news>
      <news:publication>
        <news:name>${xmlEscape(SITE.title)}</news:name>
        <news:language>${langCode}</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
  });

  // ── Merge, dedupe by loc URL, cap at 1000 (Google News limit) ───
  const allItems = [...mdItems, ...sanityItems].filter(Boolean);
  const seen = new Set<string>();
  const deduped: string[] = [];
  for (const block of allItems) {
    const m = block.match(/<loc>([^<]+)<\/loc>/);
    const key = m?.[1] ?? block;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(block);
    if (deduped.length >= 1000) break;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${deduped.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800",
    },
  });
}
