// src/utils/ui-helpers.ts
// ✅ 修复：补全所有缺失的 import，消除 ts(2304) 错误

import {
  LANGUAGES,
  UI,
  DEFAULT_LANG,
  LANG_TO_PATH,
  LANG_PATH_SEGMENTS,
  type Lang,
} from "@/i18n/ui";

// ── URL 路径段（小写）→ 内部 Lang key ──────────────────────
export const LANG_PATH_MAP: Record<string, Lang> = {
  "zh-cn": "zh-CN",
  "zh-tw": "zh-TW",
  "en":    "en",
  "es":    "es",
  "pt":    "pt",
};

// 重新导出，方便其他文件直接从 ui-helpers 引入
export { LANG_TO_PATH };

/**
 * 从 URL 路径第一段识别语言。
 *   /en/posts/ → "en"
 *   /zh-tw/    → "zh-TW"
 *   /posts/    → DEFAULT_LANG
 */
export function getLang(url: URL): Lang {
  const firstSeg = url.pathname.split("/").filter(Boolean)[0] ?? "";
  const lower = firstSeg.toLowerCase();
  if (lower in LANG_PATH_MAP) return LANG_PATH_MAP[lower];
  const hl = url.searchParams.get("hl");
  if (hl && hl in LANGUAGES) return hl as Lang;
  return DEFAULT_LANG;
}

/**
 * 去掉 URL 路径中的语言前缀，返回纯路径（始终以 / 开头）。
 */
export function stripLangPrefix(pathname: string): string {
  for (const seg of LANG_PATH_SEGMENTS) {
    if (pathname === `/${seg}` || pathname.startsWith(`/${seg}/`)) {
      return pathname.slice(seg.length + 1) || "/";
    }
  }
  return pathname;
}

/**
 * 为当前页面构建所有语言版本的 hreflang 链接。
 */
export function hreflangLinks(url: URL): { lang: Lang; href: string }[] {
  const origin = url.origin;
  const cleanPath = stripLangPrefix(url.pathname);

  return (Object.keys(LANGUAGES) as Lang[]).map(l => {
    const pathSeg = LANG_TO_PATH[l];
    const href = pathSeg
      ? `${origin}/${pathSeg}${cleanPath === "/" ? "" : cleanPath}`
      : `${origin}${cleanPath}`;
    return { lang: l, href };
  });
}

// 向后兼容别名
export { hreflangLinks as buildAlternates };

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return UI[lang]?.[key] ?? UI[DEFAULT_LANG]?.[key] ?? key;
  };
}
