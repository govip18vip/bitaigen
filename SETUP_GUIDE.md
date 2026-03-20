# 多语言系统配置指南

## 一、文件替换位置

| 输出文件 | 替换到项目的位置 |
|---|---|
| `pages/index.astro` | `src/pages/index.astro` |
| `pages/[lang]/index.astro` | `src/pages/[lang]/index.astro` *(新建目录)* |
| `pages/[lang]/posts/[...page].astro` | `src/pages/[lang]/posts/[...page].astro` *(新建目录)* |
| `pages/posts/[...page].astro` | `src/pages/posts/[...page].astro` |
| `LeftSidebar.astro` | `src/components/LeftSidebar.astro` |
| `PostDetails.astro` | `src/layouts/PostDetails.astro` |
| `detect.ts` | `src/i18n/detect.ts` |
| `homePage.ts` | `src/utils/homePage.ts` *(新建文件)* |
| `ui-helpers.ts` | 把里面的函数**合并替换**到 `src/i18n/ui.ts` 底部 |

---

## 二、在 src/i18n/ui.ts 中需要修改的内容

在 `ui.ts` 文件**底部**，找到并替换以下函数（保留 LANGUAGES / UI / TAXONOMY 等常量不动）：

```ts
// 替换 getLang / hreflangLinks / buildAlternates / useTranslations
// 新增 LANG_PATH_MAP / LANG_TO_PATH / LANG_PATH_SEGMENTS / stripLangPrefix
```

把 `ui-helpers.ts` 中的所有内容粘贴到 `ui.ts` 最底部，删掉旧的同名函数即可。

---

## 三、文章目录结构

把文章按语言放在对应子目录：

```
src/data/blog/
│
├── zh-cn/                 ← 简体中文文章（默认语言）
│   ├── bitcoin-guide.md
│   ├── binance-tutorial.md
│   └── ...
│
├── zh-tw/                 ← 繁體中文文章
│   ├── bitcoin-guide.md
│   └── ...
│
├── en/                    ← English articles
│   ├── bitcoin-guide.md
│   └── ...
│
├── es/                    ← Artículos en español
│   └── bitcoin-guide.md
│
├── pt/                    ← Artigos em português
│   └── bitcoin-guide.md
│
└── _releases/             ← (下划线开头，不参与 glob 加载)
    └── astro-paper-5.md
```

### 文章 frontmatter 示例

**`src/data/blog/zh-cn/bitcoin-guide.md`**
```yaml
---
author: 加密研究员
pubDatetime: 2025-01-15T08:00:00Z
title: 比特币完全入门指南
slug: bitcoin-btc-complete-guide
lang: zh-CN                          # ← 必填
translationKey: bitcoin-complete-guide  # ← 用于关联多语言版本
featured: true
tags:
  - btc
  - beginner
description: 比特币是什么？本文从零出发...
---
```

**`src/data/blog/en/bitcoin-guide.md`**
```yaml
---
author: Crypto Researcher
pubDatetime: 2025-01-15T08:00:00Z
title: Bitcoin Complete Beginner's Guide
slug: bitcoin-btc-complete-guide-en
lang: en                             # ← 必填
translationKey: bitcoin-complete-guide  # ← 与中文版相同的 key
featured: false
tags:
  - btc
  - beginner
description: What is Bitcoin? This guide covers...
---
```

---

## 四、生成的 URL 结构

| 页面 | URL |
|---|---|
| 简体中文首页 | `/` |
| English 首页 | `/en/` |
| 繁體中文首页 | `/zh-tw/` |
| 西班牙语首页 | `/es/` |
| 葡萄牙语首页 | `/pt/` |
| 简体中文文章列表 | `/posts/` |
| English 文章列表 | `/en/posts/` |
| 简体中文文章 | `/posts/zh-cn/bitcoin-guide/` |
| English 文章 | `/posts/en/bitcoin-guide-en/` |

---

## 五、语言切换工作原理

1. **点击语言按钮** → 导航到对应语言的首页（如 `/en/`）
2. **服务端静态渲染** → 该页面只包含该语言的文章
3. **UI 文字** → 服务端用 `t()` 函数渲染，客户端 `detect.ts` 负责动态元素
4. **文章详情页** → 从 `post.data.lang` 读取语言，侧边栏自动高亮正确语言

---

## 六、现有文章迁移

把根目录下带 `lang: en` 等字段的文章移入对应子目录：

```bash
# 例如：
mv src/data/blog/bitcoin-guide-en.md    src/data/blog/en/bitcoin-guide.md
mv src/data/blog/bitcoin-guide-zh-cn.md src/data/blog/zh-cn/bitcoin-guide.md
mv src/data/blog/bitcoin-guide-zh-tw.md src/data/blog/zh-tw/bitcoin-guide.md
mv src/data/blog/bitcoin-guide-es.md    src/data/blog/es/bitcoin-guide.md
mv src/data/blog/bitcoin-guide-pt.md    src/data/blog/pt/bitcoin-guide.md
```

没有 `lang` 字段的文章（如 examples/）默认归属于简体中文（DEFAULT_LANG）。
