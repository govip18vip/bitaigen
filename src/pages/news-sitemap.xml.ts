// src/pages/news-sitemap.xml.ts
// Google News Sitemap — only articles published within the last 48 hours
// Google News requires this specific format for news content indexing

import { getCollection } from "astro:content";
import { SITE } from "@/config";
import { getPath } from "@/utils/getPath";

export async function GET() {
  const posts = await getCollection("blog");

  const now = Date.now();
  const twoDaysAgo = now - 48 * 60 * 60 * 1000;

  // Filter to recent, non-draft articles
  const recentPosts = posts
    .filter(p => !p.data.draft)
    .filter(p => {
      const pubDate = new Date(p.data.modDatetime ?? p.data.pubDatetime).getTime();
      return pubDate >= twoDaysAgo;
    })
    .sort((a, b) =>
      new Date(b.data.pubDatetime).getTime() - new Date(a.data.pubDatetime).getTime()
    )
    .slice(0, 50); // Google News max 1000, but we'll keep it reasonable

  const langMap: Record<string, string> = {
    "zh-CN": "zh-cn",
    "zh-TW": "zh-tw",
    "en": "en",
    "es": "es",
    "pt": "pt",
  };

  const items = recentPosts.map(post => {
    const postLang = (post.data as any).lang ?? "zh-CN";
    const url = `${SITE.website.replace(/\/$/, "")}${getPath(post.id, post.filePath)}`;
    const pubDate = new Date(post.data.pubDatetime).toISOString();
    const title = post.data.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    return `  <url>
    <loc>${url}</loc>
    <news:news>
      <news:publication>
        <news:name>${SITE.title}</news:name>
        <news:language>${langMap[postLang] ?? "zh-cn"}</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
