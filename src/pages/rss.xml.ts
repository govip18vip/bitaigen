// src/pages/rss.xml.ts
// Main RSS feed (zh-CN default language)
// Merges Astro collection posts AND Sanity btgPost docs.

import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";
import { sanityClient } from "@/utils/sanity";
import type { SanityPost } from "@/utils/sanity";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts).filter(p => {
    const lang = ((p.data as any).lang as string) ?? "zh-CN";
    return lang === "zh-CN";
  });

  const mdItems = sortedPosts.slice(0, 50).map(({ data, id, filePath }) => ({
    link: getPath(id, filePath),
    title: data.title,
    description: data.description,
    pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    categories: data.tags,
    author: data.author ?? SITE.author,
  }));

  // ── Sanity news for zh-CN ──────────────────────────────────────
  const sanityPosts = await sanityClient
    .fetch<SanityPost[]>(
      `*[_type == "btgPost" && draft != true && lang == "zh-CN"]
        | order(pubDatetime desc) [0...50] {
          title, slug, description, pubDatetime, modDatetime, tags, author
        }`,
    )
    .catch(() => [] as SanityPost[]);

  const sanityItems = sanityPosts.map(p => {
    const slug =
      typeof p.slug === "string" ? p.slug : p.slug?.current ?? "";
    return {
      link: `/news/${slug}`,
      title: p.title,
      description: p.description ?? "",
      pubDate: new Date(p.modDatetime ?? p.pubDatetime),
      categories: p.tags ?? [],
      author: p.author?.name ?? SITE.author,
    };
  });

  const allItems = [...mdItems, ...sanityItems]
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
    .slice(0, 100);

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    customData: `<language>zh-CN</language><atom:link href="${SITE.website}rss.xml" rel="self" type="application/rss+xml" />`,
    items: allItems,
  });
}
