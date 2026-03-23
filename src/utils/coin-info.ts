// src/utils/coinInfo.ts
// 币种详情多语言配置 + 信息映射

import type { Lang } from "@/i18n/ui";

export interface CoinInfo {
  id: string;
  symbol: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  useCase: Record<Lang, string>;
  consensus?: string; // PoW, PoS, etc.
  blockTime?: string;
  maxSupply?: string;
  launchDate?: string;
  founder?: string;
  officialWebsite?: string;
  whitepaper?: string;
  blockExplorer?: string;
  github?: string;
  twitter?: string;
  telegram?: string;
  reddit?: string;
  coingeckoId?: string;
  cmcId?: number;
}

export const COIN_INFO_DB: Record<string, CoinInfo> = {
  // Bitcoin
  bitcoin: {
    id: "bitcoin",
    symbol: "BTC",
    name: {
      "zh-CN": "比特币",
      "zh-TW": "比特幣",
      en: "Bitcoin",
      es: "Bitcoin",
      pt: "Bitcoin",
    },
    description: {
      "zh-CN": "世界上第一个去中心化数字货币，采用工作量证明（PoW）共识机制。总量永久固定2100万枚。",
      "zh-TW": "世界上第一個去中心化數字貨幣，採用工作量證明（PoW）共識機制。總量永久固定2100萬枚。",
      en: "The world's first decentralized digital currency using Proof of Work (PoW) consensus. Total supply fixed at 21 million BTC.",
      es: "La primera criptomoneda descentralizada del mundo con consenso Proof of Work. Suministro total de 21 millones.",
      pt: "A primeira criptomoeda descentralizada do mundo usando Proof of Work. Fornecimento total de 21 milhões BTC.",
    },
    useCase: {
      "zh-CN": "价值储存、支付工具、数字黄金",
      "zh-TW": "價值儲存、支付工具、數位黃金",
      en: "Store of value, payment method, digital gold",
      es: "Almacenamiento de valor, método de pago, oro digital",
      pt: "Armazenamento de valor, método de pagamento, ouro digital",
    },
    consensus: "Proof of Work (PoW)",
    blockTime: "约10分钟 / ~10 minutes",
    maxSupply: "21,000,000 BTC",
    launchDate: "2009-01-03",
    founder: "Satoshi Nakamoto (中本聪)",
    officialWebsite: "https://bitcoin.org",
    whitepaper: "https://bitcoin.org/bitcoin.pdf",
    blockExplorer: "https://blockchair.com/bitcoin",
    github: "https://github.com/bitcoin/bitcoin",
    twitter: "https://twitter.com/bitcoincoreorg",
    reddit: "https://reddit.com/r/bitcoin",
    coingeckoId: "bitcoin",
    cmcId: 1,
  },

  // Ethereum
  ethereum: {
    id: "ethereum",
    symbol: "ETH",
    name: {
      "zh-CN": "以太坊",
      "zh-TW": "以太坊",
      en: "Ethereum",
      es: "Ethereum",
      pt: "Ethereum",
    },
    description: {
      "zh-CN": "全球最大的智能合约平台，支持 DeFi、NFT、Web3 应用。2022年9月完成向权益证明的过渡。",
      "zh-TW": "全球最大的智能合約平台，支持 DeFi、NFT、Web3 應用。2022年9月完成向權益證明的過渡。",
      en: "World's largest smart contract platform supporting DeFi, NFT, and Web3 applications. Transitioned to Proof of Stake in Sept 2022.",
      es: "La plataforma de contratos inteligentes más grande del mundo. Transición a Proof of Stake completada en 2022.",
      pt: "A maior plataforma de contrato inteligente do mundo. Transição para Proof of Stake concluída em 2022.",
    },
    useCase: {
      "zh-CN": "智能合约、DeFi、NFT、Web3 基础设施",
      "zh-TW": "智能合約、DeFi、NFT、Web3 基礎設施",
      en: "Smart contracts, DeFi, NFT, Web3 infrastructure",
      es: "Contratos inteligentes, DeFi, NFT, infraestructura Web3",
      pt: "Contratos inteligentes, DeFi, NFT, infraestrutura Web3",
    },
    consensus: "Proof of Stake (PoS)",
    blockTime: "约12秒 / ~12 seconds",
    launchDate: "2015-07-30",
    founder: "Vitalik Buterin (维塔利克·布特林)",
    officialWebsite: "https://ethereum.org",
    whitepaper: "https://ethereum.org/whitepaper",
    blockExplorer: "https://etherscan.io",
    github: "https://github.com/ethereum",
    twitter: "https://twitter.com/ethereum",
    reddit: "https://reddit.com/r/ethereum",
    coingeckoId: "ethereum",
    cmcId: 1027,
  },

  // Binance Coin
  binancecoin: {
    id: "binancecoin",
    symbol: "BNB",
    name: {
      "zh-CN": "币安币",
      "zh-TW": "幣安幣",
      en: "Binance Coin",
      es: "Moneda Binance",
      pt: "Moeda Binance",
    },
    description: {
      "zh-CN": "币安平台的原生代币。支付交易手续费、参与空投、投票权。币安生态通证。",
      "zh-TW": "幣安平台的原生代幣。支付交易手續費、參與空投、投票權。幣安生態通證。",
      en: "Native token of Binance platform. Used for trading fees, airdrops, and governance. Binance ecosystem token.",
      es: "Token nativo de la plataforma Binance. Utilizado para cuotas, airdrops y gobernanza.",
      pt: "Token nativo da plataforma Binance. Usado para taxas de negociação, airdrops e governança.",
    },
    useCase: {
      "zh-CN": "交易手续费折扣、币安链生态、投票",
      "zh-TW": "交易手續費折扣、幣安鏈生態、投票",
      en: "Trading fee discounts, Binance Chain ecosystem, voting",
      es: "Descuentos de tarifas, ecosistema de Binance Chain",
      pt: "Descontos de taxa de negociação, ecossistema Binance Chain",
    },
    consensus: "Proof of Authority (PoA) - Binance Chain",
    blockTime: "~3 seconds",
    launchDate: "2017-07-14",
    officialWebsite: "https://binance.com",
    blockExplorer: "https://bscscan.com",
    twitter: "https://twitter.com/binance",
    coingeckoId: "binancecoin",
    cmcId: 1839,
  },

  // Solana
  solana: {
    id: "solana",
    symbol: "SOL",
    name: {
      "zh-CN": "Solana",
      "zh-TW": "Solana",
      en: "Solana",
      es: "Solana",
      pt: "Solana",
    },
    description: {
      "zh-CN": "高速公链，支持高吞吐量应用。使用权益历史证明（PoH）共识。每秒可处理数万笔交易。",
      "zh-TW": "高速公鏈，支持高吞吐量應用。使用權益歷史證明（PoH）共識。每秒可處理數萬筆交易。",
      en: "High-speed blockchain supporting high throughput. Uses Proof of History (PoH) consensus. Processes tens of thousands of TPS.",
      es: "Blockchain de alta velocidad con consenso Proof of History. Procesa decenas de miles de transacciones por segundo.",
      pt: "Blockchain de alta velocidade com Proof of History. Processa dezenas de milhares de transações por segundo.",
    },
    useCase: {
      "zh-CN": "DeFi、Web3 应用、高吞吐量",
      "zh-TW": "DeFi、Web3 應用、高吞吐量",
      en: "DeFi, Web3 applications, high throughput",
      es: "DeFi, aplicaciones Web3, alto rendimiento",
      pt: "DeFi, aplicações Web3, alto throughput",
    },
    consensus: "Proof of History (PoH) + Proof of Stake",
    blockTime: "~400ms",
    launchDate: "2020-03-16",
    founder: "Anatoly Yakovenko",
    officialWebsite: "https://solana.com",
    whitepaper: "https://solana.com/solana-whitepaper.pdf",
    blockExplorer: "https://solscan.io",
    github: "https://github.com/solana-labs",
    twitter: "https://twitter.com/solana",
    coingeckoId: "solana",
    cmcId: 5426,
  },
};

