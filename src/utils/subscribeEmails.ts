// src/utils/subscribeEmails.ts
// ─────────────────────────────────────────────────────────────
// Transactional email templates for subscription flow.
//   • Confirmation email (double opt-in) — sent by POST /api/subscribe
//   • Welcome email                      — sent by GET  /api/subscribe/confirm
//
// All templates are inline-style HTML for maximum email-client compatibility,
// include an unsubscribe link (RFC 8058 compliance via List-Unsubscribe header
// is set on the Resend request itself).
// ─────────────────────────────────────────────────────────────

export type Lang = "zh-CN" | "zh-TW" | "en" | "es" | "pt";

interface BaseStrings {
  siteTagline: string;
  unsubText: string;
}

// ── Confirmation email ──────────────────────────────────────────────
interface ConfirmStrings extends BaseStrings {
  subject:   string;
  heading:   string;
  intro:     string;
  cta:       string;
  expiry:    string; // "This link expires in 24 hours"
  ignore:    string; // "If you didn't request this, you can safely ignore"
}

export const CONFIRM_CONTENT: Record<Lang, ConfirmStrings> = {
  "zh-CN": {
    subject:   "请确认您的 Bitaigen 订阅",
    heading:   "请确认您的订阅",
    intro:     "您即将订阅 Bitaigen 区块链资讯简报。请点击下方按钮确认此邮箱地址：",
    cta:       "确认订阅",
    expiry:    "此链接将在 24 小时后失效。",
    ignore:    "如果您未请求此订阅，可安全忽略此邮件。",
    siteTagline: "专业区块链资讯平台",
    unsubText:   "",
  },
  "zh-TW": {
    subject:   "請確認您的 Bitaigen 訂閱",
    heading:   "請確認您的訂閱",
    intro:     "您即將訂閱 Bitaigen 區塊鏈資訊快報。請點擊下方按鈕確認此郵箱地址：",
    cta:       "確認訂閱",
    expiry:    "此連結將在 24 小時後失效。",
    ignore:    "如果您未請求此訂閱，可安全忽略此郵件。",
    siteTagline: "專業區塊鏈資訊平台",
    unsubText:   "",
  },
  "en": {
    subject:   "Confirm your Bitaigen subscription",
    heading:   "Confirm your subscription",
    intro:     "You're about to subscribe to Bitaigen's blockchain newsletter. Please click below to verify your email address:",
    cta:       "Confirm subscription",
    expiry:    "This link expires in 24 hours.",
    ignore:    "If you didn't request this, you can safely ignore this email.",
    siteTagline: "Professional Blockchain Intelligence",
    unsubText:   "",
  },
  "es": {
    subject:   "Confirma tu suscripción a Bitaigen",
    heading:   "Confirma tu suscripción",
    intro:     "Estás a punto de suscribirte al boletín blockchain de Bitaigen. Haz clic abajo para verificar tu correo:",
    cta:       "Confirmar suscripción",
    expiry:    "Este enlace caduca en 24 horas.",
    ignore:    "Si no solicitaste esto, puedes ignorar este correo.",
    siteTagline: "Inteligencia Profesional de Blockchain",
    unsubText:   "",
  },
  "pt": {
    subject:   "Confirme sua inscrição no Bitaigen",
    heading:   "Confirme sua inscrição",
    intro:     "Você está prestes a assinar o boletim blockchain do Bitaigen. Clique abaixo para verificar seu e-mail:",
    cta:       "Confirmar inscrição",
    expiry:    "Este link expira em 24 horas.",
    ignore:    "Se você não solicitou isso, pode ignorar este e-mail com segurança.",
    siteTagline: "Inteligência Profissional de Blockchain",
    unsubText:   "",
  },
};

