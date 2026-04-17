// src/pages/sanity-sitemap.xml.ts
// Standard URL sitemap for ALL Sanity `btgPost` documents (all languages).
// Complements the Astro auto-generated sitemap-index.xml which only covers
// static/prerendered pages, and news-sitemap.xml which is limited to 48 hours.

import { sanityClient } from "@/utils/sanity";
import { SITE } from "@/config";
import { LANG_TO_PATH, type Lang } from "@/i18n/ui";

type SanityRow = {
  slug: { current: string } | string;
  lang?: string;
  pubDatetime: string;
  modDatetime?: string;
};

function sanityUrl(base: string, lang: Lang, slug: string): string {
  const lp = LANG_TO_PATH[lang] ?? "";
  return lp ? `${base}/${lp}/news/${slug}` : `${base}/news/${slug}`;
}

export async function GET() {
  const siteBase = SITE.website.replace(/\/$/, "");

  const rows = await sanityClient
    .fetch<SanityRow[]>(
      `*[_type == "btgPost" && draft != true] | order(pubDatetime desc) [0...5000] {
        slug, lang, pubDatetime, modDatetime
      }`,
    )
    .catch(() => [] as SanityRow[]);

  const urls = rows
    .map(r => {
      const slug =
        typeof r.slug === "string" ? r.slug : r.slug?.current ?? "";
      if (!slug) return "";
      const lang = (r.lang ?? "zh-CN") as Lang;
      const loc = sanityUrl(siteBase, lang, slug);
      const lastmod = new Date(r.modDatetime ?? r.pubDatetime).toISOString();
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .filter(Boolean);

  // Also add news list pages for each language
  const newsListUrls = [
    { path: "/news", lang: "zh-CN" },
    { path: "/zh-tw/news", lang: "zh-TW" },
    { path: "/en/news", lang: "en" },
    { path: "/es/news", lang: "es" },
    { path: "/pt/news", lang: "pt" },
  ].map(
    ({ path }) => `  <url>
    <loc>${siteBase}${path}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`,
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...newsListUrls, ...urls].join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
