// src/i18n/ui.ts

export type Lang = "zh-CN" | "zh-TW" | "en" | "es" | "pt";

export const DEFAULT_LANG: Lang = "zh-CN";

export const LANGUAGES: Record<Lang, string> = {
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  "en":    "English",
  "es":    "Español",
  "pt":    "Português",
};

export const HTML_LANG: Record<Lang, string> = {
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
  "en":    "en",
  "es":    "es",
  "pt":    "pt-BR",
};

// URL 路径段（空字符串 = 默认语言/根路径）
export const LANG_TO_PATH: Record<Lang, string> = {
  "zh-CN": "",
  "zh-TW": "zh-tw",
  "en":    "en",
  "es":    "es",
  "pt":    "pt",
};

// URL 路径段（小写） → 内部 Lang key
export const LANG_PATH_MAP: Record<string, Lang> = {
  "zh-tw": "zh-TW",
  "en":    "en",
  "es":    "es",
  "pt":    "pt",
};

// 浏览器语言 → Lang key
export const BROWSER_LANG_MAP: Record<string, Lang> = {
  "zh":    "zh-CN",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
  "zh-HK": "zh-TW",
  "zh-MO": "zh-TW",
  "en":    "en",
  "en-US": "en",
  "en-GB": "en",
  "es":    "es",
  "es-ES": "es",
  "es-MX": "es",
  "pt":    "pt",
  "pt-BR": "pt",
  "pt-PT": "pt",
};

// 所有非默认语言的路径段列表
export const LANG_PATH_SEGMENTS: string[] = ["zh-tw", "en", "es", "pt"];

// ── 左侧导航分类结构 ──────────────────────────────────────
export const TAXONOMY = [
  {
    key: "home",
    href: "/",
    sub: [] as { key: string; labelKey: string; href: string }[],
  },
  {
    key: "news",
    href: "/posts",
    sub: [] as { key: string; labelKey: string; href: string }[],
  },
  {
    key: "market",
    href: "/tags/market",
    sub: [
      { key: "BTC",  labelKey: "cat.btc",    href: "/tags/btc" },
      { key: "ETH",  labelKey: "cat.eth",    href: "/tags/eth" },
      { key: "行情", labelKey: "cat.market", href: "/tags/market" },
    ],
  },
  {
    key: "tutorial",
    href: "/tags/docs",
    sub: [
      { key: "新手入门", labelKey: "cat.beginner",  href: "/tags/beginner" },
      { key: "交易所",   labelKey: "cat.exchange",  href: "/tags/docs" },
      { key: "钱包",     labelKey: "cat.wallet",    href: "/tags/wallet" },
    ],
  },
  {
    key: "defi",
    href: "/tags/defi",
    sub: [
      { key: "DeFi", labelKey: "cat.defi", href: "/tags/defi" },
      { key: "NFT",  labelKey: "cat.nft",  href: "/tags/nft" },
    ],
  },
];

