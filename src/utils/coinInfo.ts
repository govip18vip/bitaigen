// src/utils/coinInfo.ts
// ─────────────────────────────────────────────────────────────
// 全面的币种详情多语言配置 — 类似 CoinMarketCap 级别信息
// 包含：白皮书、官网、创始人、共识机制、社交链接等
// ─────────────────────────────────────────────────────────────

import type { Lang } from "@/i18n/ui";

export interface CoinInfo {
  id: string;
  symbol: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  useCase: Record<Lang, string>;
  consensus?: string;
  blockTime?: string;
  maxSupply?: string;
  launchDate?: string;
  founder?: string;
  founderFull?: Record<Lang, string>;
  officialWebsite?: string;
  whitepaper?: string;
  blockExplorer?: string;
  github?: string;
  twitter?: string;
  telegram?: string;
  reddit?: string;
  discord?: string;
  coingeckoId: string;
  cmcId?: number;
  color: string;       // 品牌色
  emoji: string;       // 图标
  tags: string[];      // 相关标签
  binanceSymbol: string; // Binance 交易对符号
}

export const COIN_DB: Record<string, CoinInfo> = {
  bitcoin: {
    id: "bitcoin",
    symbol: "BTC",
    binanceSymbol: "BTCUSDT",
    color: "#f7931a",
    emoji: "₿",
    tags: ["btc", "bitcoin", "比特币"],
    name: {
      "zh-CN": "比特币", "zh-TW": "比特幣", en: "Bitcoin", es: "Bitcoin", pt: "Bitcoin",
    },
    description: {
      "zh-CN": "世界上第一个去中心化数字货币，采用工作量证明（PoW）共识机制。总量永久固定2100万枚，被称为「数字黄金」。",
      "zh-TW": "世界上第一個去中心化數字貨幣，採用工作量證明（PoW）共識機制。總量永久固定2100萬枚，被稱為「數位黃金」。",
      en: "The world's first decentralized digital currency using Proof of Work (PoW) consensus. Total supply hard-capped at 21 million BTC, often called 'digital gold'.",
      es: "La primera criptomoneda descentralizada del mundo con consenso PoW. Suministro total fijo de 21 millones de BTC, llamada 'oro digital'.",
      pt: "A primeira criptomoeda descentralizada do mundo usando PoW. Fornecimento total fixo em 21 milhões de BTC, chamada de 'ouro digital'.",
    },
    useCase: {
      "zh-CN": "价值储存、支付工具、数字黄金、通胀对冲",
      "zh-TW": "價值儲存、支付工具、數位黃金、通膨對沖",
      en: "Store of value, payment method, digital gold, inflation hedge",
      es: "Almacenamiento de valor, método de pago, oro digital",
      pt: "Armazenamento de valor, método de pagamento, ouro digital",
    },
    consensus: "Proof of Work (PoW / SHA-256)",
    blockTime: "~10 min",
    maxSupply: "21,000,000 BTC",
    launchDate: "2009-01-03",
    founder: "Satoshi Nakamoto",
    founderFull: {
      "zh-CN": "中本聪（Satoshi Nakamoto）— 匿名创始人，2008年发布白皮书",
      "zh-TW": "中本聰（Satoshi Nakamoto）— 匿名創始人，2008年發佈白皮書",
      en: "Satoshi Nakamoto — pseudonymous creator, published whitepaper in 2008",
      es: "Satoshi Nakamoto — creador pseudónimo, publicó el whitepaper en 2008",
      pt: "Satoshi Nakamoto — criador pseudônimo, publicou o whitepaper em 2008",
    },
    officialWebsite: "https://bitcoin.org",
    whitepaper: "https://bitcoin.org/bitcoin.pdf",
    blockExplorer: "https://blockchair.com/bitcoin",
    github: "https://github.com/bitcoin/bitcoin",
    twitter: "https://x.com/bitcoin",
    reddit: "https://reddit.com/r/bitcoin",
    coingeckoId: "bitcoin",
    cmcId: 1,
  },

  ethereum: {
    id: "ethereum",
    symbol: "ETH",
    binanceSymbol: "ETHUSDT",
    color: "#627eea",
    emoji: "⟠",
    tags: ["eth", "ethereum", "以太坊"],
    name: {
      "zh-CN": "以太坊", "zh-TW": "以太坊", en: "Ethereum", es: "Ethereum", pt: "Ethereum",
    },
    description: {
      "zh-CN": "全球最大的智能合约平台，支持 DeFi、NFT、Web3 应用。2022年9月完成向权益证明(PoS)的合并升级，大幅降低能耗。",
      "zh-TW": "全球最大的智能合約平台，支持 DeFi、NFT、Web3 應用。2022年9月完成向權益證明(PoS)的合併升級。",
      en: "World's largest smart contract platform powering DeFi, NFTs, and Web3. Completed the Merge to Proof of Stake in Sept 2022, reducing energy consumption by ~99.95%.",
      es: "La plataforma de contratos inteligentes más grande del mundo. Completó la transición a PoS en septiembre de 2022.",
      pt: "A maior plataforma de contratos inteligentes do mundo. Concluiu a transição para PoS em setembro de 2022.",
    },
    useCase: {
      "zh-CN": "智能合约、DeFi、NFT、Web3 基础设施、质押收益",
      "zh-TW": "智能合約、DeFi、NFT、Web3 基礎設施、質押收益",
      en: "Smart contracts, DeFi, NFTs, Web3 infrastructure, staking yields",
      es: "Contratos inteligentes, DeFi, NFT, infraestructura Web3",
      pt: "Contratos inteligentes, DeFi, NFT, infraestrutura Web3",
    },
    consensus: "Proof of Stake (PoS)",
    blockTime: "~12 sec",
    maxSupply: "No hard cap (deflationary via EIP-1559)",
    launchDate: "2015-07-30",
    founder: "Vitalik Buterin",
    founderFull: {
      "zh-CN": "Vitalik Buterin（维塔利克·布特林）— 1994年出生的俄裔加拿大程序员",
      "zh-TW": "Vitalik Buterin（維塔利克·布特林）— 1994年出生的俄裔加拿大程式設計師",
      en: "Vitalik Buterin — Russian-Canadian programmer, born 1994, proposed Ethereum in 2013",
      es: "Vitalik Buterin — programador ruso-canadiense, nacido en 1994",
      pt: "Vitalik Buterin — programador russo-canadense, nascido em 1994",
    },
    officialWebsite: "https://ethereum.org",
    whitepaper: "https://ethereum.org/en/whitepaper/",
    blockExplorer: "https://etherscan.io",
    github: "https://github.com/ethereum",
    twitter: "https://x.com/ethereum",
    reddit: "https://reddit.com/r/ethereum",
    discord: "https://discord.gg/ethereum-org",
    coingeckoId: "ethereum",
    cmcId: 1027,
  },

  binancecoin: {
    id: "binancecoin",
    symbol: "BNB",
    binanceSymbol: "BNBUSDT",
    color: "#F0B90B",
    emoji: "🔶",
    tags: ["bnb", "binance"],
    name: {
      "zh-CN": "币安币", "zh-TW": "幣安幣", en: "BNB", es: "BNB", pt: "BNB",
    },
    description: {
      "zh-CN": "币安生态原生代币，用于交易手续费折扣、BNB Chain Gas费、Launchpad参与等。定期通过自动燃烧机制减少供应。",
      "zh-TW": "幣安生態原生代幣，用於交易手續費折扣、BNB Chain Gas費、Launchpad參與等。",
      en: "Native token of the Binance ecosystem. Used for trading fee discounts, BNB Chain gas, Launchpad participation, and more. Regularly burned to reduce supply.",
      es: "Token nativo del ecosistema Binance. Utilizado para descuentos de comisiones y gas de BNB Chain.",
      pt: "Token nativo do ecossistema Binance. Usado para descontos de taxas e gas da BNB Chain.",
    },
    useCase: {
      "zh-CN": "交易手续费折扣、BNB Chain生态、Launchpad、质押",
      "zh-TW": "交易手續費折扣、BNB Chain生態、Launchpad、質押",
      en: "Trading fee discounts, BNB Chain ecosystem, Launchpad, staking",
      es: "Descuentos de tarifas, ecosistema BNB Chain, Launchpad",
      pt: "Descontos de taxa, ecossistema BNB Chain, Launchpad",
    },
    consensus: "Proof of Staked Authority (PoSA)",
    blockTime: "~3 sec",
    maxSupply: "200,000,000 BNB (with burns)",
    launchDate: "2017-07-14",
    founder: "Changpeng Zhao (CZ)",
    founderFull: {
      "zh-CN": "赵长鹏 (CZ) — 华裔加拿大企业家，币安创始人兼前CEO",
      "zh-TW": "趙長鵬 (CZ) — 華裔加拿大企業家，幣安創始人兼前CEO",
      en: "Changpeng Zhao (CZ) — Chinese-Canadian entrepreneur, Binance founder and former CEO",
      es: "Changpeng Zhao (CZ) — empresario chino-canadiense, fundador de Binance",
      pt: "Changpeng Zhao (CZ) — empresário sino-canadense, fundador da Binance",
    },
    officialWebsite: "https://www.bnbchain.org",
    whitepaper: "https://github.com/bnb-chain/whitepaper",
    blockExplorer: "https://bscscan.com",
    github: "https://github.com/bnb-chain",
    twitter: "https://x.com/BNBCHAIN",
    telegram: "https://t.me/bnbchain",
    coingeckoId: "binancecoin",
    cmcId: 1839,
  },

  solana: {
    id: "solana", symbol: "SOL", binanceSymbol: "SOLUSDT",
    color: "#9945FF", emoji: "◎", tags: ["sol", "solana"],
    name: { "zh-CN": "Solana", "zh-TW": "Solana", en: "Solana", es: "Solana", pt: "Solana" },
    description: {
      "zh-CN": "高性能区块链平台，支持每秒数万笔交易，手续费极低。使用独特的时间历史证明(PoH)共识，已成为 DeFi 和 Meme 币的热门平台。",
      "zh-TW": "高性能區塊鏈平台，支持每秒數萬筆交易，手續費極低。使用獨特的時間歷史證明(PoH)共識。",
      en: "High-performance blockchain supporting tens of thousands of TPS with ultra-low fees. Uses unique Proof of History (PoH) consensus. Popular for DeFi and meme coins.",
      es: "Blockchain de alto rendimiento con miles de TPS y tarifas ultra bajas. Usa Proof of History (PoH).",
      pt: "Blockchain de alto desempenho com dezenas de milhares de TPS e taxas ultra baixas.",
    },
    useCase: { "zh-CN": "DeFi、NFT、高频交易、游戏、Meme币", "zh-TW": "DeFi、NFT、高頻交易、遊戲", en: "DeFi, NFTs, high-frequency trading, gaming, meme coins", es: "DeFi, NFT, trading de alta frecuencia, juegos", pt: "DeFi, NFTs, trading de alta frequência, jogos" },
    consensus: "Proof of History (PoH) + Proof of Stake",
    blockTime: "~400 ms", maxSupply: "No hard cap", launchDate: "2020-03-16",
    founder: "Anatoly Yakovenko",
    founderFull: { "zh-CN": "Anatoly Yakovenko — 前高通工程师", "zh-TW": "Anatoly Yakovenko — 前高通工程師", en: "Anatoly Yakovenko — former Qualcomm engineer", es: "Anatoly Yakovenko — ex ingeniero de Qualcomm", pt: "Anatoly Yakovenko — ex engenheiro da Qualcomm" },
    officialWebsite: "https://solana.com", whitepaper: "https://solana.com/solana-whitepaper.pdf",
    blockExplorer: "https://solscan.io", github: "https://github.com/solana-labs",
    twitter: "https://x.com/solana", telegram: "https://t.me/solana", reddit: "https://reddit.com/r/solana",
    discord: "https://discord.gg/solana", coingeckoId: "solana", cmcId: 5426,
  },

  ripple: {
    id: "ripple", symbol: "XRP", binanceSymbol: "XRPUSDT",
    color: "#346AA9", emoji: "✕", tags: ["xrp", "ripple"],
    name: { "zh-CN": "瑞波币", "zh-TW": "瑞波幣", en: "XRP", es: "XRP", pt: "XRP" },
    description: {
      "zh-CN": "专注于跨境支付和银行间结算的数字资产。由Ripple Labs开发，交易速度快、手续费极低，已与多家银行和金融机构建立合作。",
      "zh-TW": "專注於跨境支付和銀行間結算的數字資產。由Ripple Labs開發，已與多家銀行建立合作。",
      en: "Digital asset focused on cross-border payments and bank settlements. Developed by Ripple Labs with partnerships with major banks and financial institutions.",
      es: "Activo digital centrado en pagos transfronterizos. Desarrollado por Ripple Labs con asociaciones bancarias.",
      pt: "Ativo digital focado em pagamentos internacionais. Desenvolvido pela Ripple Labs com parcerias bancárias.",
    },
    useCase: { "zh-CN": "跨境支付、银行结算、汇款、流动性桥梁", "zh-TW": "跨境支付、銀行結算、匯款", en: "Cross-border payments, bank settlements, remittance, liquidity bridge", es: "Pagos transfronterizos, liquidación bancaria", pt: "Pagamentos internacionais, liquidação bancária" },
    consensus: "XRP Ledger Consensus Protocol",
    blockTime: "~3-5 sec", maxSupply: "100,000,000,000 XRP", launchDate: "2012-06-02",
    founder: "Chris Larsen & Jed McCaleb",
    officialWebsite: "https://xrpl.org", whitepaper: "https://ripple.com/files/ripple_consensus_whitepaper.pdf",
    blockExplorer: "https://xrpscan.com", github: "https://github.com/ripple",
    twitter: "https://x.com/Ripple", coingeckoId: "ripple", cmcId: 52,
  },

  cardano: {
    id: "cardano", symbol: "ADA", binanceSymbol: "ADAUSDT",
    color: "#0033AD", emoji: "◆", tags: ["ada", "cardano"],
    name: { "zh-CN": "卡尔达诺", "zh-TW": "卡爾達諾", en: "Cardano", es: "Cardano", pt: "Cardano" },
    description: {
      "zh-CN": "基于同行评审学术研究的第三代区块链平台，采用Ouroboros PoS共识算法。强调安全性、可持续性和可扩展性。",
      "zh-TW": "基於同行評審學術研究的第三代區塊鏈平台，採用Ouroboros PoS共識算法。",
      en: "Third-generation blockchain built on peer-reviewed academic research. Uses Ouroboros PoS consensus, emphasizing security, sustainability, and scalability.",
      es: "Blockchain de tercera generación basada en investigación académica revisada por pares.",
      pt: "Blockchain de terceira geração baseada em pesquisa acadêmica revisada por pares.",
    },
    useCase: { "zh-CN": "智能合约、DeFi、身份认证、供应链", "zh-TW": "智能合約、DeFi、身份認證", en: "Smart contracts, DeFi, identity, supply chain", es: "Contratos inteligentes, DeFi, identidad", pt: "Contratos inteligentes, DeFi, identidade" },
    consensus: "Ouroboros (PoS)",
    blockTime: "~20 sec", maxSupply: "45,000,000,000 ADA", launchDate: "2017-09-29",
    founder: "Charles Hoskinson",
    founderFull: { "zh-CN": "Charles Hoskinson — 以太坊联合创始人之一", "zh-TW": "Charles Hoskinson — 以太坊聯合創始人之一", en: "Charles Hoskinson — Ethereum co-founder", es: "Charles Hoskinson — cofundador de Ethereum", pt: "Charles Hoskinson — cofundador do Ethereum" },
    officialWebsite: "https://cardano.org", whitepaper: "https://docs.cardano.org/about-cardano/introduction",
    blockExplorer: "https://cardanoscan.io", github: "https://github.com/cardano-foundation",
    twitter: "https://x.com/Cardano", telegram: "https://t.me/Cardano", reddit: "https://reddit.com/r/cardano",
    coingeckoId: "cardano", cmcId: 2010,
  },

  dogecoin: {
    id: "dogecoin", symbol: "DOGE", binanceSymbol: "DOGEUSDT",
    color: "#C2A633", emoji: "🐕", tags: ["doge", "dogecoin", "狗狗币"],
    name: { "zh-CN": "狗狗币", "zh-TW": "狗狗幣", en: "Dogecoin", es: "Dogecoin", pt: "Dogecoin" },
    description: {
      "zh-CN": "起源于网络迷因的加密货币，后因Elon Musk等名人推广而爆火。采用Scrypt算法的PoW共识，社区活跃度极高。",
      "zh-TW": "起源於網路迷因的加密貨幣，後因Elon Musk等名人推廣而爆紅。",
      en: "Cryptocurrency born from an internet meme that gained massive popularity through Elon Musk endorsements. Uses Scrypt PoW consensus with an active community.",
      es: "Criptomoneda nacida de un meme de internet, popularizada por Elon Musk.",
      pt: "Criptomoeda nascida de um meme da internet, popularizada por Elon Musk.",
    },
    useCase: { "zh-CN": "小额支付、打赏、社区货币、Meme文化", "zh-TW": "小額支付、打賞、社區貨幣", en: "Micro-payments, tipping, community currency, meme culture", es: "Micropagos, propinas, moneda comunitaria", pt: "Micropagamentos, gorjetas, moeda comunitária" },
    consensus: "Proof of Work (Scrypt)",
    blockTime: "~1 min", maxSupply: "No cap (inflationary)", launchDate: "2013-12-06",
    founder: "Billy Markus & Jackson Palmer",
    officialWebsite: "https://dogecoin.com", blockExplorer: "https://dogechain.info",
    github: "https://github.com/dogecoin/dogecoin", twitter: "https://x.com/dogecoin",
    reddit: "https://reddit.com/r/dogecoin", coingeckoId: "dogecoin", cmcId: 74,
  },

  tron: {
    id: "tron", symbol: "TRX", binanceSymbol: "TRXUSDT",
    color: "#E50914", emoji: "♦", tags: ["trx", "tron", "波场"],
    name: { "zh-CN": "波场", "zh-TW": "波場", en: "TRON", es: "TRON", pt: "TRON" },
    description: {
      "zh-CN": "去中心化互联网基础设施，专注于内容分发和娱乐。是USDT最大的流通网络之一，交易速度快且Gas费几乎为零。",
      "zh-TW": "去中心化互聯網基礎設施，專注於內容分發和娛樂。是USDT最大的流通網路之一。",
      en: "Decentralized internet infrastructure focused on content distribution. One of the largest networks for USDT circulation with near-zero transaction fees.",
      es: "Infraestructura de internet descentralizada para distribución de contenido.",
      pt: "Infraestrutura de internet descentralizada focada em distribuição de conteúdo.",
    },
    useCase: { "zh-CN": "稳定币转账、内容分发、DeFi、游戏", "zh-TW": "穩定幣轉賬、內容分發、DeFi", en: "Stablecoin transfers, content distribution, DeFi, gaming", es: "Transferencias de stablecoins, distribución de contenido", pt: "Transferências de stablecoins, distribuição de conteúdo" },
    consensus: "Delegated Proof of Stake (DPoS)",
    blockTime: "~3 sec", maxSupply: "No hard cap", launchDate: "2017-08-28",
    founder: "Justin Sun (孙宇晨)",
    officialWebsite: "https://tron.network", whitepaper: "https://tron.network/static/doc/white_paper_v_2_0.pdf",
    blockExplorer: "https://tronscan.org", github: "https://github.com/tronprotocol",
    twitter: "https://x.com/traborig", telegram: "https://t.me/tronnetworkEN",
    coingeckoId: "tron", cmcId: 1958,
  },

  polkadot: {
    id: "polkadot", symbol: "DOT", binanceSymbol: "DOTUSDT",
    color: "#E6007A", emoji: "●", tags: ["dot", "polkadot"],
    name: { "zh-CN": "波卡", "zh-TW": "波卡", en: "Polkadot", es: "Polkadot", pt: "Polkadot" },
    description: {
      "zh-CN": "跨链互操作协议，允许不同区块链之间安全通信和数据传输。由以太坊联合创始人Gavin Wood创建。",
      "zh-TW": "跨鏈互操作協議，允許不同區塊鏈之間安全通信和數據傳輸。由以太坊聯合創始人Gavin Wood創建。",
      en: "Cross-chain interoperability protocol enabling secure communication between different blockchains. Created by Ethereum co-founder Gavin Wood.",
      es: "Protocolo de interoperabilidad cross-chain creado por el cofundador de Ethereum, Gavin Wood.",
      pt: "Protocolo de interoperabilidade cross-chain criado pelo cofundador do Ethereum, Gavin Wood.",
    },
    useCase: { "zh-CN": "跨链互操作、平行链、去中心化治理", "zh-TW": "跨鏈互操作、平行鏈", en: "Cross-chain interoperability, parachains, governance", es: "Interoperabilidad cross-chain, parachains", pt: "Interoperabilidade cross-chain, parachains" },
    consensus: "Nominated Proof of Stake (NPoS)",
    blockTime: "~6 sec", launchDate: "2020-05-26",
    founder: "Gavin Wood",
    founderFull: { "zh-CN": "Gavin Wood — 以太坊联合创始人、Solidity语言发明者", "zh-TW": "Gavin Wood — 以太坊聯合創始人", en: "Gavin Wood — Ethereum co-founder, inventor of Solidity", es: "Gavin Wood — cofundador de Ethereum", pt: "Gavin Wood — cofundador do Ethereum" },
    officialWebsite: "https://polkadot.network", whitepaper: "https://polkadot.network/whitepaper/",
    blockExplorer: "https://polkadot.subscan.io", github: "https://github.com/polkadot-fellows",
    twitter: "https://x.com/Polkadot", reddit: "https://reddit.com/r/polkadot",
    coingeckoId: "polkadot", cmcId: 6636,
  },

  litecoin: {
    id: "litecoin", symbol: "LTC", binanceSymbol: "LTCUSDT",
    color: "#BFBBBB", emoji: "Ł", tags: ["ltc", "litecoin", "莱特币"],
    name: { "zh-CN": "莱特币", "zh-TW": "萊特幣", en: "Litecoin", es: "Litecoin", pt: "Litecoin" },
    description: {
      "zh-CN": "比特币的「轻量版」分叉，出块速度更快（2.5分钟），总量8400万枚。被视为比特币的测试网络和补充支付方案。",
      "zh-TW": "比特幣的「輕量版」分叉，出塊速度更快（2.5分鐘），總量8400萬枚。",
      en: "A 'lighter' Bitcoin fork with 2.5-minute block times and 84 million max supply. Often seen as Bitcoin's testing ground and complementary payment solution.",
      es: "Fork 'ligero' de Bitcoin con bloques de 2.5 minutos y suministro máximo de 84 millones.",
      pt: "Fork 'leve' do Bitcoin com blocos de 2,5 minutos e fornecimento máximo de 84 milhões.",
    },
    useCase: { "zh-CN": "日常支付、快速转账、比特币补充", "zh-TW": "日常支付、快速轉賬", en: "Daily payments, fast transfers, Bitcoin complement", es: "Pagos diarios, transferencias rápidas", pt: "Pagamentos diários, transferências rápidas" },
    consensus: "Proof of Work (Scrypt)",
    blockTime: "~2.5 min", maxSupply: "84,000,000 LTC", launchDate: "2011-10-07",
    founder: "Charlie Lee",
    officialWebsite: "https://litecoin.org", blockExplorer: "https://blockchair.com/litecoin",
    github: "https://github.com/litecoin-project", twitter: "https://x.com/litecoin",
    reddit: "https://reddit.com/r/litecoin", coingeckoId: "litecoin", cmcId: 2,
  },

  chainlink: {
    id: "chainlink", symbol: "LINK", binanceSymbol: "LINKUSDT",
    color: "#2A5ADA", emoji: "🔗", tags: ["link", "chainlink"],
    name: { "zh-CN": "Chainlink", "zh-TW": "Chainlink", en: "Chainlink", es: "Chainlink", pt: "Chainlink" },
    description: {
      "zh-CN": "去中心化预言机网络，为智能合约提供可靠的链下数据。是DeFi生态最核心的基础设施之一，被数百个项目集成。",
      "zh-TW": "去中心化預言機網路，為智能合約提供可靠的鏈下數據。是DeFi生態最核心的基礎設施之一。",
      en: "Decentralized oracle network providing reliable off-chain data to smart contracts. Core DeFi infrastructure integrated by hundreds of projects.",
      es: "Red de oráculos descentralizados que proporciona datos off-chain a contratos inteligentes.",
      pt: "Rede de oráculos descentralizados fornecendo dados off-chain para contratos inteligentes.",
    },
    useCase: { "zh-CN": "预言机、跨链通信、CCIP、数据验证", "zh-TW": "預言機、跨鏈通信、CCIP", en: "Oracles, cross-chain communication (CCIP), data verification", es: "Oráculos, comunicación cross-chain, verificación de datos", pt: "Oráculos, comunicação cross-chain, verificação de dados" },
    consensus: "Off-chain Reporting (OCR)",
    launchDate: "2017-09-19", founder: "Sergey Nazarov",
    officialWebsite: "https://chain.link", whitepaper: "https://chain.link/whitepaper",
    blockExplorer: "https://etherscan.io/token/0x514910771af9ca656af840dff83e8264ecf986ca",
    github: "https://github.com/smartcontractkit", twitter: "https://x.com/chainlink",
    discord: "https://discord.gg/chainlink", coingeckoId: "chainlink", cmcId: 1975,
  },

  "avalanche-2": {
    id: "avalanche-2", symbol: "AVAX", binanceSymbol: "AVAXUSDT",
    color: "#E84142", emoji: "▲", tags: ["avax", "avalanche"],
    name: { "zh-CN": "Avalanche", "zh-TW": "Avalanche", en: "Avalanche", es: "Avalanche", pt: "Avalanche" },
    description: {
      "zh-CN": "高吞吐量智能合约平台，以亚秒级终端确认时间著称。采用独特的雪崩共识协议，支持创建自定义子网。",
      "zh-TW": "高吞吐量智能合約平台，以亞秒級終端確認時間著稱。",
      en: "High-throughput smart contract platform known for sub-second finality. Uses unique Avalanche consensus protocol with customizable subnets.",
      es: "Plataforma de contratos inteligentes de alto rendimiento con finalidad sub-segundo.",
      pt: "Plataforma de contratos inteligentes de alto desempenho com finalidade sub-segundo.",
    },
    useCase: { "zh-CN": "DeFi、子网、企业区块链、游戏", "zh-TW": "DeFi、子網、企業區塊鏈", en: "DeFi, subnets, enterprise blockchain, gaming", es: "DeFi, subnets, blockchain empresarial", pt: "DeFi, subnets, blockchain empresarial" },
    consensus: "Avalanche Consensus (PoS)",
    blockTime: "~2 sec", maxSupply: "720,000,000 AVAX", launchDate: "2020-09-21",
    founder: "Emin Gün Sirer",
    officialWebsite: "https://avax.network", whitepaper: "https://www.avalabs.org/whitepapers",
    blockExplorer: "https://snowtrace.io", github: "https://github.com/ava-labs",
    twitter: "https://x.com/avaborig", telegram: "https://t.me/avalancheavax",
    discord: "https://discord.gg/avalanche", coingeckoId: "avalanche-2", cmcId: 5805,
  },

  uniswap: {
    id: "uniswap", symbol: "UNI", binanceSymbol: "UNIUSDT",
    color: "#FF007A", emoji: "🦄", tags: ["uni", "uniswap", "defi"],
    name: { "zh-CN": "Uniswap", "zh-TW": "Uniswap", en: "Uniswap", es: "Uniswap", pt: "Uniswap" },
    description: {
      "zh-CN": "以太坊上最大的去中心化交易所(DEX)，使用自动做市商(AMM)模型。UNI是其治理代币，持有者可参与协议决策。",
      "zh-TW": "以太坊上最大的去中心化交易所(DEX)，使用自動做市商(AMM)模型。",
      en: "Largest decentralized exchange (DEX) on Ethereum using an Automated Market Maker (AMM) model. UNI is the governance token.",
      es: "El DEX más grande de Ethereum usando modelo AMM. UNI es el token de gobernanza.",
      pt: "O maior DEX no Ethereum usando modelo AMM. UNI é o token de governança.",
    },
    useCase: { "zh-CN": "去中心化交易、流动性提供、治理投票", "zh-TW": "去中心化交易、流動性提供", en: "Decentralized trading, liquidity provision, governance", es: "Trading descentralizado, provisión de liquidez", pt: "Trading descentralizado, provisão de liquidez" },
    launchDate: "2018-11-02", founder: "Hayden Adams",
    officialWebsite: "https://uniswap.org", whitepaper: "https://uniswap.org/whitepaper-v3.pdf",
    blockExplorer: "https://etherscan.io/token/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    github: "https://github.com/Uniswap", twitter: "https://x.com/Uniswap",
    discord: "https://discord.gg/uniswap", coingeckoId: "uniswap", cmcId: 7083,
  },

  stellar: {
    id: "stellar", symbol: "XLM", binanceSymbol: "XLMUSDT",
    color: "#000000", emoji: "★", tags: ["xlm", "stellar"],
    name: { "zh-CN": "恒星币", "zh-TW": "恆星幣", en: "Stellar", es: "Stellar", pt: "Stellar" },
    description: {
      "zh-CN": "开源支付网络，专注于金融包容性和跨境汇款。与IBM等企业合作，手续费极低（约0.00001 XLM）。",
      "zh-TW": "開源支付網路，專注於金融包容性和跨境匯款。",
      en: "Open-source payment network focused on financial inclusion and cross-border remittance. Partners with IBM, extremely low fees (~0.00001 XLM).",
      es: "Red de pago de código abierto enfocada en inclusión financiera.",
      pt: "Rede de pagamento de código aberto focada em inclusão financeira.",
    },
    useCase: { "zh-CN": "跨境汇款、代币化资产、企业支付", "zh-TW": "跨境匯款、代幣化資產", en: "Cross-border remittance, tokenized assets, enterprise payments", es: "Remesas internacionales, activos tokenizados", pt: "Remessas internacionais, ativos tokenizados" },
    consensus: "Stellar Consensus Protocol (SCP)",
    blockTime: "~5 sec", maxSupply: "50,001,806,812 XLM", launchDate: "2014-07-31",
    founder: "Jed McCaleb",
    officialWebsite: "https://stellar.org", whitepaper: "https://www.stellar.org/papers/stellar-consensus-protocol",
    blockExplorer: "https://stellarchain.io", github: "https://github.com/stellar",
    twitter: "https://x.com/StellarOrg", coingeckoId: "stellar", cmcId: 512,
  },

  cosmos: {
    id: "cosmos", symbol: "ATOM", binanceSymbol: "ATOMUSDT",
    color: "#2E3148", emoji: "⊕", tags: ["atom", "cosmos"],
    name: { "zh-CN": "Cosmos", "zh-TW": "Cosmos", en: "Cosmos", es: "Cosmos", pt: "Cosmos" },
    description: {
      "zh-CN": "「区块链互联网」，通过IBC协议实现不同区块链之间的互操作。Cosmos SDK被众多项目采用构建应用链。",
      "zh-TW": "「區塊鏈互聯網」，通過IBC協議實現不同區塊鏈之間的互操作。",
      en: "The 'Internet of Blockchains' enabling interoperability through the IBC protocol. Cosmos SDK is widely used to build application-specific chains.",
      es: "El 'Internet de Blockchains' con interoperabilidad a través del protocolo IBC.",
      pt: "A 'Internet de Blockchains' com interoperabilidade através do protocolo IBC.",
    },
    useCase: { "zh-CN": "跨链通信(IBC)、应用链、质押", "zh-TW": "跨鏈通信(IBC)、應用鏈", en: "Cross-chain communication (IBC), app chains, staking", es: "Comunicación cross-chain, cadenas de aplicación", pt: "Comunicação cross-chain, app chains" },
    consensus: "Tendermint BFT (PoS)",
    blockTime: "~6 sec", launchDate: "2019-03-13",
    founder: "Jae Kwon & Ethan Buchman",
    officialWebsite: "https://cosmos.network", whitepaper: "https://v1.cosmos.network/resources/whitepaper",
    blockExplorer: "https://www.mintscan.io/cosmos", github: "https://github.com/cosmos",
    twitter: "https://x.com/cosmos", discord: "https://discord.gg/cosmosnetwork",
    coingeckoId: "cosmos", cmcId: 3794,
  },

  "bitcoin-cash": {
    id: "bitcoin-cash", symbol: "BCH", binanceSymbol: "BCHUSDT",
    color: "#0AC18E", emoji: "¤", tags: ["bch", "bitcoin-cash"],
    name: { "zh-CN": "比特币现金", "zh-TW": "比特幣現金", en: "Bitcoin Cash", es: "Bitcoin Cash", pt: "Bitcoin Cash" },
    description: {
      "zh-CN": "2017年从比特币硬分叉而来，区块大小扩大到32MB，旨在成为日常支付的「电子现金」。",
      "zh-TW": "2017年從比特幣硬分叉而來，區塊大小擴大到32MB。",
      en: "Hard fork of Bitcoin from 2017 with 32MB block size, aimed at becoming 'electronic cash' for daily payments.",
      es: "Hard fork de Bitcoin de 2017 con bloques de 32MB para pagos diarios.",
      pt: "Hard fork do Bitcoin de 2017 com blocos de 32MB para pagamentos diários.",
    },
    useCase: { "zh-CN": "日常支付、点对点电子现金", "zh-TW": "日常支付、點對點電子現金", en: "Daily payments, peer-to-peer electronic cash", es: "Pagos diarios, efectivo electrónico P2P", pt: "Pagamentos diários, dinheiro eletrônico P2P" },
    consensus: "Proof of Work (SHA-256)",
    blockTime: "~10 min", maxSupply: "21,000,000 BCH", launchDate: "2017-08-01",
    officialWebsite: "https://bitcoincash.org", blockExplorer: "https://blockchair.com/bitcoin-cash",
    github: "https://gitlab.com/bitcoin-cash-node", twitter: "https://x.com/bitcoincashorg",
    coingeckoId: "bitcoin-cash", cmcId: 1831,
  },

  polygon: {
    id: "polygon", symbol: "POL", binanceSymbol: "POLUSDT",
    color: "#7B3FE4", emoji: "▮", tags: ["pol", "matic", "polygon"],
    name: { "zh-CN": "Polygon", "zh-TW": "Polygon", en: "Polygon", es: "Polygon", pt: "Polygon" },
    description: {
      "zh-CN": "以太坊Layer 2扩容方案，提供高速低费的交易体验。已从MATIC升级为POL代币，支持zkEVM等零知识证明技术。",
      "zh-TW": "以太坊Layer 2擴容方案，提供高速低費的交易體驗。",
      en: "Ethereum Layer 2 scaling solution with high-speed, low-cost transactions. Upgraded from MATIC to POL token, supporting zkEVM zero-knowledge technology.",
      es: "Solución de escalado Layer 2 de Ethereum con transacciones rápidas y baratas.",
      pt: "Solução de escalabilidade Layer 2 do Ethereum com transações rápidas e baratas.",
    },
    useCase: { "zh-CN": "Layer 2扩容、zkEVM、DeFi、NFT", "zh-TW": "Layer 2擴容、zkEVM", en: "Layer 2 scaling, zkEVM, DeFi, NFTs", es: "Escalado Layer 2, zkEVM, DeFi", pt: "Escalabilidade Layer 2, zkEVM, DeFi" },
    consensus: "Proof of Stake (PoS)",
    blockTime: "~2 sec", launchDate: "2017-10-01",
    founder: "Sandeep Nailwal, Jaynti Kanani & Anurag Arjun",
    officialWebsite: "https://polygon.technology", whitepaper: "https://polygon.technology/papers/pol-whitepaper",
    blockExplorer: "https://polygonscan.com", github: "https://github.com/maticnetwork",
    twitter: "https://x.com/0xPolygon", discord: "https://discord.gg/polygon",
    coingeckoId: "polygon-ecosystem-token", cmcId: 3890,
  },

  arbitrum: {
    id: "arbitrum", symbol: "ARB", binanceSymbol: "ARBUSDT",
    color: "#28A0F0", emoji: "🔵", tags: ["arb", "arbitrum"],
    name: { "zh-CN": "Arbitrum", "zh-TW": "Arbitrum", en: "Arbitrum", es: "Arbitrum", pt: "Arbitrum" },
    description: {
      "zh-CN": "以太坊最大的Optimistic Rollup Layer 2网络，TVL领先。提供与以太坊相同的安全性，但手续费大幅降低。",
      "zh-TW": "以太坊最大的Optimistic Rollup Layer 2網路，TVL領先。",
      en: "Ethereum's largest Optimistic Rollup L2 network by TVL. Offers Ethereum-level security with significantly reduced fees.",
      es: "La red L2 Optimistic Rollup más grande de Ethereum por TVL.",
      pt: "A maior rede L2 Optimistic Rollup do Ethereum por TVL.",
    },
    useCase: { "zh-CN": "Layer 2扩容、DeFi、低费交易", "zh-TW": "Layer 2擴容、DeFi", en: "L2 scaling, DeFi, low-cost transactions", es: "Escalado L2, DeFi, transacciones baratas", pt: "Escalabilidade L2, DeFi, transações baratas" },
    consensus: "Optimistic Rollup",
    launchDate: "2021-08-31", founder: "Offchain Labs (Steven Goldfeder, Harry Kalodner, Ed Felten)",
    officialWebsite: "https://arbitrum.io", blockExplorer: "https://arbiscan.io",
    github: "https://github.com/OffchainLabs", twitter: "https://x.com/arbitrum",
    discord: "https://discord.gg/arbitrum", coingeckoId: "arbitrum", cmcId: 11841,
  },

  optimism: {
    id: "optimism", symbol: "OP", binanceSymbol: "OPUSDT",
    color: "#FF0420", emoji: "🔴", tags: ["op", "optimism"],
    name: { "zh-CN": "Optimism", "zh-TW": "Optimism", en: "Optimism", es: "Optimism", pt: "Optimism" },
    description: {
      "zh-CN": "以太坊Optimistic Rollup L2网络，提出了Superchain愿景。推动OP Stack开源框架，被Base等多个L2采用。",
      "zh-TW": "以太坊Optimistic Rollup L2網路，提出了Superchain願景。",
      en: "Ethereum Optimistic Rollup L2 with the Superchain vision. Developed the open-source OP Stack framework, adopted by Base and other L2s.",
      es: "L2 Optimistic Rollup de Ethereum con la visión Superchain.",
      pt: "L2 Optimistic Rollup do Ethereum com a visão Superchain.",
    },
    useCase: { "zh-CN": "Layer 2扩容、Superchain、OP Stack", "zh-TW": "Layer 2擴容、Superchain", en: "L2 scaling, Superchain, OP Stack", es: "Escalado L2, Superchain, OP Stack", pt: "Escalabilidade L2, Superchain, OP Stack" },
    consensus: "Optimistic Rollup",
    launchDate: "2021-12-16", founder: "Jinglan Wang, Karl Floersch, Kevin Ho",
    officialWebsite: "https://optimism.io", blockExplorer: "https://optimistic.etherscan.io",
    github: "https://github.com/ethereum-optimism", twitter: "https://x.com/Optimism",
    discord: "https://discord.gg/optimism", coingeckoId: "optimism", cmcId: 11840,
  },

  sui: {
    id: "sui", symbol: "SUI", binanceSymbol: "SUIUSDT",
    color: "#4DA2FF", emoji: "💧", tags: ["sui"],
    name: { "zh-CN": "Sui", "zh-TW": "Sui", en: "Sui", es: "Sui", pt: "Sui" },
    description: {
      "zh-CN": "由前Meta(Facebook)工程师开发的高性能Layer 1区块链，使用Move编程语言。主打并行交易处理，实现亚秒级终端确认。",
      "zh-TW": "由前Meta工程師開發的高性能Layer 1區塊鏈，使用Move程式語言。",
      en: "High-performance L1 blockchain built by former Meta engineers using the Move programming language. Focuses on parallel transaction processing with sub-second finality.",
      es: "Blockchain L1 de alto rendimiento construida por ex ingenieros de Meta usando Move.",
      pt: "Blockchain L1 de alto desempenho construída por ex engenheiros da Meta usando Move.",
    },
    useCase: { "zh-CN": "DeFi、游戏、NFT、高性能应用", "zh-TW": "DeFi、遊戲、NFT", en: "DeFi, gaming, NFTs, high-performance apps", es: "DeFi, juegos, NFT", pt: "DeFi, jogos, NFTs" },
    consensus: "Mysticeti (PoS DAG-based)",
    blockTime: "~390 ms", launchDate: "2023-05-03",
    founder: "Mysten Labs (Evan Cheng, Sam Blackshear)",
    officialWebsite: "https://sui.io", whitepaper: "https://docs.sui.io/paper/sui.pdf",
    blockExplorer: "https://suiscan.xyz", github: "https://github.com/MystenLabs",
    twitter: "https://x.com/SuiNetwork", discord: "https://discord.gg/sui",
    coingeckoId: "sui", cmcId: 20947,
  },

  // ════════════════════════════════════════════════════════════
  //  Extended coin database — 30 additional coins
  // ════════════════════════════════════════════════════════════

  toncoin: {
    id: "toncoin", symbol: "TON", binanceSymbol: "TONUSDT",
    color: "#0098EA", emoji: "💎", tags: ["ton", "telegram"],
    name: { "zh-CN": "Toncoin", "zh-TW": "Toncoin", en: "Toncoin", es: "Toncoin", pt: "Toncoin" },
    description: {
      "zh-CN": "由 Telegram 团队最初开发的高性能 Layer 1 区块链，支持极高吞吐量和即时交易。深度整合 Telegram 生态，拥有9亿潜在用户群。",
      "zh-TW": "由 Telegram 團隊最初開發的高性能 Layer 1 區塊鏈，深度整合 Telegram 生態系統。",
      en: "High-performance L1 blockchain originally developed by the Telegram team. Deeply integrated with the Telegram ecosystem, reaching 900M+ potential users.",
      es: "Blockchain L1 de alto rendimiento originalmente desarrollada por Telegram. Integrada con el ecosistema Telegram.",
      pt: "Blockchain L1 de alto desempenho originalmente desenvolvida pelo Telegram. Integrada ao ecossistema Telegram.",
    },
    useCase: { "zh-CN": "Telegram支付、DeFi、游戏小程序", "zh-TW": "Telegram支付、DeFi、遊戲", en: "Telegram payments, DeFi, mini-apps", es: "Pagos Telegram, DeFi, mini-apps", pt: "Pagamentos Telegram, DeFi, mini-apps" },
    consensus: "Proof of Stake (PoS)", blockTime: "~5 s", launchDate: "2018-11-15",
    founder: "Nikolai & Pavel Durov (TON Foundation)",
    officialWebsite: "https://ton.org", blockExplorer: "https://tonscan.org",
    github: "https://github.com/ton-blockchain", twitter: "https://x.com/ton_blockchain",
    telegram: "https://t.me/toncoin", coingeckoId: "the-open-network", cmcId: 11419,
  },

  shiba: {
    id: "shiba", symbol: "SHIB", binanceSymbol: "SHIBUSDT",
    color: "#FFA409", emoji: "🐕", tags: ["shib", "meme"],
    name: { "zh-CN": "柴犬币", "zh-TW": "柴犬幣", en: "Shiba Inu", es: "Shiba Inu", pt: "Shiba Inu" },
    description: {
      "zh-CN": "以太坊上最大的 Meme 币之一，拥有强大社区和完整生态（ShibaSwap、Shibarium L2）。被称为「狗狗币杀手」。",
      "zh-TW": "以太坊上最大的 Meme 幣之一，擁有完整生態系統包含 ShibaSwap 和 Shibarium L2。",
      en: "One of the largest meme tokens on Ethereum with a full ecosystem including ShibaSwap DEX and Shibarium L2 network.",
      es: "Uno de los mayores tokens meme en Ethereum con ecosistema completo incluyendo ShibaSwap y Shibarium L2.",
      pt: "Um dos maiores tokens meme no Ethereum com ecossistema completo incluindo ShibaSwap e Shibarium L2.",
    },
    useCase: { "zh-CN": "社区代币、DeFi、Shibarium L2", "zh-TW": "社群代幣、DeFi", en: "Community token, DeFi, Shibarium L2", es: "Token comunitario, DeFi", pt: "Token comunitário, DeFi" },
    consensus: "ERC-20 (Ethereum PoS)", launchDate: "2020-08-01",
    founder: "Ryoshi (anonymous)",
    officialWebsite: "https://shibatoken.com", blockExplorer: "https://etherscan.io/token/0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    twitter: "https://x.com/Shibtoken", coingeckoId: "shiba-inu", cmcId: 5994,
  },

  near: {
    id: "near", symbol: "NEAR", binanceSymbol: "NEARUSDT",
    color: "#00C08B", emoji: "🌐", tags: ["near", "ai"],
    name: { "zh-CN": "NEAR Protocol", "zh-TW": "NEAR Protocol", en: "NEAR Protocol", es: "NEAR Protocol", pt: "NEAR Protocol" },
    description: {
      "zh-CN": "采用分片技术的高性能 Layer 1 区块链，主打用户友好和开发者体验。近期重点发展 AI + 区块链结合，推出 NEAR AI。",
      "zh-TW": "採用分片技術的高性能 Layer 1 區塊鏈，主打用戶友好和開發者體驗。",
      en: "High-performance L1 blockchain using sharding technology, focused on user-friendly experience. Recently pivoting to AI + blockchain with NEAR AI initiative.",
      es: "Blockchain L1 de alto rendimiento con tecnología de fragmentación, enfocada en experiencia de usuario.",
      pt: "Blockchain L1 de alto desempenho usando tecnologia de fragmentação, focada em experiência do usuário.",
    },
    useCase: { "zh-CN": "AI应用、DeFi、dApp平台", "zh-TW": "AI應用、DeFi、dApp平台", en: "AI apps, DeFi, dApp platform", es: "Apps AI, DeFi, plataforma dApp", pt: "Apps IA, DeFi, plataforma dApp" },
    consensus: "Nightshade (PoS Sharding)", blockTime: "~1 s", launchDate: "2020-04-22",
    founder: "Illia Polosukhin, Alexander Skidanov",
    officialWebsite: "https://near.org", blockExplorer: "https://nearblocks.io",
    github: "https://github.com/near", twitter: "https://x.com/NEARProtocol",
    coingeckoId: "near", cmcId: 6535,
  },

  "internet-computer": {
    id: "internet-computer", symbol: "ICP", binanceSymbol: "ICPUSDT",
    color: "#29ABE2", emoji: "∞", tags: ["icp", "web3"],
    name: { "zh-CN": "互联网计算机", "zh-TW": "網際網路電腦", en: "Internet Computer", es: "Internet Computer", pt: "Internet Computer" },
    description: {
      "zh-CN": "DFINITY 基金会开发的「世界计算机」，可直接在链上运行网站和应用。采用独创的链钥密码学和 NNS 治理系统。",
      "zh-TW": "DFINITY 基金會開發的「世界電腦」，可直接在鏈上運行網站和應用程式。",
      en: "DFINITY's 'world computer' that runs websites and apps directly on-chain. Uses novel Chain Key cryptography and NNS governance.",
      es: "La 'computadora mundial' de DFINITY que ejecuta sitios web y apps directamente en cadena.",
      pt: "O 'computador mundial' da DFINITY que executa sites e apps diretamente on-chain.",
    },
    useCase: { "zh-CN": "链上网站、DeFi、SNS治理", "zh-TW": "鏈上網站、DeFi", en: "On-chain websites, DeFi, SNS governance", es: "Sitios on-chain, DeFi", pt: "Sites on-chain, DeFi" },
    consensus: "Threshold Relay (PoS)", blockTime: "~1 s", launchDate: "2021-05-10",
    founder: "Dominic Williams (DFINITY Foundation)",
    officialWebsite: "https://internetcomputer.org", blockExplorer: "https://dashboard.internetcomputer.org",
    github: "https://github.com/dfinity", twitter: "https://x.com/dfinity",
    coingeckoId: "internet-computer", cmcId: 8916,
  },

  filecoin: {
    id: "filecoin", symbol: "FIL", binanceSymbol: "FILUSDT",
    color: "#0090FF", emoji: "📁", tags: ["fil", "storage"],
    name: { "zh-CN": "Filecoin", "zh-TW": "Filecoin", en: "Filecoin", es: "Filecoin", pt: "Filecoin" },
    description: {
      "zh-CN": "去中心化存储网络，用户可以出租闲置硬盘空间赚取 FIL。基于 IPFS 协议，致力于创建永久性数据存储市场。",
      "zh-TW": "去中心化存儲網路，用戶可出租閒置硬碟空間賺取 FIL。基於 IPFS 協議。",
      en: "Decentralized storage network where users rent unused hard drive space for FIL rewards. Built on IPFS, creating a permanent data storage marketplace.",
      es: "Red de almacenamiento descentralizado donde usuarios alquilan espacio de disco duro.",
      pt: "Rede de armazenamento descentralizado onde usuários alugam espaço em disco.",
    },
    useCase: { "zh-CN": "去中心化存储、数据市场、Web3基础设施", "zh-TW": "去中心化存儲、Web3基礎設施", en: "Decentralized storage, data marketplace, Web3 infrastructure", es: "Almacenamiento descentralizado, Web3", pt: "Armazenamento descentralizado, Web3" },
    consensus: "Proof of Replication + Spacetime", blockTime: "~30 s", launchDate: "2020-10-15",
    founder: "Juan Benet (Protocol Labs)",
    officialWebsite: "https://filecoin.io", blockExplorer: "https://filfox.info",
    github: "https://github.com/filecoin-project", twitter: "https://x.com/Filecoin",
    coingeckoId: "filecoin", cmcId: 2280,
  },

  hedera: {
    id: "hedera", symbol: "HBAR", binanceSymbol: "HBARUSDT",
    color: "#000000", emoji: "ℏ", tags: ["hbar", "enterprise"],
    name: { "zh-CN": "Hedera", "zh-TW": "Hedera", en: "Hedera", es: "Hedera", pt: "Hedera" },
    description: {
      "zh-CN": "企业级公共分布式账本，采用 Hashgraph 共识算法（非区块链）。理事会成员包括谷歌、IBM、波音等全球500强企业。",
      "zh-TW": "企業級公共分散式帳本，採用 Hashgraph 共識算法。理事會包括 Google、IBM 等企業。",
      en: "Enterprise-grade public distributed ledger using Hashgraph consensus (not blockchain). Governing council includes Google, IBM, Boeing, and other Fortune 500 companies.",
      es: "Libro mayor público de nivel empresarial usando consenso Hashgraph. Consejo incluye Google, IBM.",
      pt: "Livro-razão público de nível empresarial usando consenso Hashgraph. Conselho inclui Google, IBM.",
    },
    useCase: { "zh-CN": "企业应用、供应链、支付、代币化", "zh-TW": "企業應用、供應鏈、代幣化", en: "Enterprise apps, supply chain, payments, tokenization", es: "Apps empresariales, cadena de suministro", pt: "Apps empresariais, cadeia de suprimentos" },
    consensus: "Hashgraph (aBFT)", blockTime: "~3-5 s", launchDate: "2019-09-16",
    founder: "Leemon Baird, Mance Harmon",
    officialWebsite: "https://hedera.com", blockExplorer: "https://hashscan.io",
    github: "https://github.com/hashgraph", twitter: "https://x.com/heabordera",
    coingeckoId: "hedera-hashgraph", cmcId: 4642,
  },

  render: {
    id: "render", symbol: "RENDER", binanceSymbol: "RENDERUSDT",
    color: "#000000", emoji: "🎨", tags: ["render", "ai", "gpu"],
    name: { "zh-CN": "Render Network", "zh-TW": "Render Network", en: "Render Network", es: "Render Network", pt: "Render Network" },
    description: {
      "zh-CN": "去中心化 GPU 渲染网络，连接闲置 GPU 算力与需要渲染/AI计算的用户。是 AI 与区块链结合的代表性项目之一。",
      "zh-TW": "去中心化 GPU 渲染網路，連接閒置 GPU 算力與需要渲染/AI計算的用戶。",
      en: "Decentralized GPU rendering network connecting idle GPU power with users needing rendering/AI compute. A leading AI + blockchain project.",
      es: "Red descentralizada de renderizado GPU que conecta poder GPU inactivo con usuarios de renderizado/IA.",
      pt: "Rede descentralizada de renderização GPU conectando poder GPU ocioso com usuários de renderização/IA.",
    },
    useCase: { "zh-CN": "GPU渲染、AI计算、3D内容创作", "zh-TW": "GPU渲染、AI計算", en: "GPU rendering, AI compute, 3D content", es: "Renderizado GPU, cómputo IA", pt: "Renderização GPU, computação IA" },
    launchDate: "2020-06-01", founder: "Jules Urbach (OTOY)",
    officialWebsite: "https://rendernetwork.com", twitter: "https://x.com/rendernetwork",
    coingeckoId: "render-token", cmcId: 5690,
  },

  aptos: {
    id: "aptos", symbol: "APT", binanceSymbol: "APTUSDT",
    color: "#2DD8A3", emoji: "🟢", tags: ["apt", "move"],
    name: { "zh-CN": "Aptos", "zh-TW": "Aptos", en: "Aptos", es: "Aptos", pt: "Aptos" },
    description: {
      "zh-CN": "由前Meta(Diem)团队开发的 Layer 1 区块链，使用 Move 编程语言。主打安全性和可扩展性，理论 TPS 超过 16 万。",
      "zh-TW": "由前 Meta(Diem)團隊開發的 Layer 1 區塊鏈，使用 Move 程式語言。",
      en: "L1 blockchain built by former Meta (Diem) team using the Move language. Focuses on safety and scalability with theoretical 160K+ TPS.",
      es: "Blockchain L1 construida por el ex equipo Meta (Diem) usando Move.",
      pt: "Blockchain L1 construída pela ex equipe Meta (Diem) usando Move.",
    },
    useCase: { "zh-CN": "DeFi、NFT、游戏、企业应用", "zh-TW": "DeFi、NFT、遊戲", en: "DeFi, NFTs, gaming, enterprise", es: "DeFi, NFTs, juegos", pt: "DeFi, NFTs, jogos" },
    consensus: "AptosBFT (PoS)", blockTime: "~160 ms", launchDate: "2022-10-17",
    founder: "Mo Shaikh, Avery Ching (Aptos Labs)",
    officialWebsite: "https://aptoslabs.com", blockExplorer: "https://aptoscan.com",
    github: "https://github.com/aptos-labs", twitter: "https://x.com/Aptos",
    coingeckoId: "aptos", cmcId: 21794,
  },

  pepe: {
    id: "pepe", symbol: "PEPE", binanceSymbol: "PEPEUSDT",
    color: "#4C9641", emoji: "🐸", tags: ["pepe", "meme"],
    name: { "zh-CN": "Pepe", "zh-TW": "Pepe", en: "Pepe", es: "Pepe", pt: "Pepe" },
    description: {
      "zh-CN": "2023年爆红的以太坊 Meme 币，基于经典网络梗图「Pepe the Frog」。无预售、零税费、纯粹由社区驱动。",
      "zh-TW": "2023年爆紅的以太坊 Meme 幣，基於經典網路迷因「Pepe the Frog」。",
      en: "Ethereum-based meme coin that went viral in 2023, based on the 'Pepe the Frog' meme. No presale, zero tax, purely community-driven.",
      es: "Moneda meme de Ethereum viral en 2023, basada en el meme 'Pepe the Frog'. Sin preventa, impuesto cero.",
      pt: "Moeda meme do Ethereum viral em 2023, baseada no meme 'Pepe the Frog'. Sem pré-venda, taxa zero.",
    },
    useCase: { "zh-CN": "Meme文化、社区代币", "zh-TW": "Meme文化、社群代幣", en: "Meme culture, community token", es: "Cultura meme, token comunitario", pt: "Cultura meme, token comunitário" },
    consensus: "ERC-20 (Ethereum PoS)", launchDate: "2023-04-17",
    officialWebsite: "https://pepecoin.io", blockExplorer: "https://etherscan.io/token/0x6982508145454Ce325dDbE47a25d4ec3d2311933",
    twitter: "https://x.com/pepecoineth", coingeckoId: "pepe", cmcId: 24478,
  },

  fetch: {
    id: "fetch", symbol: "FET", binanceSymbol: "FETUSDT",
    color: "#1B2D5B", emoji: "🤖", tags: ["fet", "ai"],
    name: { "zh-CN": "Fetch.ai", "zh-TW": "Fetch.ai", en: "Fetch.ai", es: "Fetch.ai", pt: "Fetch.ai" },
    description: {
      "zh-CN": "AI + 区块链融合平台，允许创建和部署自主 AI 代理。与 SingularityNET、Ocean Protocol 合并为 ASI 联盟，打造去中心化 AI 超级智能。",
      "zh-TW": "AI + 區塊鏈融合平台，允許創建和部署自主 AI 代理。已合併為 ASI 聯盟。",
      en: "AI + blockchain platform enabling autonomous AI agents. Merged with SingularityNET and Ocean Protocol to form the ASI Alliance for decentralized super-intelligence.",
      es: "Plataforma AI + blockchain que permite agentes IA autónomos. Fusionada con ASI Alliance.",
      pt: "Plataforma IA + blockchain permitindo agentes IA autônomos. Fundida com ASI Alliance.",
    },
    useCase: { "zh-CN": "AI代理、数据市场、自动化经济", "zh-TW": "AI代理、數據市場", en: "AI agents, data marketplace, automated economy", es: "Agentes IA, mercado de datos", pt: "Agentes IA, mercado de dados" },
    consensus: "Cosmos SDK (PoS)", launchDate: "2019-02-28",
    founder: "Humayun Sheikh, Toby Simpson",
    officialWebsite: "https://fetch.ai", twitter: "https://x.com/Fetch_ai",
    coingeckoId: "fetch-ai", cmcId: 3773,
  },

  kaspa: {
    id: "kaspa", symbol: "KAS", binanceSymbol: "KASUSDT",
    color: "#49EACB", emoji: "⚡", tags: ["kas", "pow"],
    name: { "zh-CN": "Kaspa", "zh-TW": "Kaspa", en: "Kaspa", es: "Kaspa", pt: "Kaspa" },
    description: {
      "zh-CN": "采用 GHOSTDAG 协议的工作量证明（PoW）区块链，实现每秒 10+ 个区块的并行出块。被视为「下一代比特币」。",
      "zh-TW": "採用 GHOSTDAG 協議的 PoW 區塊鏈，實現並行出塊。被視為「下一代比特幣」。",
      en: "PoW blockchain using GHOSTDAG protocol enabling 10+ parallel blocks per second. Seen as a 'next-gen Bitcoin' with instant confirmations.",
      es: "Blockchain PoW usando protocolo GHOSTDAG con 10+ bloques paralelos por segundo.",
      pt: "Blockchain PoW usando protocolo GHOSTDAG com 10+ blocos paralelos por segundo.",
    },
    useCase: { "zh-CN": "高速PoW支付、价值存储", "zh-TW": "高速PoW支付、價值存儲", en: "Fast PoW payments, store of value", es: "Pagos PoW rápidos, almacenamiento de valor", pt: "Pagamentos PoW rápidos, armazenamento de valor" },
    consensus: "GHOSTDAG (PoW / kHeavyHash)", blockTime: "~1 s", launchDate: "2021-11-07",
    founder: "Yonatan Sompolinsky",
    officialWebsite: "https://kaspa.org", blockExplorer: "https://explorer.kaspa.org",
    github: "https://github.com/kaspanet", twitter: "https://x.com/KaspaCurrency",
    coingeckoId: "kaspa", cmcId: 20396,
  },

  injective: {
    id: "injective", symbol: "INJ", binanceSymbol: "INJUSDT",
    color: "#17EAD9", emoji: "💉", tags: ["inj", "defi"],
    name: { "zh-CN": "Injective", "zh-TW": "Injective", en: "Injective", es: "Injective", pt: "Injective" },
    description: {
      "zh-CN": "专为金融应用优化的 Layer 1 区块链，支持去中心化衍生品、期货和现货交易。基于 Cosmos SDK，具备跨链互操作性。",
      "zh-TW": "專為金融應用優化的 Layer 1 區塊鏈，支持去中心化衍生品交易。",
      en: "L1 blockchain optimized for financial applications, supporting decentralized derivatives, futures and spot trading. Built on Cosmos SDK with cross-chain interoperability.",
      es: "Blockchain L1 optimizada para aplicaciones financieras con derivados descentralizados.",
      pt: "Blockchain L1 otimizada para aplicações financeiras com derivativos descentralizados.",
    },
    useCase: { "zh-CN": "去中心化交易、衍生品、DeFi", "zh-TW": "去中心化交易、衍生品", en: "DEX, derivatives, DeFi", es: "DEX, derivados, DeFi", pt: "DEX, derivativos, DeFi" },
    consensus: "Tendermint (PoS)", blockTime: "~1 s", launchDate: "2021-11-30",
    founder: "Eric Chen, Albert Chon",
    officialWebsite: "https://injective.com", blockExplorer: "https://explorer.injective.network",
    github: "https://github.com/InjectiveLabs", twitter: "https://x.com/Injective_",
    coingeckoId: "injective-protocol", cmcId: 7226,
  },

  immutable: {
    id: "immutable", symbol: "IMX", binanceSymbol: "IMXUSDT",
    color: "#28C8FF", emoji: "🎮", tags: ["imx", "gaming", "nft"],
    name: { "zh-CN": "Immutable", "zh-TW": "Immutable", en: "Immutable", es: "Immutable", pt: "Immutable" },
    description: {
      "zh-CN": "以太坊上最大的 Web3 游戏平台，提供零 Gas 费的 NFT 铸造和交易。与多款 AAA 级游戏合作。",
      "zh-TW": "以太坊上最大的 Web3 遊戲平台，提供零 Gas 費的 NFT 鑄造和交易。",
      en: "Largest Web3 gaming platform on Ethereum offering gas-free NFT minting and trading. Partners with multiple AAA game studios.",
      es: "Mayor plataforma de juegos Web3 en Ethereum con NFT sin gas. Socios con estudios AAA.",
      pt: "Maior plataforma de jogos Web3 no Ethereum com NFT sem gas. Parcerias com estúdios AAA.",
    },
    useCase: { "zh-CN": "Web3游戏、NFT交易、零Gas", "zh-TW": "Web3遊戲、NFT交易", en: "Web3 gaming, NFT trading, gas-free", es: "Juegos Web3, NFT sin gas", pt: "Jogos Web3, NFT sem gas" },
    consensus: "zkEVM Rollup (Ethereum L2)", launchDate: "2021-04-08",
    founder: "Robbie Ferguson, James Ferguson",
    officialWebsite: "https://immutable.com", twitter: "https://x.com/Immutable",
    coingeckoId: "immutable-x", cmcId: 10603,
  },

  sei: {
    id: "sei", symbol: "SEI", binanceSymbol: "SEIUSDT",
    color: "#9B1C2E", emoji: "🔴", tags: ["sei", "defi"],
    name: { "zh-CN": "Sei", "zh-TW": "Sei", en: "Sei", es: "Sei", pt: "Sei" },
    description: {
      "zh-CN": "专为交易优化的 Layer 1 区块链，号称「最快的链」。支持并行订单匹配和内置订单簿，专为 DeFi 和交易应用设计。",
      "zh-TW": "專為交易優化的 Layer 1 區塊鏈，支持並行訂單匹配和內置訂單簿。",
      en: "Trading-optimized L1 blockchain, dubbed 'the fastest chain'. Features parallel order matching and built-in order book, designed for DeFi and trading apps.",
      es: "Blockchain L1 optimizada para trading con emparejamiento paralelo de órdenes.",
      pt: "Blockchain L1 otimizada para trading com correspondência paralela de ordens.",
    },
    useCase: { "zh-CN": "DEX、交易基础设施、DeFi", "zh-TW": "DEX、交易基礎設施", en: "DEX, trading infrastructure, DeFi", es: "DEX, infraestructura de trading", pt: "DEX, infraestrutura de trading" },
    consensus: "Twin-Turbo Consensus (PoS)", blockTime: "~390 ms", launchDate: "2023-08-15",
    founder: "Jeffrey Feng, Jayendra Jog",
    officialWebsite: "https://sei.io", blockExplorer: "https://seitrace.com",
    github: "https://github.com/sei-protocol", twitter: "https://x.com/SeiNetwork",
    coingeckoId: "sei-network", cmcId: 23149,
  },

  aave: {
    id: "aave", symbol: "AAVE", binanceSymbol: "AAVEUSDT",
    color: "#B6509E", emoji: "👻", tags: ["aave", "defi", "lending"],
    name: { "zh-CN": "Aave", "zh-TW": "Aave", en: "Aave", es: "Aave", pt: "Aave" },
    description: {
      "zh-CN": "最大的去中心化借贷协议之一，支持多链部署。用户可存款赚取利息或抵押借贷，首创闪电贷（Flash Loan）功能。TVL 超百亿美元。",
      "zh-TW": "最大的去中心化借貸協議之一，支持多鏈部署。首創閃電貸（Flash Loan）功能。",
      en: "One of the largest decentralized lending protocols with multi-chain deployment. Users can earn interest on deposits or borrow against collateral. Pioneered Flash Loans. TVL exceeds $10B.",
      es: "Uno de los mayores protocolos de préstamos descentralizados con despliegue multi-cadena.",
      pt: "Um dos maiores protocolos de empréstimos descentralizados com implantação multi-chain.",
    },
    useCase: { "zh-CN": "去中心化借贷、闪电贷、DeFi收益", "zh-TW": "去中心化借貸、閃電貸", en: "Decentralized lending, flash loans, DeFi yield", es: "Préstamos descentralizados, flash loans", pt: "Empréstimos descentralizados, flash loans" },
    consensus: "ERC-20 (multi-chain)", launchDate: "2020-01-08",
    founder: "Stani Kulechov",
    officialWebsite: "https://aave.com", blockExplorer: "https://etherscan.io/token/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    github: "https://github.com/aave", twitter: "https://x.com/aaborave",
    coingeckoId: "aave", cmcId: 7278,
  },

  mantle: {
    id: "mantle", symbol: "MNT", binanceSymbol: "MNTUSDT",
    color: "#000000", emoji: "🏔", tags: ["mnt", "l2"],
    name: { "zh-CN": "Mantle", "zh-TW": "Mantle", en: "Mantle", es: "Mantle", pt: "Mantle" },
    description: {
      "zh-CN": "以太坊 Layer 2 网络，采用模块化架构结合 Optimistic Rollup。由 BitDAO 社区资金支持，拥有超30亿美元国库储备。",
      "zh-TW": "以太坊 Layer 2 網路，採用模塊化架構結合 Optimistic Rollup。",
      en: "Ethereum L2 network using modular architecture with Optimistic Rollup. Backed by BitDAO community with $3B+ treasury.",
      es: "Red L2 de Ethereum usando arquitectura modular con Optimistic Rollup.",
      pt: "Rede L2 do Ethereum usando arquitetura modular com Optimistic Rollup.",
    },
    useCase: { "zh-CN": "以太坊扩容、低Gas交易、DeFi", "zh-TW": "以太坊擴容、低Gas交易", en: "Ethereum scaling, low-cost transactions, DeFi", es: "Escalado Ethereum, transacciones económicas", pt: "Escalabilidade Ethereum, transações baratas" },
    consensus: "Optimistic Rollup (Ethereum L2)", launchDate: "2023-07-14",
    officialWebsite: "https://mantle.xyz", blockExplorer: "https://explorer.mantle.xyz",
    github: "https://github.com/mantlenetworkio", twitter: "https://x.com/0xMantle",
    coingeckoId: "mantle", cmcId: 27075,
  },

  theta: {
    id: "theta", symbol: "THETA", binanceSymbol: "THETAUSDT",
    color: "#2AB8E6", emoji: "📹", tags: ["theta", "video"],
    name: { "zh-CN": "Theta Network", "zh-TW": "Theta Network", en: "Theta Network", es: "Theta Network", pt: "Theta Network" },
    description: {
      "zh-CN": "去中心化视频流媒体网络，用户通过分享带宽和算力赚取代币。获得三星、索尼等企业验证节点支持。",
      "zh-TW": "去中心化視頻串流媒體網路，用戶通過分享頻寬賺取代幣。",
      en: "Decentralized video streaming network where users earn tokens by sharing bandwidth and compute. Supported by Samsung, Sony as enterprise validator nodes.",
      es: "Red descentralizada de streaming de video donde usuarios ganan tokens compartiendo ancho de banda.",
      pt: "Rede descentralizada de streaming de vídeo onde usuários ganham tokens compartilhando largura de banda.",
    },
    useCase: { "zh-CN": "视频流媒体、CDN、NFT", "zh-TW": "視頻串流、CDN、NFT", en: "Video streaming, CDN, NFT", es: "Streaming de video, CDN, NFT", pt: "Streaming de vídeo, CDN, NFT" },
    consensus: "Multi-level BFT (PoS)", blockTime: "~6 s", launchDate: "2019-03-15",
    founder: "Mitch Liu, Jieyi Long",
    officialWebsite: "https://thetatoken.org", blockExplorer: "https://explorer.thetatoken.org",
    github: "https://github.com/thetatoken", twitter: "https://x.com/Theta_Network",
    coingeckoId: "theta-token", cmcId: 2416,
  },

  ondo: {
    id: "ondo", symbol: "ONDO", binanceSymbol: "ONDOUSDT",
    color: "#1441D3", emoji: "🏦", tags: ["ondo", "rwa"],
    name: { "zh-CN": "Ondo Finance", "zh-TW": "Ondo Finance", en: "Ondo Finance", es: "Ondo Finance", pt: "Ondo Finance" },
    description: {
      "zh-CN": "现实世界资产（RWA）代币化领军项目，将美国国债和企业债券带上链。USDY 是其代表产品，提供链上美元收益。",
      "zh-TW": "現實世界資產（RWA）代幣化領軍項目，將美國國債帶上鏈。",
      en: "Leading Real World Asset (RWA) tokenization protocol, bringing US Treasuries and corporate bonds on-chain. USDY offers on-chain dollar yield.",
      es: "Protocolo líder de tokenización de activos del mundo real (RWA) con bonos del Tesoro de EE.UU.",
      pt: "Protocolo líder de tokenização de ativos do mundo real (RWA) com títulos do Tesouro dos EUA.",
    },
    useCase: { "zh-CN": "RWA代币化、国债上链、链上收益", "zh-TW": "RWA代幣化、國債上鏈", en: "RWA tokenization, on-chain Treasuries, yield", es: "Tokenización RWA, rendimiento on-chain", pt: "Tokenização RWA, rendimento on-chain" },
    launchDate: "2023-01-01", founder: "Nathan Allman (ex Goldman Sachs)",
    officialWebsite: "https://ondo.finance", twitter: "https://x.com/OndoFinance",
    coingeckoId: "ondo-finance", cmcId: 21159,
  },

  jupiter: {
    id: "jupiter", symbol: "JUP", binanceSymbol: "JUPUSDT",
    color: "#49D49D", emoji: "♃", tags: ["jup", "solana", "dex"],
    name: { "zh-CN": "Jupiter", "zh-TW": "Jupiter", en: "Jupiter", es: "Jupiter", pt: "Jupiter" },
    description: {
      "zh-CN": "Solana 生态最大的 DEX 聚合器，提供最优代币交换路径。支持限价单、DCA定投和永续合约交易。",
      "zh-TW": "Solana 生態最大的 DEX 聚合器，提供最優代幣交換路徑。",
      en: "Largest DEX aggregator on Solana, providing optimal token swap routes. Supports limit orders, DCA and perpetual contract trading.",
      es: "Mayor agregador DEX en Solana con rutas óptimas de intercambio de tokens.",
      pt: "Maior agregador DEX em Solana com rotas ótimas de troca de tokens.",
    },
    useCase: { "zh-CN": "DEX聚合、Solana交易、限价单", "zh-TW": "DEX聚合、Solana交易", en: "DEX aggregation, Solana trading, limit orders", es: "Agregación DEX, trading en Solana", pt: "Agregação DEX, trading em Solana" },
    launchDate: "2024-01-31", founder: "Meow (pseudonym)",
    officialWebsite: "https://jup.ag", twitter: "https://x.com/JupiterExchange",
    coingeckoId: "jupiter-exchange-solana", cmcId: 29210,
  },

  worldcoin: {
    id: "worldcoin", symbol: "WLD", binanceSymbol: "WLDUSDT",
    color: "#000000", emoji: "🌍", tags: ["wld", "ai", "identity"],
    name: { "zh-CN": "Worldcoin", "zh-TW": "Worldcoin", en: "Worldcoin", es: "Worldcoin", pt: "Worldcoin" },
    description: {
      "zh-CN": "由 OpenAI 联合创始人 Sam Altman 发起的身份验证和数字货币项目。通过虹膜扫描（Orb）实现人类身份证明，对抗 AI 时代的身份造假。",
      "zh-TW": "由 OpenAI 聯合創始人 Sam Altman 發起的身份驗證項目，通過虹膜掃描實現人類身份證明。",
      en: "Identity verification and digital currency project by OpenAI co-founder Sam Altman. Uses iris scanning (Orb) to prove humanness in the AI era.",
      es: "Proyecto de verificación de identidad por el cofundador de OpenAI Sam Altman usando escaneo de iris.",
      pt: "Projeto de verificação de identidade pelo cofundador da OpenAI Sam Altman usando escaneamento de íris.",
    },
    useCase: { "zh-CN": "人类身份证明、UBI、数字身份", "zh-TW": "人類身份證明、數位身份", en: "Proof of humanness, UBI, digital identity", es: "Prueba de humanidad, identidad digital", pt: "Prova de humanidade, identidade digital" },
    launchDate: "2023-07-24", founder: "Sam Altman, Alex Blania",
    officialWebsite: "https://worldcoin.org", twitter: "https://x.com/worldcoin",
    coingeckoId: "worldcoin-wld", cmcId: 13502,
  },

  "stacks": {
    id: "stacks", symbol: "STX", binanceSymbol: "STXUSDT",
    color: "#5546FF", emoji: "📚", tags: ["stx", "bitcoin", "l2"],
    name: { "zh-CN": "Stacks", "zh-TW": "Stacks", en: "Stacks", es: "Stacks", pt: "Stacks" },
    description: {
      "zh-CN": "比特币 Layer 2 智能合约平台，通过传输证明（PoX）将智能合约结算到比特币主网。使 BTC 可编程化。",
      "zh-TW": "比特幣 Layer 2 智能合約平台，通過 PoX 將智能合約結算到比特幣主網。",
      en: "Bitcoin L2 smart contract platform using Proof of Transfer (PoX) to settle contracts on Bitcoin mainnet. Makes BTC programmable.",
      es: "Plataforma de contratos inteligentes L2 de Bitcoin usando PoX.",
      pt: "Plataforma de contratos inteligentes L2 do Bitcoin usando PoX.",
    },
    useCase: { "zh-CN": "比特币智能合约、BTC DeFi、NFT", "zh-TW": "比特幣智能合約、BTC DeFi", en: "Bitcoin smart contracts, BTC DeFi, NFTs", es: "Contratos inteligentes Bitcoin, BTC DeFi", pt: "Contratos inteligentes Bitcoin, BTC DeFi" },
    consensus: "Proof of Transfer (PoX)", blockTime: "~10 min (BTC anchored)", launchDate: "2021-01-14",
    founder: "Muneeb Ali, Ryan Shea",
    officialWebsite: "https://stacks.co", blockExplorer: "https://explorer.hiro.so",
    github: "https://github.com/stacks-network", twitter: "https://x.com/Stacks",
    coingeckoId: "blockstack", cmcId: 4847,
  },
};

