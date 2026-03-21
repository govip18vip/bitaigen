// astro.config.ts
import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";

export default defineConfig({
  site: SITE.website,

  integrations: [
    sitemap({
      // 过滤不需要收录的页面
      filter: page =>
        SITE.showArchives || !page.endsWith("/archives"),

      // ✅ 多语言 hreflang 配置
      // key 必须与 URL 路径前缀一致：
      //   默认语言（zh-CN）→ 无前缀，对应 "zh-CN"
      //   英文 → /en/...，对应 "en"
      //   繁中 → /zh-tw/...，对应 "zh-TW"（注意大小写）
      i18n: {
        defaultLocale: "zh-CN",
        locales: {
          "zh-CN": "zh-CN",   // /posts/... （默认，无前缀）
          "zh-tw": "zh-TW",   // /zh-tw/...
          "en":    "en",      // /en/...
          "es":    "es",      // /es/...
          "pt":    "pt-BR",   // /pt/...
        },
      },

      // ✅ 自定义 sitemap 条目：加 changefreq / priority / lastmod
      serialize(item) {
        const url = item.url;

        // 首页优先级最高
        const isHome    = url === SITE.website || url === SITE.website + "/";
        // 文章页
        const isPost    = url.includes("/posts/");
        // 标签聚合页
        const isTag     = url.includes("/tags/");
        // 分类 / 归档页
        const isArchive = url.includes("/archives");

        const changefreq = isHome
          ? "daily"
          : isPost
          ? "monthly"
          : isTag
          ? "weekly"
          : "monthly";

        const priority = isHome
          ? 1.0
          : isPost
          ? 0.8
          : isTag
          ? 0.6
          : 0.5;

        return {
          ...item,
          changefreq,
          priority,
          // lastmod 写今天的日期（生产环境可换成文章的 modDatetime）
          lastmod: new Date().toISOString().split("T")[0],
        };
      },
    }),
  ],

  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },

  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },

  image: {
    responsiveStyles: true,
    layout: "constrained",
  },

  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },

  experimental: {
    preserveScriptOrder: true,
    fonts: [
      {
        name: "Google Sans Code",
        cssVariable: "--font-google-sans-code",
        provider: fontProviders.google(),
        fallbacks: ["monospace"],
        weights: [300, 400, 500, 600, 700],
        styles: ["normal", "italic"],
      },
    ],
  },
});
