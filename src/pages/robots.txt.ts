// src/pages/robots.txt.ts
import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /
Crawl-delay: 1

Sitemap: ${sitemapURL.href}

# ── 传统搜索引擎 ──────────────────────────────────────────
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /
Crawl-delay: 1

# ── AI 搜索引擎爬虫（明确许可，提升 GEO 被引用率）────────
# OpenAI / ChatGPT
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

# Anthropic / Claude
User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

# Google AI (Gemini / SGE)
User-agent: Google-Extended
Allow: /

User-agent: Googlebot-Extended
Allow: /

# Apple Intelligence
User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

# Meta AI
User-agent: FacebookBot
Allow: /

# Cohere
User-agent: cohere-ai
Allow: /

# Diffbot（AI 结构化数据）
User-agent: Diffbot
Allow: /

# Common Crawl（LLM 训练数据来源之一）
User-agent: CCBot
Allow: /

# ── 明确禁止的恶意爬虫 ───────────────────────────────────
User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

# ── 禁止所有爬虫访问的路径 ───────────────────────────────
User-agent: *
Disallow: /api/
Disallow: /_astro/
Disallow: /404
`.trim();

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // 缓存 1 天，避免频繁重新抓取
      "Cache-Control": "public, max-age=86400",
    },
  });
};