// ── 导出 MAJOR_COINS 列表（按市值大致排序）──────────────────
export const MAJOR_COINS = [
  // Top 20 by market cap
  "bitcoin", "ethereum", "binancecoin", "solana", "ripple",
  "toncoin", "cardano", "dogecoin", "tron", "shiba",
  "avalanche-2", "chainlink", "polkadot", "litecoin", "near",
  "bitcoin-cash", "uniswap", "stellar", "hedera", "sui",
  // Extended: AI, L2, DeFi, Gaming, Meme, RWA
  "aptos", "render", "filecoin", "internet-computer", "kaspa",
  "arbitrum", "optimism", "cosmos", "polygon", "pepe",
  "fetch", "injective", "immutable", "sei", "aave",
  "mantle", "theta", "ondo", "jupiter", "worldcoin", "stacks",
].map(id => COIN_DB[id]).filter(Boolean);

/**
 * 获取币种信息
 */
export function getCoinInfo(coinId: string, _lang?: Lang): CoinInfo | null {
  return COIN_DB[coinId] || null;
}

/**
 * 通过 symbol 查找币种
 */
export function getCoinBySymbol(symbol: string): CoinInfo | null {
  const upper = symbol.toUpperCase();
  return Object.values(COIN_DB).find(c => c.symbol === upper) || null;
}
