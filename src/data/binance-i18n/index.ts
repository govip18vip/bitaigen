// src/data/binance-i18n/index.ts
// 多语言 Binance 专题路由器
// 根据 Lang 返回对应语言的 BINANCE_SECTIONS

import type { Lang } from "@/i18n/ui";
import type { BSection } from "@/data/binance-sections";
import {
  BINANCE_SECTIONS,
  BINANCE_REF,
  BINANCE_REG_URL,
  BINANCE_DL_APK,
  BINANCE_MAIN,
  getSectionById as getZhCNById,
  getRelatedSections as getZhCNRelated,
  DIFFICULTY_LABEL as DIFFICULTY_LABEL_ZHCN,
  DIFFICULTY_COLOR,
} from "@/data/binance-sections";
import { BINANCE_SECTIONS_ZHTW } from "./zh-tw";
import { BINANCE_SECTIONS_EN } from "./en";
import { BINANCE_SECTIONS_ES } from "./es";
import { BINANCE_SECTIONS_PT } from "./pt";

export {
  BINANCE_REF,
  BINANCE_REG_URL,
  BINANCE_DL_APK,
  BINANCE_MAIN,
  DIFFICULTY_COLOR,
};

// Per-language difficulty labels
export const DIFFICULTY_LABEL: Record<Lang, Record<string, string>> = {
  "zh-CN": { beginner: "新手适合", intermediate: "有基础", advanced: "进阶用户" },
  "zh-TW": { beginner: "新手適合", intermediate: "有基礎", advanced: "進階用戶" },
  "en":    { beginner: "Beginner",   intermediate: "Intermediate", advanced: "Advanced" },
  "es":    { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado" },
  "pt":    { beginner: "Iniciante",  intermediate: "Intermediário", advanced: "Avançado" },
};

// Get section list by language
export function getBinanceSections(lang: Lang): BSection[] {
  switch (lang) {
    case "zh-TW": return BINANCE_SECTIONS_ZHTW;
    case "en":    return BINANCE_SECTIONS_EN;
    case "es":    return BINANCE_SECTIONS_ES;
    case "pt":    return BINANCE_SECTIONS_PT;
    default:      return BINANCE_SECTIONS; // zh-CN
  }
}

export function getBinanceSectionById(lang: Lang, id: string): BSection | undefined {
  return getBinanceSections(lang).find(s => s.id === id);
}

export function getRelatedSections(lang: Lang, ids: string[]): BSection[] {
  const sections = getBinanceSections(lang);
  return ids.map(id => sections.find(s => s.id === id)).filter(Boolean) as BSection[];
}

// hreflang entries for a Binance section page
export function binanceSectionHreflang(
  origin: string,
  sectionId: string,
): { lang: string; href: string }[] {
  const o = origin.replace(/\/$/, "");
  return [
    { lang: "zh-CN",     href: `${o}/binance/${sectionId}` },
    { lang: "zh-TW",     href: `${o}/zh-tw/binance/${sectionId}` },
    { lang: "en",        href: `${o}/en/binance/${sectionId}` },
    { lang: "es",        href: `${o}/es/binance/${sectionId}` },
    { lang: "pt",        href: `${o}/pt/binance/${sectionId}` },
    { lang: "x-default", href: `${o}/binance/${sectionId}` },
  ];
}

export function binancePillarHreflang(origin: string): { lang: string; href: string }[] {
  const o = origin.replace(/\/$/, "");
  return [
    { lang: "zh-CN",     href: `${o}/binance` },
    { lang: "zh-TW",     href: `${o}/zh-tw/binance` },
    { lang: "en",        href: `${o}/en/binance` },
    { lang: "es",        href: `${o}/es/binance` },
    { lang: "pt",        href: `${o}/pt/binance` },
    { lang: "x-default", href: `${o}/binance` },
  ];
}