// ── 翻译字典 ──────────────────────────────────────────────
export const UI: Record<Lang, Record<string, string>> = {
  "zh-CN": {
    "site.name":        "CryptoNews",
    "site.desc":        "专业区块链资讯平台，提供比特币行情分析、交易所使用教程、加密钱包安全指南及 DeFi 协议深度解析。",
    "site.desc.short":  "专业区块链与加密货币资讯平台",
    "nav.home":         "首页",
    "nav.flash":        "快讯",
    "nav.news":         "资讯",
    "nav.search":       "搜索",
    "nav.about":        "关于",
    "section.latest":   "最新资讯",
    "section.all":      "全部文章",
    "section.more":     "查看更多",
    "section.flash":    "快讯",
    "section.hot":      "热门文章",
    "section.tutorial": "教程指南",
    "section.related":  "相关文章",
    "section.tags":     "热门标签",
    "section.topic":    "热门话题",
    "section.about":    "关于本站",
    "topbar.enterprise":"企业服务",
    "topbar.investor":  "投资者",
    "topbar.startup":   "创业者",
    "topbar.tools":     "实用工具",
    "topbar.search":    "搜索",
    "topbar.login":     "登录",
    "footer.col.news":  "加密资讯",
    "footer.col.guide": "新手指南",
    "footer.col.links": "快速链接",
    "footer.about":     "关于我们",
    "footer.rights":    "保留所有权利",
    "footer.slogan":    "专业区块链资讯",
    "post.prev":        "上一篇",
    "post.next":        "下一篇",
    "post.toc":         "目录",
    "post.author":      "作者",
    "post.translations":"其他语言版本",
    "about.btc.title":  "比特币资讯",
    "about.btc.desc":   "提供比特币实时行情、价格分析与深度报道，帮助您了解最新市场动态。",
    "about.ex.title":   "交易所教程",
    "about.ex.desc":    "币安、OKX 等主流交易所完整使用教程，从注册到交易一步步教会您。",
    "about.wallet.title":"钱包安全",
    "about.wallet.desc":"MetaMask、Ledger 等钱包使用指南，保护您的数字资产安全。",
    "btn.submit":       "投稿报道",
    "btn.partner":      "合作入驻",
    "lang.label":       "语言",
    "lang.auto":        "自动检测",
    "cat.btc":          "BTC",
    "cat.eth":          "ETH",
    "cat.market":       "行情",
    "cat.beginner":     "新手入门",
    "cat.exchange":     "交易所",
    "cat.wallet":       "钱包",
    "cat.defi":         "DeFi",
    "cat.nft":          "NFT",
    "cat.tutorial":     "教程",
    "cat.market_key":   "market",
    "cat.tutorial_key": "tutorial",
    "cat.defi_key":     "defi",
  },
  "zh-TW": {
    "site.name":        "CryptoNews",
    "site.desc":        "專業區塊鏈資訊平台，提供比特幣行情分析、交易所使用教學、加密錢包安全指南及 DeFi 協議深度解析。",
    "site.desc.short":  "專業區塊鏈與加密貨幣資訊平台",
    "nav.home":         "首頁",
    "nav.flash":        "快訊",
    "nav.news":         "資訊",
    "nav.search":       "搜尋",
    "nav.about":        "關於",
    "section.latest":   "最新資訊",
    "section.all":      "全部文章",
    "section.more":     "查看更多",
    "section.flash":    "快訊",
    "section.hot":      "熱門文章",
    "section.tutorial": "教學指南",
    "section.related":  "相關文章",
    "section.tags":     "熱門標籤",
    "section.topic":    "熱門話題",
    "section.about":    "關於本站",
    "topbar.enterprise":"企業服務",
    "topbar.investor":  "投資者",
    "topbar.startup":   "創業者",
    "topbar.tools":     "實用工具",
    "topbar.search":    "搜尋",
    "topbar.login":     "登入",
    "footer.col.news":  "加密資訊",
    "footer.col.guide": "新手指南",
    "footer.col.links": "快速連結",
    "footer.about":     "關於我們",
    "footer.rights":    "保留所有權利",
    "footer.slogan":    "專業區塊鏈資訊",
    "post.prev":        "上一篇",
    "post.next":        "下一篇",
    "post.toc":         "目錄",
    "post.author":      "作者",
    "post.translations":"其他語言版本",
    "about.btc.title":  "比特幣資訊",
    "about.btc.desc":   "提供比特幣即時行情、價格分析與深度報道，幫助您了解最新市場動態。",
    "about.ex.title":   "交易所教學",
    "about.ex.desc":    "幣安、OKX 等主流交易所完整使用教學，從註冊到交易一步步教會您。",
    "about.wallet.title":"錢包安全",
    "about.wallet.desc":"MetaMask、Ledger 等錢包使用指南，保護您的數位資產安全。",
    "btn.submit":       "投稿報道",
    "btn.partner":      "合作入駐",
    "lang.label":       "語言",
    "lang.auto":        "自動偵測",
    "cat.btc":          "BTC",
    "cat.eth":          "ETH",
    "cat.market":       "行情",
    "cat.beginner":     "新手入門",
    "cat.exchange":     "交易所",
    "cat.wallet":       "錢包",
    "cat.defi":         "DeFi",
    "cat.nft":          "NFT",
    "cat.tutorial":     "教學",
  },
  "en": {
    "site.name":        "CryptoNews",
    "site.desc":        "Professional blockchain news platform covering Bitcoin price analysis, exchange tutorials, crypto wallet security guides and DeFi protocol deep dives.",
    "site.desc.short":  "Professional blockchain & crypto news",
    "nav.home":         "Home",
    "nav.flash":        "Flash",
    "nav.news":         "News",
    "nav.search":       "Search",
    "nav.about":        "About",
    "section.latest":   "Latest News",
    "section.all":      "All Articles",
    "section.more":     "View More",
    "section.flash":    "Flash News",
    "section.hot":      "Trending",
    "section.tutorial": "Tutorials",
    "section.related":  "Related Articles",
    "section.tags":     "Popular Tags",
    "section.topic":    "Topics",
    "section.about":    "About Us",
    "topbar.enterprise":"Enterprise",
    "topbar.investor":  "Investors",
    "topbar.startup":   "Startups",
    "topbar.tools":     "Tools",
    "topbar.search":    "Search",
    "topbar.login":     "Login",
    "footer.col.news":  "Crypto News",
    "footer.col.guide": "Beginner Guide",
    "footer.col.links": "Quick Links",
    "footer.about":     "About Us",
    "footer.rights":    "All rights reserved",
    "footer.slogan":    "Professional Blockchain News",
    "post.prev":        "Previous",
    "post.next":        "Next",
    "post.toc":         "Table of Contents",
    "post.author":      "Author",
    "post.translations":"Other languages",
    "about.btc.title":  "Bitcoin News",
    "about.btc.desc":   "Real-time Bitcoin price, market analysis and in-depth reporting to keep you informed.",
    "about.ex.title":   "Exchange Guides",
    "about.ex.desc":    "Complete tutorials for Binance, OKX and other major exchanges, from sign-up to trading.",
    "about.wallet.title":"Wallet Security",
    "about.wallet.desc":"MetaMask, Ledger and other wallet guides to keep your digital assets safe.",
    "btn.submit":       "Submit Story",
    "btn.partner":      "Partner With Us",
    "lang.label":       "Language",
    "lang.auto":        "Auto detect",
    "cat.btc":          "BTC",
    "cat.eth":          "ETH",
    "cat.market":       "Market",
    "cat.beginner":     "Beginner",
    "cat.exchange":     "Exchange",
    "cat.wallet":       "Wallet",
    "cat.defi":         "DeFi",
    "cat.nft":          "NFT",
    "cat.tutorial":     "Tutorial",
  },
  "es": {
    "site.name":        "CryptoNews",
    "site.desc":        "Plataforma profesional de noticias blockchain con análisis de precios de Bitcoin, tutoriales de exchanges, guías de seguridad para billeteras y análisis de protocolos DeFi.",
    "site.desc.short":  "Plataforma profesional de blockchain y cripto",
    "nav.home":         "Inicio",
    "nav.flash":        "Flash",
    "nav.news":         "Noticias",
    "nav.search":       "Buscar",
    "nav.about":        "Acerca de",
    "section.latest":   "Últimas Noticias",
    "section.all":      "Todos los Artículos",
    "section.more":     "Ver Más",
    "section.flash":    "Noticias Rápidas",
    "section.hot":      "Tendencias",
    "section.tutorial": "Tutoriales",
    "section.related":  "Artículos Relacionados",
    "section.tags":     "Etiquetas Populares",
    "section.topic":    "Temas",
    "section.about":    "Sobre Nosotros",
    "topbar.enterprise":"Empresas",
    "topbar.investor":  "Inversores",
    "topbar.startup":   "Startups",
    "topbar.tools":     "Herramientas",
    "topbar.search":    "Buscar",
    "topbar.login":     "Iniciar sesión",
    "footer.col.news":  "Noticias Cripto",
    "footer.col.guide": "Guía para Principiantes",
    "footer.col.links": "Enlaces Rápidos",
    "footer.about":     "Sobre Nosotros",
    "footer.rights":    "Todos los derechos reservados",
    "footer.slogan":    "Noticias Profesionales de Blockchain",
    "post.prev":        "Anterior",
    "post.next":        "Siguiente",
    "post.toc":         "Índice",
    "post.author":      "Autor",
    "post.translations":"Otros idiomas",
    "about.btc.title":  "Noticias Bitcoin",
    "about.btc.desc":   "Precio de Bitcoin en tiempo real, análisis de mercado e informes detallados.",
    "about.ex.title":   "Guías de Exchange",
    "about.ex.desc":    "Tutoriales completos de Binance, OKX y otros exchanges principales.",
    "about.wallet.title":"Seguridad de Billetera",
    "about.wallet.desc":"Guías de MetaMask, Ledger y otras billeteras para proteger tus activos.",
    "btn.submit":       "Enviar Noticia",
    "btn.partner":      "Ser Socio",
    "lang.label":       "Idioma",
    "lang.auto":        "Detección automática",
    "cat.btc":          "BTC",
    "cat.eth":          "ETH",
    "cat.market":       "Mercado",
    "cat.beginner":     "Principiante",
    "cat.exchange":     "Exchange",
    "cat.wallet":       "Billetera",
    "cat.defi":         "DeFi",
    "cat.nft":          "NFT",
    "cat.tutorial":     "Tutorial",
  },
  "pt": {
    "site.name":        "CryptoNews",
    "site.desc":        "Plataforma profissional de notícias blockchain com análise de preços do Bitcoin, tutoriais de exchanges, guias de segurança para carteiras e análise de protocolos DeFi.",
    "site.desc.short":  "Plataforma profissional de blockchain e cripto",
    "nav.home":         "Início",
    "nav.flash":        "Flash",
    "nav.news":         "Notícias",
    "nav.search":       "Pesquisar",
    "nav.about":        "Sobre",
    "section.latest":   "Últimas Notícias",
    "section.all":      "Todos os Artigos",
    "section.more":     "Ver Mais",
    "section.flash":    "Notícias Rápidas",
    "section.hot":      "Em Alta",
    "section.tutorial": "Tutoriais",
    "section.related":  "Artigos Relacionados",
    "section.tags":     "Tags Populares",
    "section.topic":    "Tópicos",
    "section.about":    "Sobre Nós",
    "topbar.enterprise":"Empresas",
    "topbar.investor":  "Investidores",
    "topbar.startup":   "Startups",
    "topbar.tools":     "Ferramentas",
    "topbar.search":    "Pesquisar",
    "topbar.login":     "Entrar",
    "footer.col.news":  "Notícias Cripto",
    "footer.col.guide": "Guia para Iniciantes",
    "footer.col.links": "Links Rápidos",
    "footer.about":     "Sobre Nós",
    "footer.rights":    "Todos os direitos reservados",
    "footer.slogan":    "Notícias Profissionais de Blockchain",
    "post.prev":        "Anterior",
    "post.next":        "Próximo",
    "post.toc":         "Índice",
    "post.author":      "Autor",
    "post.translations":"Outros idiomas",
    "about.btc.title":  "Notícias Bitcoin",
    "about.btc.desc":   "Preço do Bitcoin em tempo real, análise de mercado e relatórios detalhados.",
    "about.ex.title":   "Guias de Exchange",
    "about.ex.desc":    "Tutoriais completos da Binance, OKX e outras exchanges principais.",
    "about.wallet.title":"Segurança de Carteira",
    "about.wallet.desc":"Guias de MetaMask, Ledger e outras carteiras para proteger seus ativos.",
    "btn.submit":       "Enviar Notícia",
    "btn.partner":      "Seja Parceiro",
    "lang.label":       "Idioma",
    "lang.auto":        "Detecção automática",
    "cat.btc":          "BTC",
    "cat.eth":          "ETH",
    "cat.market":       "Mercado",
    "cat.beginner":     "Iniciante",
    "cat.exchange":     "Exchange",
    "cat.wallet":       "Carteira",
    "cat.defi":         "DeFi",
    "cat.nft":          "NFT",
    "cat.tutorial":     "Tutorial",
  },
};

// ── 工具函数 ──────────────────────────────────────────────

export function getLang(url: URL): Lang {
  const firstSeg = url.pathname.split("/").filter(Boolean)[0] ?? "";
  const lower = firstSeg.toLowerCase();
  if (lower in LANG_PATH_MAP) return LANG_PATH_MAP[lower];
  const hl = url.searchParams.get("hl");
  if (hl && hl in LANGUAGES) return hl as Lang;
  return DEFAULT_LANG;
}

export function stripLangPrefix(pathname: string): string {
  for (const seg of LANG_PATH_SEGMENTS) {
    if (pathname === `/${seg}` || pathname.startsWith(`/${seg}/`)) {
      return pathname.slice(seg.length + 1) || "/";
    }
  }
  return pathname;
}

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

export const buildAlternates = hreflangLinks;

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return UI[lang]?.[key] ?? UI[DEFAULT_LANG]?.[key] ?? key;
  };
}
