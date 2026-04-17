// src/utils/glossaryLinker.ts
// Auto-links glossary terms in article body HTML.
// Only links the FIRST occurrence of each term to avoid over-linking.
// Skips terms inside headings, anchors, code blocks, and existing links.

export interface GlossaryTerm {
  /** Display pattern to match (Chinese or English) */
  pattern: string;
  /** URL to link to */
  href: string;
  /** Tooltip text */
  title: string;
}

// ── Glossary term definitions ────────────────────────────────────
// Only terms that have internal page targets are included.
const GLOSSARY_TERMS: GlossaryTerm[] = [
  { pattern: "比特币", href: "/coin/btc", title: "比特币 Bitcoin — 第一个去中心化数字货币" },
  { pattern: "Bitcoin", href: "/coin/btc", title: "Bitcoin — The first decentralized cryptocurrency" },
  { pattern: "BTC", href: "/coin/btc", title: "BTC — Bitcoin" },
  { pattern: "以太坊", href: "/coin/eth", title: "以太坊 Ethereum — 最大的智能合约平台" },
  { pattern: "Ethereum", href: "/coin/eth", title: "Ethereum — The largest smart contract platform" },
  { pattern: "ETH", href: "/coin/eth", title: "ETH — Ethereum" },
  { pattern: "Solana", href: "/coin/sol", title: "Solana — High-performance Layer 1 blockchain" },
  { pattern: "SOL", href: "/coin/sol", title: "SOL — Solana" },
  { pattern: "BNB", href: "/coin/bnb", title: "BNB — Binance Coin" },
  { pattern: "XRP", href: "/coin/xrp", title: "XRP — Ripple" },
  { pattern: "ADA", href: "/coin/ada", title: "ADA — Cardano" },
  { pattern: "DOGE", href: "/coin/doge", title: "DOGE — Dogecoin" },
  { pattern: "AVAX", href: "/coin/avax", title: "AVAX — Avalanche" },
  { pattern: "DOT", href: "/coin/dot", title: "DOT — Polkadot" },
  { pattern: "LINK", href: "/coin/link", title: "LINK — Chainlink" },
  { pattern: "SHIB", href: "/coin/shib", title: "SHIB — Shiba Inu" },
  { pattern: "TON", href: "/coin/ton", title: "TON — Toncoin" },
  { pattern: "DeFi", href: "/tags/defi", title: "DeFi — 去中心化金融" },
  { pattern: "NFT", href: "/tags/nft", title: "NFT — 非同质化代币" },
  { pattern: "Layer 2", href: "/tags/layer2", title: "Layer 2 — 区块链扩容方案" },
  { pattern: "恐惧贪婪指数", href: "/fear-greed", title: "加密货币恐惧贪婪指数" },
  { pattern: "Fear & Greed", href: "/fear-greed", title: "Crypto Fear & Greed Index" },
  { pattern: "Gas费", href: "/tools/gas", title: "Gas费 — 区块链交易手续费" },
  { pattern: "Gas Fee", href: "/tools/gas", title: "Gas Fee — Blockchain transaction fee" },
  { pattern: "TVL", href: "/tools/defi", title: "TVL — Total Value Locked" },
  { pattern: "USDT", href: "/coin/usdt", title: "USDT — Tether 稳定币" },
  { pattern: "USDC", href: "/coin/usdc", title: "USDC — USD Coin 稳定币" },
  { pattern: "Binance", href: "/go/binance", title: "Binance — 全球最大加密货币交易所" },
  { pattern: "币安", href: "/go/binance", title: "币安 Binance — 全球最大加密货币交易所" },
  { pattern: "OKX", href: "/go/okx", title: "OKX — 知名加密货币交易所" },
  { pattern: "Bybit", href: "/go/bybit", title: "Bybit — 加密货币衍生品交易所" },
];

// Tags that should NOT be linked inside
const SKIP_TAGS = new Set(["a", "h1", "h2", "h3", "h4", "h5", "h6", "code", "pre", "script", "style"]);

/**
 * Inject glossary term links into article body HTML.
 * Only the FIRST occurrence of each term is linked.
 * Safe: skips content inside headings, links, code, scripts.
 *
 * @param html - Article body HTML string
 * @param basePath - Optional language prefix (e.g. "/en", "/zh-tw")
 * @param maxLinks - Max total glossary links to insert (default 15)
 * @returns Modified HTML with glossary links
 */
export function injectGlossaryLinks(
  html: string,
  basePath = "",
  maxLinks = 15,
): string {
  if (!html || html.length < 50) return html;

  let linkCount = 0;
  const linkedTerms = new Set<string>();

  // Process each term — longer patterns first to avoid partial matches
  const sortedTerms = [...GLOSSARY_TERMS].sort(
    (a, b) => b.pattern.length - a.pattern.length,
  );

  let result = html;

  for (const term of sortedTerms) {
    if (linkCount >= maxLinks) break;
    if (linkedTerms.has(term.href)) continue; // one link per target URL

    // Build regex: word-boundary aware for Latin, simple match for CJK
    const isCJK = /[\u4e00-\u9fff]/.test(term.pattern);
    const escaped = term.pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = isCJK
      ? new RegExp(escaped, "g")
      : new RegExp(`\\b${escaped}\\b`, "g");

    // Walk through HTML, only replace in text nodes outside skip tags
    let replaced = false;
    result = replaceInTextNodes(result, re, (match) => {
      if (replaced || linkCount >= maxLinks) return match;
      replaced = true;
      linkCount++;
      linkedTerms.add(term.href);
      const href = basePath ? `${basePath}${term.href}` : term.href;
      return `<a href="${href}" title="${escAttr(term.title)}" class="glossary-link">${match}</a>`;
    });
  }

  return result;
}

/**
 * Replace regex matches only in text nodes (outside HTML tags and skip-tag content).
 * This is a lightweight approach that avoids full DOM parsing.
 */
function replaceInTextNodes(
  html: string,
  regex: RegExp,
  replacer: (match: string) => string,
): string {
  // Split HTML into tag tokens and text tokens
  const parts: string[] = [];
  let lastIndex = 0;
  const tagRe = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
  let m: RegExpExecArray | null;

  // Track nesting of skip tags
  const skipStack: string[] = [];

  while ((m = tagRe.exec(html)) !== null) {
    // Text before this tag
    if (m.index > lastIndex) {
      const text = html.slice(lastIndex, m.index);
      if (skipStack.length === 0) {
        parts.push(text.replace(regex, replacer));
      } else {
        parts.push(text);
      }
    }

    const fullTag = m[0];
    const tagName = m[1].toLowerCase();
    const isClosing = fullTag.startsWith("</");

    if (SKIP_TAGS.has(tagName)) {
      if (isClosing) {
        if (skipStack.length > 0 && skipStack[skipStack.length - 1] === tagName) {
          skipStack.pop();
        }
      } else if (!fullTag.endsWith("/>")) {
        skipStack.push(tagName);
      }
    }

    parts.push(fullTag);
    lastIndex = tagRe.lastIndex;
  }

  // Remaining text after last tag
  if (lastIndex < html.length) {
    const text = html.slice(lastIndex);
    if (skipStack.length === 0) {
      parts.push(text.replace(regex, replacer));
    } else {
      parts.push(text);
    }
  }

  return parts.join("");
}

function escAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
