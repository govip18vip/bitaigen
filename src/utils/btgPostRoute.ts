// src/utils/btgPostRoute.ts
// ──────────────────────────────────────────────────────────────
// Sanity btgPost → 前端 URL 计算器（按 category 字段路由）
//
// 已支持的分类（与 pipeline/core/category_map.py 对齐）：
//   news       → /news/[slug]       资讯
//   blockchain → /blockchain/[slug] 区块链技术
//   coins      → /coins/[slug]      币种百科（避开 /coin/[symbol] 价格页）
//   exchange   → /exchange/[slug]   交易平台
//   bitcoin    → /bitcoin/[slug]    比特币
//   wallet     → /wallet/[slug]     钱包知识
//   basics     → /basics/[slug]     币圈科普
//
// 兜底：缺 category → 看 articleType 推断（news → /news, 其他 → /news 兜底）
// ──────────────────────────────────────────────────────────────

import { LANG_TO_PATH, type Lang } from "@/i18n/ui";

export const BTG_CATEGORY_SLUGS = [
  "news",
  "blockchain",
  "coins",
  "exchange",
  "bitcoin",
  "wallet",
  "basics",
] as const;
export type BtgCategory = typeof BTG_CATEGORY_SLUGS[number];

// 分类的中/英显示名（用于面包屑、导航、列表页 H1）
export const BTG_CATEGORY_LABELS: Record<BtgCategory, Record<Lang, string>> = {
  news: {
    "zh-CN": "资讯", "zh-TW": "資訊",
    "en": "News", "es": "Noticias", "pt": "Notícias",
  },
  blockchain: {
    "zh-CN": "区块链技术", "zh-TW": "區塊鏈技術",
    "en": "Blockchain", "es": "Blockchain", "pt": "Blockchain",
  },
  coins: {
    "zh-CN": "币种百科", "zh-TW": "幣種百科",
    "en": "Coin Wiki", "es": "Enciclopedia de Monedas", "pt": "Enciclopédia de Moedas",
  },
  exchange: {
    "zh-CN": "交易平台", "zh-TW": "交易平台",
    "en": "Exchanges", "es": "Exchanges", "pt": "Corretoras",
  },
  bitcoin: {
    "zh-CN": "比特币", "zh-TW": "比特幣",
    "en": "Bitcoin", "es": "Bitcoin", "pt": "Bitcoin",
  },
  wallet: {
    "zh-CN": "钱包教程", "zh-TW": "錢包教學",
    "en": "Wallet Guide", "es": "Guía de Wallets", "pt": "Guia de Carteiras",
  },
  basics: {
    "zh-CN": "币圈科普", "zh-TW": "幣圈科普",
    "en": "Crypto Basics", "es": "Básicos de Cripto", "pt": "Básicos de Cripto",
  },
};

/**
 * 根据 articleType 推断兜底 category（适用于早期文档没存 category 字段的情况）
 */
export function articleTypeToCategoryFallback(articleType?: string): BtgCategory {
  switch ((articleType || "").toLowerCase()) {
    case "news":     return "news";
    case "howto":    return "wallet";    // 教程多是钱包/交易所操作
    case "guide":    return "basics";    // 科普类
    case "article":  return "coins";     // 百科
    case "market":   return "news";
    case "flash":    return "news";
    default:         return "news";
  }
}

/**
 * 校验 category 字段是否合法
 */
export function isValidBtgCategory(s?: string): s is BtgCategory {
  return !!s && (BTG_CATEGORY_SLUGS as readonly string[]).includes(s);
}

/**
 * 根据 lang + category + slug 计算文章 URL
 *   zh-CN: /{category}/{slug}
 *   其他:  /{lang}/{category}/{slug}
 */
export function buildBtgPostHref(
  lang: string,
  category: string | undefined,
  slug: string,
  articleType?: string,
): string {
  const cat: BtgCategory = isValidBtgCategory(category)
    ? category
    : articleTypeToCategoryFallback(articleType);

  const langPath = (lang && lang !== "zh-CN")
    ? LANG_TO_PATH[lang as Lang]
    : "";
  const langPrefix = langPath ? `/${langPath}` : "";
  return `${langPrefix}/${cat}/${slug}`;
}

/**
 * 获取分类的本地化标签
 */
export function getBtgCategoryLabel(category: string, lang: string): string {
  if (!isValidBtgCategory(category)) return "";
  const labels = BTG_CATEGORY_LABELS[category];
  return labels[lang as Lang] || labels["en"] || labels["zh-CN"] || "";
}

/**
 * 列表页 URL（分类汇总）
 *   zh-CN: /{category}
 *   其他:  /{lang}/{category}
 */
export function buildCategoryListHref(lang: string, category: BtgCategory): string {
  const langPath = (lang && lang !== "zh-CN")
    ? LANG_TO_PATH[lang as Lang]
    : "";
  const langPrefix = langPath ? `/${langPath}` : "";
  return `${langPrefix}/${category}`;
}
