# Bitaigen — Security & Secrets Management

## 已泄露 token 的轮换清单 (2026-04-16)

如果 `.env.local` 曾经被提交到过 git，即使现已从工作树移除，旧 token **仍在历史中可查**，必须立即轮换：

| Token | 控制台 | 动作 |
| --- | --- | --- |
| `SANITY_READ_TOKEN` | https://www.sanity.io/manage → API → Tokens | Revoke 旧 token → Add new Viewer token |
| `SANITY_WRITE_TOKEN` | 同上 | Revoke → Add new Editor token（仅限 pipeline 机器） |
| `RESEND_API_KEY` | https://resend.com/api-keys | Delete → Create new（scope: sending + audiences） |
| `GHOST_CONTENT_KEY` | Ghost Admin → Integrations | 删除旧集成 → 新建 |
| `GHOST_ADMIN_KEY` | 同上 | 同上 |
| `LILYS_*` / `BIYIJIA_*` | 对应平台账号设置 | 轮换 |

## 规范

1. **任何以 `.env` 开头的文件都不提交**（`.gitignore` 已覆盖 `.env.*`，唯一白名单 `env.example`）。
2. **`PUBLIC_` 前缀仅用于非敏感变量**（会被打包进浏览器）；敏感 token 绝不用 `PUBLIC_`。构建前 `scripts/check-env.mjs` 会硬失败。
3. **Vercel** 部署的所有敏感变量在 Dashboard → Settings → Environment Variables 中配置，区分 `Production / Preview / Development` 三套。
4. **GitHub Actions** 的 build step 只通过 `${{ secrets.* }}` 读取，不落磁盘。
5. **Pipeline**（`/pipeline`）使用的 write token 建议至少每 90 天轮换一次。

## 历史清洗（可选，如果泄露影响大）

```bash
# 将 .env.local 从所有 git 历史中移除（不可逆，需通知所有协作者重新 clone）
git filter-repo --path .env.local --invert-paths
git push --force-with-lease origin master
```

> ⚠️ `filter-repo` 会重写历史。轮换 token 永远是**第一选择**，历史清洗只是额外防御。

## 报告漏洞

发现安全问题请发邮件到 `contact@bitaigen.com`，请勿公开提 issue。
