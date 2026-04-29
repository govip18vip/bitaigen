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
    avatar: "/favicon.svg",
    expertise: ["Bitcoin", "Ethereum", "DeFi", "Binance", "OKX", "区块链", "加密货币交易", "Web3"],
    twitter:  "https://x.com/tanfyoo",
    telegram: "https://t.me/AllenAmbrose",
  },

  // 资深研究员（侧重深度分析、币种百科、技术解读）
  "alex-yan": {
    slug: "alex-yan",
    name: "Alex Yan",
    title: {
      "zh-CN": "区块链研究员 · 7 年加密市场经验",
      "zh-TW": "區塊鏈研究員 · 7 年加密市場經驗",
      en:      "Blockchain Researcher · 7yr Crypto Market Experience",
      es:      "Investigador Blockchain · 7 años de experiencia en cripto",
      pt:      "Pesquisador Blockchain · 7 anos de experiência cripto",
    },
    bio: {
      "zh-CN": "Alex 自 2018 年起持续追踪 BTC/ETH 周期与链上数据，曾撰写超 500 篇加密分析报告。专注于 L1/L2 技术、稳定币机制及代币经济学研究。文中数据均交叉验证 CoinGecko、Glassnode、Dune 等公开来源。",
      "zh-TW": "Alex 自 2018 年起持續追蹤 BTC/ETH 週期與鏈上數據，撰寫超過 500 篇加密分析報告。專注於 L1/L2 技術、穩定幣機制與代幣經濟學研究。",
      en:      "Alex has tracked BTC/ETH cycles and on-chain data since 2018, authoring 500+ crypto research reports. Specializes in L1/L2 protocols, stablecoin mechanics and tokenomics. All figures cross-checked against CoinGecko, Glassnode, and Dune.",
      es:      "Alex sigue ciclos de BTC/ETH y datos on-chain desde 2018, con más de 500 informes de investigación cripto. Especializado en protocolos L1/L2, mecánica de stablecoins y tokenomics.",
      pt:      "Alex acompanha os ciclos de BTC/ETH e dados on-chain desde 2018, com mais de 500 relatórios de pesquisa cripto. Especializado em protocolos L1/L2, mecânica de stablecoins e tokenomics.",
    },
    avatar: "/favicon.svg",
    expertise: ["Bitcoin", "Ethereum", "L2", "Stablecoin", "Tokenomics", "On-chain Analysis", "DeFi"],
    twitter:  "https://x.com/tanfyoo",
  },

  // 交易实操专家（侧重交易所、钱包、入门教程）
  "li-wenhui": {
    slug: "li-wenhui",
    name: "Li Wenhui",
    title: {
      "zh-CN": "加密交易实操专家 · 币安/OKX 老用户",
      "zh-TW": "加密交易實操專家 · 幣安/OKX 老用戶",
      en:      "Crypto Trading Practitioner · Long-term Binance/OKX user",
      es:      "Experto en Trading Cripto · Usuario de larga data Binance/OKX",
      pt:      "Especialista em Trading Cripto · Usuário antigo Binance/OKX",
    },
    bio: {
      "zh-CN": "文辉从 2019 年开始参与币安、OKX、Bybit 等交易所的现货与合约交易，亲历多轮牛熊周期。专注分享交易所注册、KYC、入金提币、合约风控等实操教程，所有步骤均亲测可行。建议读者先用小额练手，再放大仓位。",
      "zh-TW": "文輝從 2019 年開始參與幣安、OKX、Bybit 等交易所的現貨與合約交易，親歷多輪牛熊週期。專注分享交易所操作教程，所有步驟均親測可行。",
      en:      "Wenhui has been actively trading spot and derivatives on Binance, OKX, and Bybit since 2019, surviving multiple bull-bear cycles. Focuses on hands-on tutorials for exchange signup, KYC, deposit/withdrawal, and futures risk control. All steps personally tested.",
      es:      "Wenhui opera en spot y derivados en Binance, OKX y Bybit desde 2019. Comparte tutoriales prácticos sobre exchanges, KYC, depósitos/retiros y gestión de riesgo en futuros. Todos los pasos probados personalmente.",
      pt:      "Wenhui negocia spot e derivativos na Binance, OKX e Bybit desde 2019. Compartilha tutoriais práticos sobre exchanges, KYC, depósitos/saques e gestão de risco em futuros. Todos os passos testados pessoalmente.",
    },
    avatar: "/favicon.svg",
    expertise: ["Binance", "OKX", "Bybit", "现货交易", "合约交易", "KYC", "钱包安全", "风控"],
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
