// src/scripts/code-copy.ts
// Add copy buttons to all code blocks in articles

import { showToast } from "./toast";

function initCodeCopy() {
  const article = document.getElementById("article");
  if (!article) return;

  article.querySelectorAll("pre").forEach(pre => {
    if (pre.querySelector(".code-copy-btn")) return; // already added

    const btn = document.createElement("button");
    btn.className = "code-copy-btn";
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
    btn.title = "Copy";
    btn.style.cssText = "position:absolute;top:8px;right:8px;padding:5px 8px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:4px;color:rgba(255,255,255,0.7);cursor:pointer;font-size:12px;display:flex;align-items:center;gap:4px;opacity:0;transition:opacity 0.15s;z-index:2;";

    pre.style.position = "relative";
    pre.appendChild(btn);

    // Show on hover
    pre.addEventListener("mouseenter", () => { btn.style.opacity = "1"; });
    pre.addEventListener("mouseleave", () => { btn.style.opacity = "0"; });

    btn.addEventListener("click", async () => {
      const code = pre.querySelector("code");
      const text = code?.textContent ?? pre.textContent ?? "";
      try {
        await navigator.clipboard.writeText(text);
        showToast("Copied!");
      } catch {
        showToast("Copy failed");
      }
    });
  });
}

initCodeCopy();
document.addEventListener("astro:after-swap", initCodeCopy);
