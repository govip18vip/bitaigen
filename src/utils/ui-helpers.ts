// ─────────────────────────────────────────────────────────────
// src/i18n/ui.ts  (REPLACE the bottom helper section only)
//
// 把文件底部的 getLang / hreflangLinks / buildAlternates 替换为下面这段。
// LANGUAGES / UI / TAXONOMY 等常量保持不变。
// ─────────────────────────────────────────────────────────────

// ── 注意：下面只贴出需要替换/新增的函数，其余常量保持原样 ──

/**
 * 从 URL 路径前缀读取语言。
 *   /en/...      → "en"
 *   /zh-tw/...   → "zh-TW"   (路径用小写，内部映射到正确 key)
 *   /es/...      → "es"
 *   /pt/...      → "pt"
 *   /...         → DEFAULT_LANG (zh-CN)
 *
 * 路径中的 key 使用小写（URL 友好），映射表见 PATH_TO_LANG。
 */
export const LANG_PATH_MAP: Record<string, Lang> = {
  "zh-cn": "zh-CN",
  "zh-tw": "zh-TW",
  "en":    "en",
  "es":    "es",
  "pt":    "pt",
};

// 反向映射：内部 Lang key → URL 路径段
export const LANG_TO_PATH: Record<Lang, string> = {
  "zh-CN": "",       // 默认语言不加前缀
  "zh-TW": "zh-tw",
  "en":    "en",
  "es":    "es",
  "pt":    "pt",
};

/** URL 路径前缀中合法的语言段（不含默认语言） */
export const LANG_PATH_SEGMENTS = Object.values(LANG_TO_PATH).filter(Boolean);

/**
 * 从 URL 路径第一段识别语言。
 *   /en/posts/ → "en"
 *   /zh-tw/    → "zh-TW"
 *   /posts/    → DEFAULT_LANG
 */
export function getLang(url: URL): Lang {
  const firstSeg = url.pathname.split("/").filter(Boolean)[0] ?? "";
  if (firstSeg in LANG_PATH_MAP) return LANG_PATH_MAP[firstSeg];
  // 兼容旧版 ?hl= 参数
  const hl = url.searchParams.get("hl");
  if (hl && hl in LANGUAGES) return hl as Lang;
  return DEFAULT_LANG;
}

/**
 * 从 URL 路径中去掉语言前缀，返回纯路径（始终以 / 开头）。
 *   /en/posts/  → /posts/
 *   /zh-tw/     → /
 *   /posts/     → /posts/
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

// 保持向后兼容的别名
export { hreflangLinks as buildAlternates };

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return UI[lang]?.[key] ?? UI[DEFAULT_LANG]?.[key] ?? key;
  };
}
