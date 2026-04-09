// src/scripts/toast.ts
// Lightweight toast notification system

let container: HTMLDivElement | null = null;

function getContainer(): HTMLDivElement {
  if (container && document.body.contains(container)) return container;
  container = document.createElement("div");
  container.id = "toast-container";
  container.style.cssText = "position:fixed;bottom:80px;left:50%;transform:translateX(-50%);z-index:99990;display:flex;flex-direction:column;align-items:center;gap:8px;pointer-events:none;";
  document.body.appendChild(container);
  return container;
}

export function showToast(message: string, duration = 2500) {
  const c = getContainer();
  const el = document.createElement("div");
  el.textContent = message;
  el.style.cssText = "padding:10px 20px;background:var(--fg);color:var(--bg);border-radius:8px;font-size:13px;font-weight:600;box-shadow:0 4px 16px rgba(0,0,0,0.2);pointer-events:auto;opacity:0;transform:translateY(10px);transition:opacity 0.25s,transform 0.25s;white-space:nowrap;";
  c.appendChild(el);

  requestAnimationFrame(() => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(-10px)";
    setTimeout(() => el.remove(), 300);
  }, duration);
}