// 快讯模板
export interface NewsTemplate {
  category: "price" | "feature" | "partnership" | "security" | "upgrade";
  lang: Lang;
  title: string;
  body: string;
}

export const FLASH_NEWS_TEMPLATES: Record<string, Record<Lang, string>> = {
  price_surge: {
    "zh-CN": "📈 {coin}价格突破关键阻力位，24小时涨幅超{percent}%",
    "zh-TW": "📈 {coin}價格突破關鍵阻力位，24小時漲幅超{percent}%",
    en: "📈 {coin} surges past key resistance level, up {percent}% in 24 hours",
    es: "📈 {coin} supera el nivel de resistencia clave, sube {percent}% en 24 horas",
    pt: "📈 {coin} ultrapassa nível de resistência importante, sobe {percent}% em 24 horas",
  },
  price_drop: {
    "zh-CN": "📉 {coin}价格承压下跌，24小时跌幅达{percent}%",
    "zh-TW": "📉 {coin}價格承壓下跌，24小時跌幅達{percent}%",
    en: "📉 {coin} drops {percent}% in 24 hours amid market pressure",
    es: "📉 {coin} cae {percent}% en 24 horas bajo presión del mercado",
    pt: "📉 {coin} cai {percent}% em 24 horas sob pressão do mercado",
  },
  halving_countdown: {
    "zh-CN": "⏱️ 比特币减半倒计时：还有约{days}天，区块奖励即将从{current}减至{next}",
    "zh-TW": "⏱️ 比特幣減半倒計時：還有約{days}天，區塊獎勵即將從{current}減至{next}",
    en: "⏱️ Bitcoin halving countdown: ~{days} days left. Block rewards will drop from {current} to {next}",
    es: "⏱️ Cuenta atrás para la reducción de Bitcoin: ~{days} días. La recompensa caerá de {current} a {next}",
    pt: "⏱️ Contagem regressiva para halving do Bitcoin: ~{days} dias. Recompensa cai de {current} para {next}",
  },
};

/**
 * 获取币种信息（多语言）
 */
export function getCoinInfo(coinId: string, lang: Lang): CoinInfo | null {
  return COIN_INFO_DB[coinId] || null;
}

/**
 * 生成快讯文本
 */
export function generateFlashNews(
  template: string,
  replacements: Record<string, string>,
  lang: Lang
): string {
  const newsText = FLASH_NEWS_TEMPLATES[template]?.[lang] || "";
  return Object.entries(replacements).reduce((text, [key, value]) => {
    return text.replace(`{${key}}`, value);
  }, newsText);
}
