// src/scripts/analytics.ts
// GA4 custom event tracking — affiliate clicks, engagement, conversions

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function track(event: string, params: Record<string, string | number>) {
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}

/** Track affiliate link clicks (Binance, OKX, etc.) */
function initAffiliateTracking() {
  document.addEventListener("click", (e) => {
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[rel*='sponsored'], a[data-affiliate]");
    if (!link) return;

    const href = link.href;
    let platform = "unknown";
    if (href.includes("binance")) platform = "binance";
    else if (href.includes("okx")) platform = "okx";
    else if (href.includes("bybit")) platform = "bybit";

    const placement = link.closest("[data-placement]")?.getAttribute("data-placement")
      ?? (link.closest(".pd-banner-mid") ? "article_mid"
        : link.closest(".pd-banner-article") ? "article_bottom"
          : link.closest(".pd-toc-banner") ? "sidebar_toc"
            : link.closest("#bnr-float") ? "floating"
              : link.closest(".rsidebar") ? "sidebar"
                : link.closest(".ticker-inner") ? "ticker"
                  : "other");

    track("affiliate_click", {
      affiliate_platform: platform,
      affiliate_placement: placement,
      link_url: href.substring(0, 100),
      page_path: window.location.pathname,
    });
  });
}

/** Track article scroll depth (25%, 50%, 75%, 100%) */
function initScrollDepthTracking() {
  const article = document.getElementById("article");
  if (!article) return;

  const milestones = [25, 50, 75, 100];
  const fired = new Set<number>();
  let ticking = false;

  function check() {
    const rect = article!.getBoundingClientRect();
    const articleTop = article!.offsetTop;
    const articleHeight = article!.offsetHeight;
    const scrolled = window.scrollY - articleTop + window.innerHeight;
    const pct = Math.min(100, Math.max(0, Math.round((scrolled / articleHeight) * 100)));

    for (const m of milestones) {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        track("scroll_depth", {
          depth_percent: m,
          page_path: window.location.pathname,
        });
      }
    }
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(check); ticking = true; }
  }, { passive: true });
}

/** Track newsletter subscribe */
function initSubscribeTracking() {
  document.addEventListener("submit", (e) => {
    const form = (e.target as HTMLElement).closest<HTMLFormElement>("[data-subscribe-form]");
    if (!form) return;
    track("newsletter_subscribe", {
      placement: form.getAttribute("data-placement") ?? "unknown",
      page_path: window.location.pathname,
    });
  });
}

function init() {
  initAffiliateTracking();
  initScrollDepthTracking();
  initSubscribeTracking();
}

init();
document.addEventListener("astro:after-swap", init);
