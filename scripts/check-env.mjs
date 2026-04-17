#!/usr/bin/env node
/**
 * Bitaigen — 构建前环境变量校验
 * ──────────────────────────────────────
 * 作用：
 *   1. 检查 "必需" 变量是否缺失（缺失就 warn，不阻塞 CI，因为预览部署允许不配）
 *   2. 检查是否把敏感变量误标成 PUBLIC_ 前缀（会把密钥打包进客户端）
 *   3. 打印摘要，便于在 Vercel/CI 日志中核对
 */

const REQUIRED = [
  // 对 SEO 最基本的变量
  "PUBLIC_GOOGLE_SITE_VERIFICATION",
];

const RECOMMENDED = [
  "PUBLIC_GA_ID",
  "PUBLIC_SANITY_PROJECT_ID",
  "PUBLIC_SANITY_DATASET",
  "SANITY_READ_TOKEN",
  "RESEND_API_KEY",
  "RESEND_AUDIENCE_ID",
  "RESEND_FROM_EMAIL",
];

// 绝不能以 PUBLIC_ 前缀暴露的变量名片段
const SECRET_PATTERNS = [
  "SECRET",
  "TOKEN",
  "PASSWORD",
  "API_KEY",
  "WRITE",
  "ADMIN",
];

const missing = REQUIRED.filter(k => !process.env[k]);
const missingRecommended = RECOMMENDED.filter(k => !process.env[k]);

const leaked = Object.keys(process.env)
  .filter(k => k.startsWith("PUBLIC_"))
  .filter(k => SECRET_PATTERNS.some(p => k.toUpperCase().includes(p)));

const log = (icon, msg) => console.log(`${icon}  ${msg}`);

console.log("\n──  Bitaigen env check  ──");

if (leaked.length) {
  log("🛑", `敏感变量被 PUBLIC_ 前缀暴露：${leaked.join(", ")}`);
  log("  ", `  →  这些值会被打包进浏览器 JS。请立刻去掉 PUBLIC_ 前缀并在对应平台轮换。`);
  process.exitCode = 1; // 硬失败
}

if (missing.length) {
  log("⚠️ ", `必需变量缺失：${missing.join(", ")}`);
}

if (missingRecommended.length) {
  log("ℹ️ ", `推荐配置（缺失不阻塞）：${missingRecommended.join(", ")}`);
}

if (!missing.length && !leaked.length) {
  log("✅", `env 基础检查通过`);
}

console.log("──────────────────────────\n");
