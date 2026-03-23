// src/utils/priceService.ts
// 多源价格数据服务 + 币种详情抓取
// 支持 Binance, CoinGecko, CoinMarketCap 等多个API

interface PriceData {
  symbol: string;
  name: string;
  price: number;
  priceUSD: number;
  change24h: number;
  high24h: number;
  low24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number | null;
  dominance: number;
  rank: number;
  ath: number;
  atl: number;
  website?: string;
  whitepaper?: string;
  explorer?: string;
  twitter?: string;
  telegram?: string;
  founder?: string;
  launchDate?: string;
  description?: string;
  useCase?: string;
  consensus?: string;
  blockTime?: number;
  maxBlockSize?: number;
}

interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  logo?: string;
  description: string;
  website?: string;
  whitepaper?: string;
  explorer?: string;
  social: {
    twitter?: string;
    telegram?: string;
    discord?: string;
    reddit?: string;
    github?: string;
  };
  technical: {
    consensus?: string;
    blockTime?: number;
    maxSupply?: number;
    totalSupply?: number;
    launchDate?: string;
    founder?: string;
  };
}

// 主流币种配置（TOP 20 + 常见币）
export const MAJOR_COINS = [
  { id: "bitcoin", symbol: "BTC", name: "比特币 / Bitcoin", cmcId: 1 },
  { id: "ethereum", symbol: "ETH", name: "以太坊 / Ethereum", cmcId: 1027 },
  { id: "binancecoin", symbol: "BNB", name: "币安币 / Binance Coin", cmcId: 1839 },
  { id: "solana", symbol: "SOL", name: "Solana", cmcId: 5426 },
  { id: "ripple", symbol: "XRP", name: "瑞波币 / XRP", cmcId: 52 },
  { id: "cardano", symbol: "ADA", name: "卡尔达诺 / Cardano", cmcId: 2010 },
  { id: "dogecoin", symbol: "DOGE", name: "狗狗币 / Dogecoin", cmcId: 74 },
  { id: "tron", symbol: "TRX", name: "波场 / TRON", cmcId: 1958 },
  { id: "polkadot", symbol: "DOT", name: "波卡 / Polkadot", cmcId: 6636 },
  { id: "litecoin", symbol: "LTC", name: "莱特币 / Litecoin", cmcId: 2 },
  { id: "bitcoin-cash", symbol: "BCH", name: "比特币现金 / Bitcoin Cash", cmcId: 1831 },
  { id: "chainlink", symbol: "LINK", name: "Chainlink", cmcId: 1975 },
  { id: "uniswap", symbol: "UNI", name: "Uniswap", cmcId: 7083 },
  { id: "wrapped-bitcoin", symbol: "WBTC", name: "Wrapped Bitcoin", cmcId: 3717 },
  { id: "stellar", symbol: "XLM", name: "恒星币 / Stellar", cmcId: 512 },
  { id: "cosmos", symbol: "ATOM", name: "Cosmos", cmcId: 3794 },
  { id: "avalanche-2", symbol: "AVAX", name: "Avalanche", cmcId: 5805 },
  { id: "polygon", symbol: "MATIC", name: "Polygon", cmcId: 3890 },
  { id: "arbitrum", symbol: "ARB", name: "Arbitrum", cmcId: 11841 },
  { id: "optimism", symbol: "OP", name: "Optimism", cmcId: 11840 },
];