export function buildConfirmHtml(lang: Lang, confirmUrl: string, year: number): string {
  const c = CONFIRM_CONTENT[lang] ?? CONFIRM_CONTENT["zh-CN"];
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${c.subject}</title>
</head>
<body style="margin:0;padding:0;background:#f0f1f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
          style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e8e9ef;">
          <tr>
            <td style="background:#0d0e14;padding:24px 32px;text-align:center;">
              <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto;">
                <tr>
                  <td style="background:#f7931a;width:36px;height:36px;border-radius:8px;text-align:center;vertical-align:middle;">
                    <span style="font-size:18px;font-weight:900;color:#fff;line-height:36px;">₿</span>
                  </td>
                  <td style="padding-left:12px;vertical-align:middle;">
                    <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:-0.02em;">Bitaigen</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px 24px;">
              <h1 style="font-size:22px;font-weight:800;color:#1a1a1a;margin:0 0 14px;line-height:1.3;">${c.heading}</h1>
              <p style="font-size:15px;color:#666677;line-height:1.7;margin:0 0 24px;">${c.intro}</p>
              <div style="text-align:center;margin:0 0 18px;">
                <a href="${confirmUrl}"
                  style="display:inline-block;background:#f7931a;color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:15px;font-weight:700;letter-spacing:0.01em;">
                  ${c.cta}
                </a>
              </div>
              <p style="font-size:12px;color:#999aaa;line-height:1.6;margin:0 0 6px;word-break:break-all;">
                ${confirmUrl}
              </p>
              <p style="font-size:12px;color:#999aaa;line-height:1.6;margin:10px 0 0;">${c.expiry}</p>
              <p style="font-size:12px;color:#999aaa;line-height:1.6;margin:6px 0 0;">${c.ignore}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px;"><hr style="border:none;border-top:1px solid #e8e9ef;margin:0;" /></td>
          </tr>
          <tr>
            <td style="padding:18px 32px;text-align:center;font-size:12px;color:#999aaa;line-height:1.6;">
              <p style="margin:0;">© ${year} <a href="https://bitaigen.com" style="color:#f7931a;text-decoration:none;">Bitaigen.com</a> — ${c.siteTagline}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Welcome email (sent after confirmation) ─────────────────────────
interface WelcomeStrings extends BaseStrings {
  subject:   string;
  heading:   string;
  intro:     string;
  cta:       string;
  unsubLabel:string;
}

export const WELCOME_CONTENT: Record<Lang, WelcomeStrings> = {
  "zh-CN": {
    subject:   "欢迎订阅 Bitaigen — 专业区块链资讯",
    heading:   "欢迎加入 Bitaigen！",
    intro:     "感谢您确认订阅我们的区块链资讯简报。您将第一时间收到：",
    cta:       "访问 Bitaigen.com →",
    unsubLabel:"取消订阅",
    siteTagline: "专业区块链资讯平台",
    unsubText:   "如需退订，请点击下方链接。",
  },
  "zh-TW": {
    subject:   "歡迎訂閱 Bitaigen — 專業區塊鏈資訊",
    heading:   "歡迎加入 Bitaigen！",
    intro:     "感謝您確認訂閱我們的區塊鏈資訊快報。您將第一時間收到：",
    cta:       "前往 Bitaigen.com →",
    unsubLabel:"取消訂閱",
    siteTagline: "專業區塊鏈資訊平台",
    unsubText:   "如需退訂，請點擊下方連結。",
  },
  "en": {
    subject:   "Welcome to Bitaigen — Professional Blockchain News",
    heading:   "Welcome to Bitaigen!",
    intro:     "Thanks for confirming your subscription. You'll receive:",
    cta:       "Visit Bitaigen.com →",
    unsubLabel:"Unsubscribe",
    siteTagline: "Professional Blockchain Intelligence",
    unsubText:   "To stop receiving these emails, click the link below.",
  },
  "es": {
    subject:   "Bienvenido a Bitaigen — Noticias Blockchain Profesionales",
    heading:   "¡Bienvenido a Bitaigen!",
    intro:     "Gracias por confirmar tu suscripción. Recibirás:",
    cta:       "Visitar Bitaigen.com →",
    unsubLabel:"Cancelar suscripción",
    siteTagline: "Inteligencia Profesional de Blockchain",
    unsubText:   "Para dejar de recibir estos correos, haz clic en el enlace.",
  },
  "pt": {
    subject:   "Bem-vindo ao Bitaigen — Notícias Blockchain Profissionais",
    heading:   "Bem-vindo ao Bitaigen!",
    intro:     "Obrigado por confirmar sua inscrição. Você receberá:",
    cta:       "Visitar Bitaigen.com →",
    unsubLabel:"Cancelar inscrição",
    siteTagline: "Inteligência Profissional de Blockchain",
    unsubText:   "Para parar de receber estes e-mails, clique no link.",
  },
};

export const BULLET_ITEMS: Record<Lang, string[]> = {
  "zh-CN": ["比特币、以太坊实时行情分析", "加密货币市场深度报道", "交易所使用教程与安全指南", "DeFi 协议最新动态"],
  "zh-TW": ["比特幣、以太坊即時行情分析", "加密貨幣市場深度報導", "交易所使用教學與安全指南", "DeFi 協議最新動態"],
  "en":    ["Real-time Bitcoin & Ethereum price analysis", "In-depth crypto market reporting", "Exchange tutorials & wallet security guides", "Latest DeFi protocol news"],
  "es":    ["Análisis de precio de Bitcoin y Ethereum en tiempo real", "Informes de mercado cripto en profundidad", "Tutoriales de exchanges y guías de seguridad", "Últimas noticias de protocolos DeFi"],
  "pt":    ["Análise de preço de Bitcoin e Ethereum em tempo real", "Relatórios de mercado cripto aprofundados", "Tutoriais de exchanges e guias de segurança", "Últimas notícias de protocolos DeFi"],
};

export function buildWelcomeHtml(lang: Lang, unsubscribeUrl: string, year: number): string {
  const c = WELCOME_CONTENT[lang] ?? WELCOME_CONTENT["zh-CN"];
  const bullets = BULLET_ITEMS[lang] ?? BULLET_ITEMS["zh-CN"];
  const bulletHtml = bullets.map(b => `<li style="margin:4px 0;">${b}</li>`).join("\n");

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${c.subject}</title>
</head>
<body style="margin:0;padding:0;background:#f0f1f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
          style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e8e9ef;">
          <tr>
            <td style="background:#0d0e14;padding:24px 32px;text-align:center;">
              <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto;">
                <tr>
                  <td style="background:#f7931a;width:36px;height:36px;border-radius:8px;text-align:center;vertical-align:middle;">
                    <span style="font-size:18px;font-weight:900;color:#fff;line-height:36px;">₿</span>
                  </td>
                  <td style="padding-left:12px;vertical-align:middle;">
                    <span style="font-size:20px;font-weight:900;color:#ffffff;letter-spacing:-0.02em;">Bitaigen</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px 28px;">
              <h1 style="font-size:22px;font-weight:800;color:#1a1a1a;margin:0 0 14px;line-height:1.3;">${c.heading}</h1>
              <p style="font-size:15px;color:#666677;line-height:1.7;margin:0 0 16px;">${c.intro}</p>
              <ul style="font-size:14px;color:#666677;line-height:1.9;padding-left:20px;margin:0 0 28px;">
                ${bulletHtml}
              </ul>
              <a href="https://bitaigen.com"
                style="display:inline-block;background:#f7931a;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:700;letter-spacing:0.01em;">
                ${c.cta}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px;"><hr style="border:none;border-top:1px solid #e8e9ef;margin:0;" /></td>
          </tr>
          <tr>
            <td style="padding:20px 32px;text-align:center;font-size:12px;color:#999aaa;line-height:1.7;">
              <p style="margin:0;">© ${year} <a href="https://bitaigen.com" style="color:#f7931a;text-decoration:none;">Bitaigen.com</a> — ${c.siteTagline}</p>
              <p style="margin:6px 0 0;font-size:11px;opacity:0.8;">
                ${c.unsubText}
                <a href="${unsubscribeUrl}" style="color:#999aaa;text-decoration:underline;">${c.unsubLabel}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function normalizeLang(l: unknown): Lang {
  const allowed: Lang[] = ["zh-CN", "zh-TW", "en", "es", "pt"];
  if (typeof l === "string" && (allowed as string[]).includes(l)) return l as Lang;
  return "zh-CN";
}
