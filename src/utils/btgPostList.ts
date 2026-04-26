// src/utils/btgPostList.ts
// 共享：按 category + lang 拉取列表（带兜底匹配 articleType）

import { sanityClient, type SanityPost } from "@/utils/sanity";
import { articleTypeToCategoryFallback, type BtgCategory } from "@/utils/btgPostRoute";
import type { Lang } from "@/i18n/ui";

export interface ListResult {
  posts: SanityPost[];
  totalCount: number;
  hasNext: boolean;
}

/**
 * 拉取指定分类下的文章。
 *
 * 兼容旧文档（没有 category 字段）：
 *   按 articleType 推断兜底 category 也算匹配。
 */
export async function loadBtgPostList(opts: {
  category: BtgCategory;
  lang: Lang;
  page?: number;
  pageSize?: number;
  tag?: string;
}): Promise<ListResult> {
  const page = Math.max(1, opts.page || 1);
  const pageSize = opts.pageSize || 20;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  // 寻找 articleType 兜底（用于无 category 字段的旧文档）
  // 例如：category=wallet → articleType=howto。
  // 但 howto 可能也包含 exchange 文档（articleType 共享），需要警惕——
  // 优先匹配新字段 category，无该字段才靠 articleType 兜底。
  const ARTICLE_TYPE_FALLBACK: Record<BtgCategory, string[]> = {
    news:       ["news", "market", "flash"],
    bitcoin:    [],   // 严格：只匹配明确标 category=bitcoin 的
    coins:      [],
    blockchain: [],
    wallet:     [],
    exchange:   [],
    basics:     [],
  };
  const fallbackTypes = ARTICLE_TYPE_FALLBACK[opts.category];

  // 构建过滤条件
  const conds: string[] = [
    '_type == "btgPost"',
    'draft != true',
    `lang == "${opts.lang}"`,
  ];

  // 主匹配 category（兼容兜底）
  if (fallbackTypes.length > 0) {
    const typesIn = fallbackTypes.map(t => `"${t}"`).join(",");
    conds.push(
      `(category == "${opts.category}" || (!defined(category) && articleType in [${typesIn}]))`,
    );
  } else {
    conds.push(`category == "${opts.category}"`);
  }

  if (opts.tag) {
    conds.push(`"${opts.tag.replace(/"/g, '\\"')}" in tags`);
  }
  const filter = conds.join(" && ");

  const [posts, totalCount] = await Promise.all([
    sanityClient.fetch<SanityPost[]>(
      `*[${filter}] | order(pubDatetime desc) [${start}...${end + 1}] {
        _id, title, slug, lang, articleType, description,
        coverImage, pubDatetime, modDatetime, tags, sourceName,
        category
      }`,
    ).catch(() => [] as SanityPost[]),
    sanityClient.fetch<number>(`count(*[${filter}])`).catch(() => 0),
  ]);

  const hasNext = posts.length > pageSize;
  return {
    posts: posts.slice(0, pageSize),
    totalCount,
    hasNext,
  };
}
