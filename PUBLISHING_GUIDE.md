# Bitaigen 内容发布 AI 操作手册

> **本文档专为 AI Agent 使用。** 详述如何为 bitaigen.com 生产并发布内容，包括调用哪些工具、写什么格式、遵守哪些规则。请完整阅读后再执行任何发布操作。

---

## 目录

1. [网站概览](#1-网站概览)
2. [双 CMS 架构](#2-双-cms-架构)
3. [内容类型总览](#3-内容类型总览)
4. [可用 AI 工具](#4-可用-ai-工具)
5. [标准发布流程](#5-标准发布流程)
6. [Sanity 发布格式详解](#6-sanity-发布格式详解)
7. [Ghost 发布格式详解](#7-ghost-发布格式详解)
8. [图片生成与上传](#8-图片生成与上传)
9. [SEO 必须满足的规则](#9-seo-必须满足的规则)
10. [多语言规则](#10-多语言规则)
11. [内容质量红线](#11-内容质量红线)
12. [完整示例：从搜索到发布](#12-完整示例从搜索到发布)
13. [错误处理与重试策略](#13-错误处理与重试策略)
14. [环境变量速查](#14-环境变量速查)

---

## 1. 网站概览

| 属性 | 值 |
|---|---|
| 域名 | `https://bitaigen.com/` |
| 定位 | 专业区块链/加密货币新闻资讯平台 |
| 默认语言 | `zh-CN`（简体中文） |
| 支持语言 | `zh-CN` / `zh-TW` / `en` / `es` / `pt` |
| 框架 | Astro 5 + Vercel ISR（5 分钟缓存） |
| Ghost 实例 | `https://474y.com`（内容源，对外隐藏） |
| Sanity 项目 | `jnjofxo7`，数据集 `production` |

**内容展示路径：**

```
快讯  → bitaigen.com/        （首页快讯流）
资讯  → bitaigen.com/posts/  （文章列表）
教程  → bitaigen.com/learn/  （教程专区）
归档  → bitaigen.com/archives/（Ghost文章，按语言slug路由）
```

---

## 2. 双 CMS 架构

```
┌─────────────────────────────────────────────────────────┐
│                  Bitaigen 内容架构                       │
│                                                          │
│  Sanity CMS (jnjofxo7)          Ghost CMS (474y.com)    │
│  ─────────────────────          ─────────────────────   │
│  • 快讯 (btgFlash)              • 教程 (tutorial)       │
│  • 资讯 (btgPost)               • 交易所对比             │
│  • 教程 (btgTutorial)           • 排名榜单               │
│  • 行情分析 (btgPost/market)    • 深度指南               │
│                                                          │
│  实时更新、结构化数据            长文、HTML格式           │
│  由流水线自动发布                发布后人工审阅            │
└─────────────────────────────────────────────────────────┘
```

**决策规则：用 Sanity 还是 Ghost？**

| 内容类型 | 目标 CMS | 理由 |
|---|---|---|
| 快讯（100-300字） | **Sanity** `btgFlash` | 需要实时展示，结构化，支持重要性标记 |
| 新闻资讯（400-1200字） | **Sanity** `btgPost` | 多语言翻译键、Portable Text、SEO字段完整 |
| 行情分析（800-2000字） | **Sanity** `btgPost` | articleType=`market`，追加风险提示 |
| 操作教程（1500字以上） | **Ghost** | HTML格式，步骤清晰，含推荐码块 |
| 交易所对比（2000字以上） | **Ghost** | content_type=`comparison`，含推荐码 |
| 币种排名榜单 | **Ghost** | content_type=`ranking`，含风险声明 |

---

## 3. 内容类型总览

### 3.1 快讯（Flash）

- **字数**：100–300 字（中文）/ 80–200 词（英文）
- **格式**：纯文本，一段话，不含标题和子标题
- **重要性**：`high` / `medium` / `low`
  - `high`：触发关键词包含 `突破/新高/崩盘/SEC/ETF/黑客/减半`
  - `medium`：默认
- **发布目标**：`SanityPublisher.publish_flash()`
- **自动追加**：无（快讯不加风险提示）

### 3.2 新闻资讯（News / Article）

- **字数**：600–1500 字
- **articleType**：`news`（时事）/ `article`（深度）/ `market`（行情）
- **结构（Markdown）**：
  ```markdown
  ## 导语（核心要点，2-3句）
  
  ## 正文小标题1
  段落内容...
  
  ## 正文小标题2
  段落内容...
  
  ## 常见问题（FAQ）
  **问：...**
  答：...
  
  ## 结语
  ```
- **自动追加**：`news/market/analysis` 类型自动在末尾加风险提示块
- **发布目标**：`SanityPublisher.publish_post()`

### 3.3 行情分析（Market Analysis）

- **字数**：800–2000 字
- **articleType**：`market`
- **必须包含**：当前价格、24h 涨跌幅、关键支撑位/阻力位、技术指标解读
- **禁止**：价格预测（"将涨至X"）、投资建议

### 3.4 操作教程（Tutorial）

- **字数**：1500–4000 字
- **结构（HTML for Ghost）**：
  ```html
  <!-- 推荐码块（自动注入） -->
  <h2>什么是 XXX？</h2>
  <p>...</p>
  <h2>步骤一：准备工作</h2>
  <ol>
    <li>...</li>
  </ol>
  <h2>步骤二：...</h2>
  <!-- 风险提示（如涉及交易） -->
  ```
- **发布目标**：`GhostPublisher.publish()`，`status="draft"` 默认（人工审阅后发布）
- **推荐码**：自动注入 Binance + OKX 推荐码块

### 3.5 交易所对比（Comparison）

- **字数**：2000–5000 字
- **必须包含**：对比表格、优缺点列表、适用人群推荐、推荐码
- **发布目标**：Ghost，`content_type="comparison"`

### 3.6 排名榜单（Ranking）

- **字数**：1500–3000 字
- **格式**：编号列表 + 每项详细介绍
- **发布目标**：Ghost，`content_type="ranking"`
- **自动追加**：风险提示 + 推荐码

---

## 4. 可用 AI 工具

### 4.1 LilysSearch — AI 网络搜索

**用途**：获取最新加密货币新闻、价格数据、项目动态

```python
from lilys_search import LilysSearch
from token_manager import TokenManager

searcher = LilysSearch(token_manager=TokenManager())

# 中文搜索
result = searcher.search("比特币ETF最新动态", language="cn")

# 英文搜索
result = searcher.search("Bitcoin ETF latest news", language="en")

# 结果字段
result.ai_summary      # AI综合分析（主要使用这个）
result.search_results  # Google原始结果列表
result.search_results[0].url     # 来源URL
result.search_results[0].title   # 文章标题
result.search_results[0].snippet # 摘要
```

**搜索策略建议：**

| 内容类型 | 搜索词构造 |
|---|---|
| 快讯 | `"{币种} {最新动态/价格}" site:coingecko.com OR site:coindesk.com` |
| 行情分析 | `"{币种} price analysis {本月} technical" 2026` |
| 教程 | `"如何注册 {交易所} 教程 {年份}"` |
| 对比 | `"{交易所A} vs {交易所B} 对比 手续费"` |

**注意**：Lilys 每次搜索消耗 Firebase JWT token，有频率限制。快讯流水线已内置重试（30s × 次数）。

### 4.2 BiyijiaAI — 多供应商 AI 写作

**供应商优先级（自动容错轮转）：**

```
1. biyijia.com     → gpt-oss-120b（主力，非流式）
2. internxt AI     → Internxt AI（备用1）
3. deepinfra       → NVIDIA-Nemotron-120B（推理型，流式）
4. lilys AI        → Gemini（备用3，非联网模式）
```

**核心接口：**

```python
from biyijia_ai import BiyijiaAI

ai = BiyijiaAI(max_tokens=4000, temperature=0.7)

# 1. 基础对话
resp = ai.chat("写一段关于比特币的分析", system_prompt="你是加密货币分析师")
print(resp.content)   # 生成内容
print(resp.provider)  # 实际使用的供应商

# 2. 素材改写（推荐用法）
resp = ai.rewrite(
    raw_content=search_result.ai_summary,
    topic="比特币减半",
    style="深度行情分析",   # 新闻资讯/深度行情分析/操作教程
    lang="zh-CN",
    min_words=800
)

# 3. 生成SEO元数据
meta = ai.generate_title_and_desc(article_content, lang="zh-CN")
# 返回: {"title": "...", "description": "...", "tags": [...], "slug_suggestion": "..."}

# 4. 质量评分（发布前检查）
score = ai.score_quality(article_content, topic="比特币")
# 返回: {"score": 85, "pass": True, "dimensions": {...}, "issues": [...]}
if not score["pass"]:
    # score < 60 丢弃，60-75 存草稿，75+ 发布
    pass

# 5. AI图片生成（需 Firebase JWT）
image_url = ai.generate_image("Bitcoin gold coin digital art, dark background, 4K")
# 返回: https://resource.lilys.ai/images/....png
```

**temperature 建议：**

| 内容类型 | temperature |
|---|---|
| 快讯（事实性） | 0.65–0.75 |
| 新闻资讯 | 0.70–0.80 |
| 行情分析 | 0.68–0.78 |
| 教程（步骤清晰） | 0.60–0.70 |
| 创意标题/描述 | 0.80–0.90 |

### 4.3 AI 图片生成 — Lilys Text-to-Image

```python
# 通过 BiyijiaAI 接口调用
ai = BiyijiaAI()
image_url = ai.generate_image(
    "Professional crypto news banner, Bitcoin symbol, dark blue gradient, "
    "financial chart elements, no text, 16:9 aspect ratio"
)
```

**图片 Prompt 最佳实践（英文）：**

```
{主题描述}, {风格关键词}, {颜色方案}, {技术规格}

示例：
- "Bitcoin halving concept art, golden coin, dark background, cinematic lighting, ultra HD"
- "Ethereum DeFi ecosystem, interconnected nodes, blue purple gradient, digital art"
- "Crypto exchange comparison infographic style, clean minimal, financial news"
- "Solana network visualization, purple teal colors, abstract tech, 4K"
```

**禁止的 Prompt 内容：**
- 包含真实人物面部
- 包含品牌 Logo（Binance/OKX 等）
- 包含文字（会造成乱码）
- 色情/暴力/政治敏感内容

---

## 5. 标准发布流程

### 流程总览

```
[选题] → [搜索] → [AI写作] → [质量评分] → [生成元数据] → [生成图片] → [发布CMS]
```

### 步骤详解

#### Step 1：选题
- 从 `topic_bank.py` 的 `get_random_topic()` 获取，或手动构造
- 必填字段：`keyword`（核心关键词）、`content_type`、`lang`、`tags`

#### Step 2：去重检查
```python
from core.dedup import DedupSystem
dedup = DedupSystem()
is_dup, reason = dedup.is_duplicate(topic.hash, topic.keyword, topic.coin, 
                                     content_type="news", lang="zh-CN")
if is_dup:
    # 跳过，换话题
    pass
```

#### Step 3：搜索素材
```python
searcher = LilysSearch()
result = searcher.search(topic.keyword, language="cn")
raw = result.ai_summary[:2000]  # 取前2000字作为素材
# 如果AI摘要为空，拼接搜索结果snippets
if not raw:
    raw = " ".join(r.snippet for r in result.search_results[:5])
```

#### Step 4：获取实时价格（行情类必做）
```python
import requests
resp = requests.get("https://api.coingecko.com/api/v3/simple/price",
    params={"ids": "bitcoin", "vs_currencies": "usd", "include_24hr_change": "true"},
    timeout=3)
data = resp.json().get("bitcoin", {})
price_ctx = f"当前价格 ${data['usd']:,.2f}，24h变动 {data['usd_24h_change']:+.1f}%"
```

#### Step 5：AI 写作
```python
ai = BiyijiaAI(temperature=0.72)
article = ai.rewrite(raw, topic=topic.keyword, style="新闻资讯", lang="zh-CN", min_words=600)
```

#### Step 6：质量评分
```python
score_result = ai.score_quality(article.content, topic=topic.keyword)
if score_result["score"] < 60:
    return  # 丢弃
draft = score_result["score"] < 75  # 60-75 存草稿
featured = score_result["score"] >= 90  # 90+ 设为精选
```

#### Step 7：生成元数据
```python
meta = ai.generate_title_and_desc(article.content, lang="zh-CN")
title = meta["title"]          # SEO标题，60字以内
description = meta["description"]  # 120-160字摘要
tags = meta["tags"]            # 3-5个标签
slug = meta["slug_suggestion"] # 英文URL slug
```

#### Step 8：生成封面图
```python
img_prompt = f"{topic.keyword} concept art, crypto, dark background, no text"
image_url = ai.generate_image(img_prompt)
```

#### Step 9：发布到 Sanity / Ghost

见下方各 CMS 详解章节。

#### Step 10：标记已发布
```python
dedup.mark_published(topic.hash, title, topic.coin, content_type="news", lang="zh-CN")
```

---

## 6. Sanity 发布格式详解

### 6.1 发布快讯

```python
from publishers.sanity_pub import SanityPublisher

pub = SanityPublisher()  # 需要 SANITY_WRITE_TOKEN

doc_id = pub.publish_flash(
    title="比特币突破10万美元关口，24小时资金净流入超50亿",  # 标题，具体、含数据
    content="2026年4月18日，比特币在亚洲交易时段...",        # 正文，100-300字
    lang="zh-CN",
    tags=["btc", "market", "news"],      # 最多5个，来自 VALID_TAGS
    importance="high",                   # high/medium/low
    source_url="https://coindesk.com/...",
    source_name="CoinDesk",
)
```

### 6.2 发布资讯/行情分析文章

```python
pub = SanityPublisher()

# 先上传封面图
asset_id = pub.upload_image(image_url)  # 返回 Sanity asset _id

doc_id = pub.publish_post(
    title="比特币减半倒计时：历史数据揭示价格规律",  # 60字以内
    body_markdown=article_content,                    # Markdown 正文（自动转 Portable Text）
    lang="zh-CN",
    article_type="news",     # news / article / market / howto / guide
    tags=["btc", "market", "analysis"],
    description="距离下次减半还有30天，历史上三次减半后比特币均...",  # 120-160字
    slug="bitcoin-halving-countdown-price-history",  # 英文 kebab-case
    pub_datetime="",          # 留空=当前时间，或 "2026-04-18T10:00:00Z"
    featured=True,            # 精选文章显示在首页
    draft=False,              # False=立即发布，True=存草稿
    source_url="",
    source_name="Bitaigen AI",
    translation_key="bitcoin-halving-2026",  # 同一文章多语言版本共享
    cover_image_asset_id=asset_id,
    author_name="Bitaigen 研究团队",
)
```

### 6.3 Markdown → Portable Text 转换规则

`markdown_to_portable_text()` 函数自动处理：

| Markdown | Portable Text style |
|---|---|
| `# 标题` 或 `## 标题` | `"h2"` |
| `### 标题` | `"h3"` |
| `#### 或更深` | `"h3"`（降级） |
| `> 引用` | `"blockquote"` |
| `- 列表` / `* 列表` | `listItem: "bullet"` |
| `1. 列表` | `listItem: "number"` |
| `**粗体**` | `marks: ["strong"]` |
| `` `代码` `` | `marks: ["code"]` |
| `[链接](url)` | `markDefs: [{_type:"link"}]` |
| `---` 分隔线 | 跳过（不输出块） |
| Markdown 表格 | 数据行转普通段落 |

**写正文 Markdown 的注意事项：**
- ✅ 用 `##` 和 `###` 作为小标题（`#` 也被转为 h2）
- ✅ 用 `- ` 或 `1. ` 写列表
- ✅ 用 `**关键词**` 加粗重要内容
- ✅ 用 `> 风险提示内容` 写块引用
- ❌ 不要用 `####` 以下标题（会降级为 h3）
- ❌ 不要写 HTML 标签（Sanity Portable Text 不支持）
- ❌ 表格会被转为普通文本，尽量改用列表

### 6.4 有效标签列表（VALID_TAGS）

```
btc, eth, defi, nft, market, exchange, wallet, beginner, web3,
regulation, mining, stablecoin, layer2, altcoin, binance, okx,
blockchain, crypto, security, sol, bnb, xrp, doge, usdt, trx,
tutorial, comparison, ranking, news, analysis, ai, ton, apt, sui,
near, render
```

---

## 7. Ghost 发布格式详解

### 7.1 发布教程/长文

```python
from publishers.ghost_pub import GhostPublisher, GhostPost

pub = GhostPublisher()  # 需要 GHOST_ADMIN_KEY

post = GhostPost(
    title="币安注册教程2026：手把手开户指南（附专属优惠码）",
    html=article_html,          # HTML格式正文（见下方规范）
    slug="binance-register-tutorial-2026",  # 英文 kebab-case，唯一
    lang="zh-CN",
    tags=["tutorial", "binance", "exchange", "beginner"],  # 最多8个
    meta_description="2026年最新币安注册教程，5分钟完成开户...",  # 120-160字
    feature_image="https://resource.lilys.ai/images/xxx.png",
    feature_image_alt="币安注册教程封面图",
    status="draft",             # 教程默认草稿，人工审阅后发布
    content_type="tutorial",    # tutorial/comparison/ranking/analysis
    add_affiliate=True,         # 自动注入推荐码块
    add_disclaimer=True,        # 仅 ranking/comparison/analysis 追加
)

url = pub.publish(post)
```

### 7.2 Ghost 文章 HTML 格式规范

```html
<!-- 正文 HTML，不包含推荐码和免责声明（由 _build_html 自动注入） -->

<h2>什么是币安？</h2>
<p>币安（Binance）是全球最大的加密货币交易所，日交易量超过...</p>

<h2>注册前的准备</h2>
<ul>
  <li>有效的邮箱地址或手机号码</li>
  <li>身份证件（用于 KYC 验证）</li>
  <li>稳定的网络连接</li>
</ul>

<h2>步骤一：访问官网</h2>
<p>打开浏览器，访问 <a href="https://www.binance.com" target="_blank">币安官网</a>...</p>

<h2>常见问题（FAQ）</h2>
<details>
  <summary>注册需要多久？</summary>
  <p>基础注册约 5 分钟，KYC 验证需要 1-3 个工作日。</p>
</details>
```

**Ghost HTML 最佳实践：**
- ✅ 使用语义化标签：`<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`, `<table>`
- ✅ 图片使用 Ghost CDN URL（通过 `GhostMedia.upload_image()` 上传后得到）
- ✅ 外链加 `target="_blank" rel="noopener"`
- ✅ 教程步骤用 `<ol>` 有序列表
- ❌ 不要内联 CSS `style="..."` 超过基础样式
- ❌ 不要用 `<script>` 标签
- ❌ 不要硬编码推荐码（由 `_build_html` 从环境变量读取）

### 7.3 自动注入内容说明

调用 `GhostPublisher.publish()` 时，`_build_html()` 会自动在正文前后注入：

| 注入位置 | 内容 | 条件 |
|---|---|---|
| 正文**前** | 推荐码块（Binance + OKX） | `add_affiliate=True` 且 `content_type in (tutorial, comparison, ranking)` |
| 正文**后** | 风险提示 blockquote | `add_disclaimer=True` 且 `content_type in (ranking, comparison, analysis)` |
| 最末尾 | Telegram 群邀请链接 | `lang in (zh-CN, en)` 时自动追加 |

### 7.4 上传图片到 Ghost CDN

```python
from publishers.ghost_media import GhostMedia

media = GhostMedia()
ghost_cdn_url = media.upload_image("/tmp/cover.jpg", purpose="image")
# 返回: https://474y.com/content/images/2026/04/cover.jpg
```

---

## 8. 图片生成与上传

### 8.1 完整图片工作流

```python
from biyijia_ai import BiyijiaAI
from publishers.sanity_pub import SanityPublisher
from publishers.ghost_media import GhostMedia
import requests, tempfile, os

ai = BiyijiaAI()

# ── Sanity 文章封面 ────────────────────────────────────────
# 1. AI 生成图片 URL
img_url = ai.generate_image(
    "Bitcoin price analysis chart concept, dark background, golden coin, "
    "financial data visualization, professional, no text"
)

# 2. 直接从 URL 上传到 Sanity
sanity_pub = SanityPublisher()
asset_id = sanity_pub.upload_image_from_url(img_url, filename="btc-analysis-cover.jpg")

# 3. 发布文章时传入 asset_id
sanity_pub.publish_post(..., cover_image_asset_id=asset_id)

# ── Ghost 文章封面 ─────────────────────────────────────────
# 1. 下载图片到临时文件
with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as f:
    resp = requests.get(img_url, timeout=20)
    f.write(resp.content)
    tmp_path = f.name

# 2. 上传到 Ghost CDN
ghost_media = GhostMedia()
cdn_url = ghost_media.upload_image(tmp_path)
os.unlink(tmp_path)

# 3. 发布 Ghost 文章时传入 feature_image
```

### 8.2 图片 Prompt 模板库

根据文章类型选择合适的 prompt 风格：

**快讯类（crypto news）**
```
Breaking crypto news concept, {币种名} symbol, dark navy background,
glowing effects, professional news style, no text, 16:9
```

**行情分析类**
```
{币种名} price chart visualization, candlestick pattern, dark theme,
blue green accent colors, financial analytics, abstract, no text
```

**教程类（how-to）**
```
Step by step tutorial concept, {主题} interface mockup,
clean minimal design, blue white palette, instructional, no faces
```

**交易所对比**
```
Cryptocurrency exchange comparison concept, two balance scales,
digital coins, neutral background, business style, no logos, no text
```

**排名榜单**
```
Top cryptocurrency ranking concept, gold silver bronze podium,
digital coins, dark gradient background, clean modern style
```

---

## 9. SEO 必须满足的规则

### 9.1 标题规则

| 字段 | 要求 |
|---|---|
| Ghost `title` | ≤60字/字符，含核心关键词，结尾可带年份 |
| Sanity `title` | ≤60字，含核心关键词 |
| `meta_description` / `description` | 120–160字，首句包含关键词，结尾有行动词 |

### 9.2 Slug 规则

```python
# Sanity 资讯（中文内容）
slug = f"cn-{uuid.uuid4().hex[:12]}"      # zh-CN 前缀
slug = f"tw-{uuid.uuid4().hex[:12]}"      # zh-TW 前缀

# Sanity 资讯（英文/西班牙/葡萄牙）
slug = f"en-bitcoin-halving-2026-{uuid.uuid4().hex[:6]}"

# Ghost（所有语言）
slug = "bitcoin-register-tutorial-2026"   # 纯英文 kebab-case，不加随机后缀
```

**Ghost Slug 不能重复！** 同一话题不同年份要在末尾加年份区分。

### 9.3 多语言翻译键（translationKey）

同一话题的多语言版本必须共享 `translationKey`，格式：

```python
translation_key = f"{topic.coin or 'crypto'}-{topic_hash[:8]}"
# 示例：btc-a3f7b2c1, eth-analysis-d4e8a1b2
```

### 9.4 标签数量

- Sanity：1–5 个，全部来自 `VALID_TAGS`
- Ghost：1–8 个，可以是自定义标签但首个必须是内容类型（`tutorial/news/analysis`）

### 9.5 内链注入

`news_pipeline.py` 会自动在文章正文中注入内链关键词，无需手动添加：

```python
# 自动将 "比特币" 链接到 /posts/tags/btc
# 自动将 "币安" 链接到 /posts/tags/binance
```

---

## 10. 多语言规则

### 10.1 语言代码对照

| 语言 | Lang 代码 | Lilys search language | URL 前缀 |
|---|---|---|---|
| 简体中文 | `zh-CN` | `"cn"` | `/`（根路径） |
| 繁体中文 | `zh-TW` | `"cn"` | `/zh-tw/` |
| 英文 | `en` | `"en"` | `/en/` |
| 西班牙文 | `es` | `"en"` | `/es/` |
| 葡萄牙文 | `pt` | `"en"` | `/pt/` |

### 10.2 Ghost 语言标签

Ghost 通过内部标签区分语言，发布时在 `tags` 中加入：

| 语言 | Ghost 内部标签 |
|---|---|
| `zh-CN` | `#zh` |
| `zh-TW` | `#zh-tw` |
| `en` | `#en` |
| `es` | `#es` |
| `pt` | `#pt` |

```python
# Ghost 发布示例（繁体中文）
post = GhostPost(
    ...
    tags=["tutorial", "binance", "#zh-tw"],  # 加语言内部标签
    lang="zh-TW",
)
```

### 10.3 同一话题多语言发布顺序

1. 先发布 `zh-CN`（主语言），获取 `doc_id` 和 `translationKey`
2. 同一批次按 `zh-TW` → `en` → `es` → `pt` 顺序发布
3. 所有版本使用**相同的** `translationKey`，前端自动显示语言切换按钮

### 10.4 各语言写作规范

| 语言 | 注意事项 |
|---|---|
| zh-CN | 使用大陆用词（比特币/交易所/钱包），标点用全角 |
| zh-TW | 使用台湾用词（比特幣/交易所/錢包），繁体字 |
| en | 专业术语首字母大写（Bitcoin/Ethereum），使用 AP 新闻风格 |
| es | 货币用 "cripto" 而非 "crypto"，西班牙拉丁美洲通用用词 |
| pt | 使用葡萄牙/巴西通用用词，注意 `cripto` 拼写 |

---

## 11. 内容质量红线

### 11.1 绝对禁止（会被过滤器拦截）

```python
BAD_WORDS = [
    # 中文
    "一定涨", "稳赚", "保证盈利", "必涨", "建议买入", "强烈推荐买",
    "稳定收益", "零风险", "无风险套利",
    # 英文
    "will definitely", "guaranteed profit", "guaranteed returns",
    "risk-free", "100% profit", "sure thing",
]
```

### 11.2 内容必须满足

- ✅ **时效性**：资讯类必须提及具体日期或时间段
- ✅ **数据支撑**：行情类必须包含至少一个具体数字（价格/涨跌幅/交易量）
- ✅ **原创度**：不能超过 80% 与已发布内容相似（SequenceMatcher 检测）
- ✅ **字数达标**：快讯 80-300，资讯 600+，教程 1500+
- ✅ **结构完整**：有导语/小标题/结尾，教程必须有步骤列表

### 11.3 质量分级（news_pipeline 三级漏斗）

| 分级 | 分数 | 处理 |
|---|---|---|
| S 级 | ≥90 | 自动发布 + `featured=True` + 提交 IndexNow |
| A 级 | 75–89 | 自动发布 |
| B 级 | 60–74 | 存草稿（`draft=True`），待人工审阅 |
| C 级 | <60 | 丢弃，重新生成 |

### 11.4 风险提示规范

风险提示由系统自动追加，**不要在正文中手动写**。追加规则：

- Sanity `news/market/analysis` 类型：正文末尾自动加 `> ⚠️ 风险提示：...`
- Ghost `ranking/comparison/analysis` 类型：末尾自动加 `<blockquote>` 风险声明

---

## 12. 完整示例：从搜索到发布

### 示例：发布一篇中文比特币行情分析到 Sanity

```python
import sys, os
sys.path.insert(0, "pipeline/")

from core.dedup import DedupSystem
from core.token_manager import TokenManager
from lilys_search import LilysSearch
from biyijia_ai import BiyijiaAI
from publishers.sanity_pub import SanityPublisher
import requests, uuid

# ── 1. 初始化 ─────────────────────────────────────────────
dedup = DedupSystem()
token_mgr = TokenManager()
ai = BiyijiaAI(max_tokens=3000, temperature=0.72)
pub = SanityPublisher()

# ── 2. 话题与去重 ─────────────────────────────────────────
topic_kw = "比特币近期行情分析"
lang = "zh-CN"
topic_hash = __import__("hashlib").md5(f"{topic_kw}:{lang}".encode()).hexdigest()[:12]

is_dup, reason = dedup.is_duplicate(topic_hash, topic_kw, "btc", "analysis", lang)
if is_dup:
    print(f"跳过：{reason}")
    exit()

# ── 3. 搜索素材 ───────────────────────────────────────────
searcher = LilysSearch(token_manager=token_mgr)
search_result = searcher.search(topic_kw, language="cn")
raw = search_result.ai_summary[:2000] or " ".join(
    r.snippet for r in search_result.search_results[:5]
)

# ── 4. 获取实时 BTC 价格 ──────────────────────────────────
try:
    resp = requests.get("https://api.coingecko.com/api/v3/simple/price",
        params={"ids": "bitcoin", "vs_currencies": "usd", "include_24hr_change": "true"},
        timeout=3)
    d = resp.json().get("bitcoin", {})
    price_ctx = f"当前价格 ${d['usd']:,.2f}，24h变动 {d['usd_24h_change']:+.1f}%"
except:
    price_ctx = ""

# ── 5. AI 写作 ────────────────────────────────────────────
prompt = f"""今天是{__import__('datetime').datetime.now().strftime('%Y年%m月%d日')}。
根据以下搜索素材，写一篇比特币行情分析文章。
{f'实时行情：{price_ctx}' if price_ctx else ''}

要求：
- 800-1500字，简体中文
- 结构：导语 → 技术面分析 → 基本面分析 → 关键位 → FAQ → 结语
- 包含具体数据（价格/涨跌幅/支撑位/阻力位）
- 禁止投资建议
- 使用 ## 作为小标题

素材：{raw}

直接输出文章正文（Markdown格式）："""

article_resp = ai.chat(prompt, system_prompt="你是专业加密货币分析师，只输出文章正文。")
article = article_resp.content

# ── 6. 质量评分 ───────────────────────────────────────────
score = ai.score_quality(article, topic=topic_kw)
print(f"质量分：{score['score']}，通过：{score['pass']}")
if score["score"] < 60:
    print("质量不达标，丢弃")
    exit()
draft = score["score"] < 75

# ── 7. 生成元数据 ─────────────────────────────────────────
meta = ai.generate_title_and_desc(article, lang=lang)
title = meta["title"] or topic_kw
description = meta["description"] or article[:150]
tags = [t for t in meta["tags"] if t in {
    "btc", "market", "analysis", "news", "crypto", "blockchain"
}][:5]
slug = f"cn-{uuid.uuid4().hex[:12]}"

# ── 8. 生成封面图 ─────────────────────────────────────────
try:
    img_url = ai.generate_image(
        "Bitcoin market analysis concept, golden BTC symbol, "
        "dark navy background, price chart, no text, 16:9"
    )
    asset_id = pub.upload_image_from_url(img_url)
except Exception as e:
    print(f"图片生成失败（跳过）：{e}")
    asset_id = ""

# ── 9. 发布到 Sanity ──────────────────────────────────────
doc_id = pub.publish_post(
    title=title,
    body_markdown=article,
    lang=lang,
    article_type="market",
    tags=tags or ["btc", "market", "analysis"],
    description=description,
    slug=slug,
    featured=(score["score"] >= 90),
    draft=draft,
    source_name="Bitaigen AI",
    translation_key=f"btc-analysis-{topic_hash[:8]}",
    cover_image_asset_id=asset_id,
    author_name="Bitaigen 研究团队",
)

# ── 10. 标记已发布 ────────────────────────────────────────
if doc_id:
    dedup.mark_published(topic_hash, title, "btc", "analysis", lang)
    print(f"发布成功：{title}\nSanity _id：{doc_id}")
```

---

## 13. 错误处理与重试策略

### 13.1 LilysSearch 失败

```python
# 已内置3次重试，间隔 30s/60s/90s
# 如果全部失败，降级使用 search_results[].snippet 拼接
try:
    result = searcher.search(query, language="cn")
    raw = result.ai_summary
except Exception as e:
    # 降级：跳过此次，换话题
    logger.warning(f"搜索失败，跳过：{e}")
    return {"ok": False, "reason": str(e)}
```

### 13.2 BiyijiaAI 全供应商失败

```python
try:
    resp = ai.chat(prompt)
except RuntimeError as e:
    # 所有4个供应商都失败
    # 等待30分钟，不记录为失败（网络问题，非内容问题）
    time.sleep(1800)
    return {"ok": False, "reason": "AI全部失败"}
```

### 13.3 Sanity 发布失败

```python
doc_id = pub.publish_post(...)
if not doc_id:
    # publish_post 内部已打印错误
    # 不标记去重（下次可以重试）
    logger.error("Sanity发布失败")
```

### 13.4 图片上传失败（不阻断发布）

图片失败**不应该**阻断文章发布。`upload_image_from_url` 失败返回 `None`，
`publish_post` 会检查 `cover_image_asset_id` 是否为空，为空则不设置封面图。

---

## 14. 环境变量速查

```bash
# ── Sanity ──────────────────────────────────────────────
PUBLIC_SANITY_PROJECT_ID=jnjofxo7
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2025-04-07
SANITY_READ_TOKEN=sk...         # 前端 SSR 读取用
SANITY_WRITE_TOKEN=sk...        # Pipeline 写入用（高权限，勿泄露）

# ── Ghost ────────────────────────────────────────────────
GHOST_URL=https://474y.com
GHOST_ADMIN_KEY=xxxx:yyyy       # id:secret 格式

# ── AI 工具 ──────────────────────────────────────────────
LILYS_FIREBASE_API_KEY=...      # Firebase API Key（获取JWT用）
LILYS_REFRESH_TOKEN=...         # Firebase Refresh Token

# ── 联盟推广 ─────────────────────────────────────────────
BINANCE_REFERRAL_CODE=B2345
OKX_REFERRAL_CODE=B2345

# ── 其他 ─────────────────────────────────────────────────
PUBLIC_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_...
```

---

## 快速参考卡

```
发布快讯  → SanityPublisher.publish_flash()    字数: 100-300
发布资讯  → SanityPublisher.publish_post()     字数: 600-1500
          articleType: news/article/market
发布教程  → GhostPublisher.publish()           字数: 1500+
          content_type: tutorial/comparison/ranking
          status: "draft"（人工审阅）

搜索     → LilysSearch.search(query, language)
AI写作   → BiyijiaAI.chat/rewrite/generate_title_and_desc
质量分   → BiyijiaAI.score_quality()  ≥75 发布 / 60-74 草稿 / <60 丢弃
图片     → BiyijiaAI.generate_image() → upload_image_from_url()

禁止     → 投资建议/价格预测/无数据支撑/重复内容
```

---

*最后更新：2026-04-19 | 版本：v1.0*
