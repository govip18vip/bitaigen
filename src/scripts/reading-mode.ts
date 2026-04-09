// src/scripts/reading-mode.ts
// Distraction-free reading mode — hides sidebar, nav, ads

import { showToast } from "./toast";

function initReadingMode() {
  const article = document.getElementById("article");
  if (!article) return;

  // Don't re-create button
  if (document.getElementById("reading-mode-btn")) return;

  const btn = document.createElement("button");
  btn.id = "reading-mode-btn";
  btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`;
  btn.title = "Reading mode";
  btn.style.cssText = "position:fixed;top:60px;right:16px;z-index:8400;width:36px;height:36px;border-radius:8px;border:1px solid var(--border);background:var(--bg-card);color:var(--fg-muted);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s;box-shadow:0 2px 8px rgba(0,0,0,0.1);";

  document.body.appendChild(btn);

  let active = false;
  const hideSelectors = [
    ".left-sidebar", ".rsidebar", ".pd-toc-sidebar",
    "#sticky-nav", "#mobile-bnav", "#bnr-float",
    ".pd-breadcrumb", ".pd-banner-mid", ".pd-subscribe-card",
    "[data-button='back-to-top']",
  ];

  btn.addEventListener("click", () => {
    active = !active;
    document.body.classList.toggle("reading-mode", active);

    hideSelectors.forEach(sel => {
      document.querySelectorAll<HTMLElement>(sel).forEach(el => {
        el.style.display = active ? "none" : "";
      });
    });

    // Expand article to full width
    const mainCol = article.closest<HTMLElement>(".main-col, .pd-layout");
    if (mainCol) {
      mainCol.style.maxWidth = active ? "750px" : "";
      mainCol.style.margin = active ? "0 auto" : "";
    }

    btn.style.background = active ? "var(--accent)" : "var(--bg-card)";
    btn.style.color = active ? "#fff" : "var(--fg-muted)";

    showToast(active ? "Reading mode ON" : "Reading mode OFF");
  });
}

initReadingMode();
document.addEventListener("astro:after-swap", initReadingMode);
