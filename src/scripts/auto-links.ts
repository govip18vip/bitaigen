// src/scripts/auto-links.ts
// Auto internal linking — convert keyword mentions in articles to site links
// Runs client-side after page load, max 3 links per keyword per article

const LINK_MAP: Record<string, string> = {
  "比特币": "/coin/btc",
  "Bitcoin": "/coin/btc",
  "BTC": "/coin/btc",
  "以太坊": "/coin/eth",
  "Ethereum": "/coin/eth",
  "ETH": "/coin/eth",
  "Solana": "/coin/sol",
  "SOL": "/coin/sol",
  "币安": "/go/binance",
  "Binance": "/go/binance",
  "OKX": "/go/okx",
  "狗狗币": "/coin/doge",
  "Dogecoin": "/coin/doge",
  "DOGE": "/coin/doge",
  "瑞波币": "/coin/xrp",
  "XRP": "/coin/xrp",
  "卡尔达诺": "/coin/ada",
  "Cardano": "/coin/ada",
  "DeFi": "/tags/defi",
  "NFT": "/tags/nft",
  "钱包": "/tags/wallet",
  "MetaMask": "/posts/zh-cn/metamask-tutorial-zh-cn",
  "USDT": "/posts/zh-cn/how-to-buy-usdt-p2p-zh-cn",
};

const MAX_PER_KEYWORD = 2;

function initAutoLinks() {
  const article = document.getElementById("article");
  if (!article) return;

  const currentPath = window.location.pathname;
  const linked = new Map<string, number>();

  // Walk text nodes in article paragraphs only (not headings, links, code)
  const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName.toLowerCase();
      // Skip headings, links, code, buttons, scripts
      if (["a", "h1", "h2", "h3", "h4", "code", "pre", "button", "script", "style"].includes(tag))
        return NodeFilter.FILTER_REJECT;
      if (parent.closest("a, code, pre, h1, h2, h3, h4"))
        return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) textNodes.push(node as Text);

  for (const textNode of textNodes) {
    const text = textNode.textContent ?? "";

    for (const [keyword, href] of Object.entries(LINK_MAP)) {
      // Don't link to current page
      if (currentPath.includes(href.replace(/^\//, ""))) continue;

      const count = linked.get(keyword) ?? 0;
      if (count >= MAX_PER_KEYWORD) continue;

      const idx = text.indexOf(keyword);
      if (idx === -1) continue;

      // Split text node and insert link
      const before = text.substring(0, idx);
      const match = text.substring(idx, idx + keyword.length);
      const after = text.substring(idx + keyword.length);

      const beforeNode = document.createTextNode(before);
      const link = document.createElement("a");
      link.href = href;
      link.textContent = match;
      link.style.cssText = "color:var(--accent);text-decoration:underline;text-decoration-style:dotted;text-underline-offset:2px;";
      if (href.startsWith("/go/")) link.setAttribute("rel", "sponsored");
      const afterNode = document.createTextNode(after);

      const parent = textNode.parentNode!;
      parent.insertBefore(beforeNode, textNode);
      parent.insertBefore(link, textNode);
      parent.insertBefore(afterNode, textNode);
      parent.removeChild(textNode);

      linked.set(keyword, count + 1);
      break; // One replacement per text node, then move on
    }
  }
}

initAutoLinks();
document.addEventListener("astro:after-swap", initAutoLinks);
