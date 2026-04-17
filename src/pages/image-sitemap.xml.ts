// src/pages/image-sitemap.xml.ts
// Google Image Sitemap — lists hero/og images for all blog posts + Sanity news.
// Helps Google Images discover and index article images with proper captions.

import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import { SITE } from "@/config";
import { sanityClient, sanityImageUrl } from "@/utils/sanity";
import { LANG_TO_PATH, type Lang } from "@/i18n/ui";

type SanityRow = {
  title: string;
  slug: { current: string } | string;
  lang?: string;
  description?: string;
  mainImage?: { asset?: { _ref: string } };
  ogImage?: { asset?: { _ref: string } };
};

function xmlEsc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sanityUrl(base: string, lang: Lang, slug: string): string {
  const lp = LANG_TO_PATH[lang] ?? "";
  return lp ? `${base}/${lp}/news/${slug}` : `${base}/news/${slug}`;
}

export async function GET() {
  const siteBase = SITE.website.replace(/\/$/, "");

  // ── 1) Astro markdown posts ────────────────────────────────────
  const posts = await getCollection("blog").catch(() => []);
  const mdEntries: string[] = [];

  for (const post of posts) {
    if (post.data.draft) continue;
    const url = `${siteBase}${getPath(post.id, post.filePath)}`;
    const images: string[] = [];

    // heroImage or ogImage
    const hero = (post.data as any).heroImage;
    const og = (post.data as any).ogImage;
    const imgSrc = hero || og;
    if (typeof imgSrc === "string" && imgSrc.startsWith("http")) {
      images.push(imgSrc);
    }

    if (images.length === 0) continue;

    const imageBlocks = images
      .map(
        img => `      <image:image>
        <image:loc>${xmlEsc(img)}</image:loc>
        <image:caption>${xmlEsc(post.data.title)}</image:caption>
      </image:image>`,
      )
      .join("\n");

    mdEntries.push(`  <url>
    <loc>${url}</loc>
${imageBlocks}
  </url>`);
  }

  // ── 2) Sanity btgPost docs ─────────────────────────────────────
  const sanityRows = await sanityClient
    .fetch<SanityRow[]>(
      `*[_type == "btgPost" && draft != true && (defined(mainImage) || defined(ogImage))]
        | order(pubDatetime desc) [0...2000] {
          title, slug, lang, description, mainImage, ogImage
        }`,
    )
    .catch(() => [] as SanityRow[]);

  const sanityEntries: string[] = [];
  for (const row of sanityRows) {
    const slug =
      typeof row.slug === "string" ? row.slug : row.slug?.current ?? "";
    if (!slug) continue;
    const lang = (row.lang ?? "zh-CN") as Lang;
    const url = sanityUrl(siteBase, lang, slug);

    const imgRef =
      row.mainImage?.asset?._ref ?? row.ogImage?.asset?._ref ?? "";
    if (!imgRef) continue;

    let imgUrl = "";
    try {
      imgUrl = sanityImageUrl(imgRef, { width: 1200, height: 630, format: "webp" });
    } catch {
      continue;
    }
    if (!imgUrl) continue;

    sanityEntries.push(`  <url>
    <loc>${url}</loc>
      <image:image>
        <image:loc>${xmlEsc(imgUrl)}</image:loc>
        <image:caption>${xmlEsc(row.title ?? "")}</image:caption>
      </image:image>
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${[...mdEntries, ...sanityEntries].join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
