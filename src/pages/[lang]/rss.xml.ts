// src/pages/[lang]/rss.xml.ts
// Multi-language RSS feeds: /en/rss.xml, /zh-tw/rss.xml, /es/rss.xml, /pt/rss.xml
// Merges Astro collection posts AND Sanity btgPost docs for the given language.

import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";
import { LANG_PATH_MAP, LANG_TO_PATH, type Lang } from "@/i18n/ui";
import { sanityClient } from "@/utils/sanity";
import type { SanityPost } from "@/utils/sanity";

const LANG_LABEL: Record<string, { title: string; desc: string }> = {
  "zh-TW": {
    title: `${SITE.title} — 加密貨幣資訊`,
    desc: "比特幣、以太坊、DeFi、NFT 最新動態與深度分析。",
  },
  en: {
    title: `${SITE.title} — Crypto News & Guides`,
    desc: "Bitcoin, Ethereum, DeFi & NFT analysis and how-to guides.",
  },
  es: {
    title: `${SITE.title} — Noticias Cripto`,
    desc: "Análisis de Bitcoin, Ethereum, DeFi y NFT con tutoriales.",
  },
  pt: {
    title: `${SITE.title} — Notícias Cripto`,
    desc: "Análise de Bitcoin, Ethereum, DeFi e NFT com tutoriais.",
  },
};

export async function GET(ctx: APIContext) {
  const langPath = ctx.params.lang ?? "";
  const lang: Lang = LANG_PATH_MAP[langPath] ?? "en";
  const label = LANG_LABEL[lang] ?? LANG_LABEL["en"];
  const siteBase = SITE.website.replace(/\/$/, "");
  const feedUrl = `${siteBase}/${LANG_TO_PATH[lang]}/rss.xml`;

  // ── 1) Astro markdown posts for this language ──────────────────
  const allPosts = await getCollection("blog");
  const langPosts = getSortedPosts(allPosts).filter(p => {
    const postLang = ((p.data as any).lang as string) ?? "zh-CN";
    return postLang === lang;
  });

  const mdItems = langPosts.slice(0, 50).map(({ data, id, filePath }) => ({
    link: getPath(id, filePath),
    title: data.title,
    description: data.description,
    pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    categories: data.tags,
    author: data.author ?? SITE.author,
  }));

  // ── 2) Sanity btgPost docs for this language ───────────────────
  const sanityPosts = await sanityClient
    .fetch<SanityPost[]>(
      `*[_type == "btgPost" && draft != true && lang == $lang]
        | order(pubDatetime desc) [0...50] {
          title, slug, lang, description, pubDatetime, modDatetime, tags, author
        }`,
      { lang },
    )
    .catch(() => [] as SanityPost[]);

  const newsBasePath = LANG_TO_PATH[lang]
    ? `/${LANG_TO_PATH[lang]}/news`
    : "/news";

  const sanityItems = sanityPosts.map(p => {
    const slug =
      typeof p.slug === "string" ? p.slug : p.slug?.current ?? "";
    return {
      link: `${newsBasePath}/${slug}`,
      title: p.title,
      description: p.description ?? "",
      pubDate: new Date(p.modDatetime ?? p.pubDatetime),
      categories: p.tags ?? [],
      author: p.author?.name ?? SITE.author,
    };
  });

  // ── 3) Merge & sort by date desc, cap at 100 ──────────────────
  const allItems = [...mdItems, ...sanityItems]
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime())
    .slice(0, 100);

  return rss({
    title: label.title,
    description: label.desc,
    site: SITE.website,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    customData: `<language>${lang === "zh-TW" ? "zh-TW" : lang === "pt" ? "pt-BR" : lang}</language><atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
    items: allItems,
  });
}
