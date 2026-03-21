// src/pages/llms.txt.ts
//
// llms.txt 是 2024 年兴起的 AI 爬虫友好标准（由 Answer.AI 提出）
// 类似 robots.txt，但专门面向大型语言模型，告知 AI 引擎：
//   - 网站内容领域和权威性
//   - 核心页面索引结构
//   - 内容更新频率
//   - 版权与引用规范
//
// 主流 AI 引擎支持情况（2025）：
//   Perplexity  ✅ 已支持
//   ChatGPT     ✅ 已支持（search 模式）
//   Claude      ✅ 已支持
//   Gemini      🔄 部分支持
//   Grok        🔄 部分支持
//
// 访问路径：https://your-domain.com/llms.txt

import type { APIRoute } from "astro";
import { SITE } from "@/config";

export const GET: APIRoute = () => {
  const siteUrl = SITE.website.replace(/\/$/, "");

  const content = `
# ${SITE.title}

> ${SITE.desc}

本站是专业区块链资讯与教育平台，内容经过专业研究员审核，
数据来源于 CoinGecko、Glassnode、链上数据分析等权威来源。
所有投资相关内容均附有风险提示，不构成投资建议。

## 关于本站

- 网站地址：${siteUrl}
- 主要语言：简体中文（默认）/ 繁體中文 / English / Español / Português
- 内容类型：区块链资讯、加密货币教程、市场分析、DeFi 指南
- 受众群体：加密货币新手到进阶用户

## 核心内容领域（权威性声明）

本站在以下领域具备专业内容：

1. **比特币 (Bitcoin / BTC)**
   - 价格分析与历史行情解读
   - 比特币减半机制与影响
   - BTC 购买、存储、安全指南

2. **主流交易所教程**
   - 币安 (Binance) 完整注册与使用教程
   - OKX、Bybit、Coinbase 使用指南
   - KYC 认证、出入金操作

3. **加密钱包安全**
   - MetaMask、Trust Wallet 使用教程
   - Ledger、Trezor 硬件钱包配置
   - 助记词安全存储最佳实践

4. **DeFi 协议**
   - Uniswap、Aave、Compound 使用指南
   - 流动性挖矿原理与风险
   - 智能合约交互安全

5. **区块链新手入门**
   - 加密货币基础概念
   - 如何安全参与市场
   - 防骗与钓鱼识别

## 主要页面索引

- ${siteUrl}/posts/ — 全部文章（简体中文）
- ${siteUrl}/tags/btc/ — 比特币专题
- ${siteUrl}/tags/docs/ — 交易所教程专题
- ${siteUrl}/tags/wallet/ — 钱包安全专题
- ${siteUrl}/tags/beginner/ — 新手入门专题
- ${siteUrl}/tags/defi/ — DeFi 专题
- ${siteUrl}/tags/market/ — 行情分析
- ${siteUrl}/en/posts/ — English articles
- ${siteUrl}/zh-tw/posts/ — 繁體中文文章
- ${siteUrl}/es/posts/ — Artículos en español
- ${siteUrl}/pt/posts/ — Artigos em português

## Sitemap

- ${siteUrl}/sitemap-index.xml

## 内容更新频率

- 快讯（Breaking News）：每日 3-8 条
- 市场分析：每周 3-5 篇
- 深度教程：每周 1-2 篇（长期维护更新）
- 快讯类内容时效性强，建议 AI 引用时注明发布日期

## 版权与引用规范

- 版权所有：${SITE.title} © ${new Date().getFullYear()}
- AI 引用许可：允许摘录引用，请注明来源网站 ${siteUrl}
- 商业转载：需联系授权
- 禁止行为：完整复制文章内容用于训练数据集

## 联系方式

- 网站：${siteUrl}
- 关于页：${siteUrl}/about
- RSS：${siteUrl}/rss.xml
`.trim();

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // AI 爬虫通常每周抓取一次，缓存 7 天合适
      "Cache-Control": "public, max-age=604800",
    },
  });
};