class PriceService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheExpiry = 60 * 1000; // 1 分钟

  /**
   * 从 CoinGecko 获取价格
   */
  async getPriceFromCoinGecko(ids: string[]): Promise<Record<string, PriceData>> {
    try {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(",")}&order=market_cap_desc&sparkline=false&per_page=250`;
      const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      
      const result: Record<string, PriceData> = {};
      for (const coin of data) {
        result[coin.id] = {
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          price: coin.current_price,
          priceUSD: coin.current_price,
          change24h: coin.price_change_percentage_24h || 0,
          high24h: coin.high_24h || 0,
          low24h: coin.low_24h || 0,
          marketCap: coin.market_cap || 0,
          volume24h: coin.total_volume || 0,
          circulatingSupply: coin.circulating_supply || 0,
          totalSupply: coin.total_supply || 0,
          maxSupply: coin.max_supply,
          dominance: coin.market_cap_change_24h || 0,
          rank: coin.market_cap_rank || 0,
          ath: coin.ath || 0,
          atl: coin.atl || 0,
        };
      }
      return result;
    } catch (err) {
      console.error("CoinGecko 请求失败:", err);
      return {};
    }
  }

  /**
   * 从 Binance API 获取价格（快速备用）
   */
  async getPriceFromBinance(symbols: string[]): Promise<Record<string, PriceData>> {
    const apis = [
      "https://data-api.binance.vision/api/v3/ticker/24hr",
      "https://api1.binance.com/api/v3/ticker/24hr",
      "https://api.binance.com/api/v3/ticker/24hr",
    ];

    for (const api of apis) {
      try {
        const res = await fetch(api, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) continue;
        const tickers = await res.json();

        const result: Record<string, PriceData> = {};
        for (const ticker of tickers) {
          const symbol = ticker.symbol.replace("USDT", "");
          if (symbols.includes(symbol)) {
            result[symbol.toLowerCase()] = {
              symbol,
              name: symbol,
              price: parseFloat(ticker.lastPrice),
              priceUSD: parseFloat(ticker.lastPrice),
              change24h: parseFloat(ticker.priceChangePercent),
              high24h: parseFloat(ticker.highPrice),
              low24h: parseFloat(ticker.lowPrice),
              marketCap: 0,
              volume24h: parseFloat(ticker.quoteAssetVolume),
              circulatingSupply: 0,
              totalSupply: 0,
              maxSupply: null,
              dominance: 0,
              rank: 0,
              ath: 0,
              atl: 0,
            };
          }
        }
        return result;
      } catch (err) {
        // 尝试下一个 API
        continue;
      }
    }
    return {};
  }

  /**
   * 从 CoinMarketCap 获取币种详情
   * (需要 API KEY - 可选用于详情页面)
   */
  async getCoinDetailFromCMC(coinId: number, apiKey?: string): Promise<CoinDetail | null> {
    if (!apiKey) {
      console.warn("CoinMarketCap API Key 未提供，跳过详情获取");
      return null;
    }

    try {
      const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${coinId}`;
      const res = await fetch(url, {
        headers: { "X-CMC_PRO_API_KEY": apiKey },
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) return null;
      const data = await res.json();
      const coin = data.data[coinId];

      return {
        id: coin.slug,
        symbol: coin.symbol,
        name: coin.name,
        logo: coin.logo,
        description: coin.description || "",
        website: coin.urls?.website?.[0] || "",
        whitepaper: coin.urls?.whitepaper?.[0] || "",
        explorer: coin.urls?.explorer?.[0] || "",
        social: {
          twitter: coin.urls?.twitter?.[0] || "",
          telegram: coin.urls?.telegram?.[0] || "",
          discord: coin.urls?.discord?.[0] || "",
          reddit: coin.urls?.reddit?.[0] || "",
          github: coin.urls?.source_code?.[0] || "",
        },
        technical: {
          consensus: "",
          launchDate: coin.date_added || "",
        },
      };
    } catch (err) {
      console.error("CMC 详情请求失败:", err);
      return null;
    }
  }

  /**
   * 缓存包装 - 获取多个币种的价格
   */
  async getMultiplePrices(ids: string[], fallback = true): Promise<Record<string, PriceData>> {
    const cacheKey = `prices:${ids.join(",")}`;
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data;
    }

    let result: Record<string, PriceData> = {};

    // 优先使用 CoinGecko（数据全面）
    result = await this.getPriceFromCoinGecko(ids);

    // 如果需要，用 Binance 作为快速备用
    if (fallback && Object.keys(result).length === 0) {
      result = await this.getPriceFromBinance(ids.map(id => id.toUpperCase()));
    }

    this.cache.set(cacheKey, { data: result, timestamp: Date.now() });
    return result;
  }

  /**
   * 获取排行榜数据（市值排序）
   */
  async getTopCoins(limit = 50): Promise<PriceData[]> {
    const ids = MAJOR_COINS.slice(0, Math.min(limit, 50)).map(c => c.id);
    const prices = await this.getMultiplePrices(ids);
    return Object.values(prices).sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0));
  }

  /**
   * 清空缓存
   */
  clearCache(): void {
    this.cache.clear();
  }
}

export const priceService = new PriceService();
export type { PriceData, CoinDetail };
