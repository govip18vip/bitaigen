// src/scripts/font-size.ts
// Article font size adjuster — persisted in localStorage

import { showToast } from "./toast";
import { get, set } from "./storage";

const KEY = "font_size";
const MIN = 14;
const MAX = 22;
const DEFAULT = 16;
const STEP = 2;

function getSize(): number {
  return get<number>(KEY) ?? DEFAULT;
}

function apply(size: number) {
  const article = document.getElementById("article");
  if (article) article.style.fontSize = `${size}px`;
}

function initFontSize() {
  const article = document.getElementById("article");
  if (!article) return;

  // Apply saved size
  apply(getSize());

  // Create controls if not exist
  if (document.getElementById("font-size-ctrl")) return;

  const ctrl = document.createElement("div");
  ctrl.id = "font-size-ctrl";
  ctrl.style.cssText = "display:inline-flex;align-items:center;gap:2px;margin-left:auto;";
  ctrl.innerHTML = `
    <button id="fs-down" style="width:28px;height:28px;border:1px solid var(--border);border-radius:4px;background:var(--bg-elevated);color:var(--fg-muted);cursor:pointer;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;" title="Smaller">A-</button>
    <button id="fs-up" style="width:28px;height:28px;border:1px solid var(--border);border-radius:4px;background:var(--bg-elevated);color:var(--fg-muted);cursor:pointer;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;" title="Larger">A+</button>
  `;

  // Insert into the meta row
  const meta = document.querySelector(".pd-meta");
  if (meta) {
    meta.appendChild(ctrl);
  }

  document.getElementById("fs-down")?.addEventListener("click", () => {
    const s = Math.max(MIN, getSize() - STEP);
    set(KEY, s);
    apply(s);
    showToast(`Font: ${s}px`);
  });

  document.getElementById("fs-up")?.addEventListener("click", () => {
    const s = Math.min(MAX, getSize() + STEP);
    set(KEY, s);
    apply(s);
    showToast(`Font: ${s}px`);
  });
}

initFontSize();
document.addEventListener("astro:after-swap", initFontSize);
