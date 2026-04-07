// src/utils/authors.ts
// 作者数据库 — E-E-A-T 信号的核心
// 每位作者对应一个 /author/[slug]/ 页面，article schema 的 author.url 指向此处

export interface Author {
  slug: string;
  name: string;
  /** 职称 / 头衔 */
  title: Record<string, string>;
  /** 简介 */
  bio: Record<string, string>;
  /** 头像路径（相对 /public） */
  avatar: string;
  /** 擅长领域标签 */
  expertise: string[];
  /** 社交链接 */
  twitter?: string;
  telegram?: string;
  website?: string;
  linkedin?: string;
}

export const AUTHORS: Record<string, Author> = {
  bitaigen: {
    slug: "bitaigen",
    name: "Bitaigen 编辑团队",
    title: {
      "zh-CN": "区块链资讯编辑团队",
      "zh-TW": "區塊鏈資訊編輯團隊",
      en:      "Blockchain Editorial Team",
      es:      "Equipo Editorial Blockchain",
      pt:      "Equipe Editorial Blockchain",
    },
    bio: {
      "zh-CN": "Bitaigen 是专注于区块链与加密货币领域的专业内容团队，长期深耕比特币、以太坊、DeFi、交易所教程及市场分析，为全球华语读者提供准确、深度、及时的加密市场资讯。所有内容均经过多方数据核验，力求在信息噪音中给读者清晰的判断依据。",
      "zh-TW": "Bitaigen 是專注於區塊鏈與加密貨幣領域的專業內容團隊，長期深耕比特幣、以太坊、DeFi、交易所教程及市場分析，為全球華語讀者提供準確、深度、及時的加密市場資訊。",
      en:      "Bitaigen is a professional editorial team specializing in blockchain and cryptocurrency content. We cover Bitcoin, Ethereum, DeFi, exchange tutorials, and market analysis, providing accurate and in-depth crypto insights for global readers.",
      es:      "Bitaigen es un equipo editorial profesional especializado en blockchain y criptomonedas. Cubrimos Bitcoin, Ethereum, DeFi, tutoriales de exchanges y análisis de mercado para lectores globales.",
      pt:      "Bitaigen é uma equipe editorial profissional especializada em blockchain e criptomoedas. Cobrimos Bitcoin, Ethereum, DeFi, tutoriais de exchanges e análise de mercado para leitores globais.",
    },
    avatar: "/og-crypto.jpg",
    expertise: ["Bitcoin", "Ethereum", "DeFi", "Binance", "OKX", "区块链", "加密货币交易", "Web3"],
    twitter:  "https://x.com/tanfyoo",
    telegram: "https://t.me/AllenAmbrose",
  },
};

/** 按 slug 查找作者，找不到时回退到 bitaigen */
export function getAuthor(slugOrName: string): Author {
  const key = slugOrName.toLowerCase().replace(/\s+/g, "-");
  return AUTHORS[key] ?? AUTHORS["bitaigen"];
}

/** 返回所有作者列表（用于 getStaticPaths） */
export function getAllAuthors(): Author[] {
  return Object.values(AUTHORS);
}
