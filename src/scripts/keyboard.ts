// src/scripts/keyboard.ts
// Global keyboard shortcuts for power users

function initKeyboard() {
  document.addEventListener("keydown", (e) => {
    // Don't capture when typing in inputs
    const tag = (e.target as HTMLElement).tagName.toLowerCase();
    if (["input", "textarea", "select"].includes(tag)) return;
    if ((e.target as HTMLElement).isContentEditable) return;

    switch (e.key) {
      case "/":
        // Focus search — prevent typing "/" in search box
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>(
          'input[type="search"], input[name="q"], input[placeholder*="搜索"], input[placeholder*="Search"]'
        );
        if (searchInput) {
          searchInput.focus();
          searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          window.location.href = "/search";
        }
        break;

      case "Escape":
        // Close any open overlay (lightbox, popup)
        const overlay = document.querySelector<HTMLElement>('[style*="position:fixed"][style*="z-index:99999"]');
        overlay?.remove();
        const scrollSub = document.getElementById("scroll-subscribe");
        if (scrollSub?.classList.contains("visible")) {
          scrollSub.classList.remove("visible");
        }
        (document.activeElement as HTMLElement)?.blur();
        break;

      case "h":
        // Go home
        if (!e.ctrlKey && !e.metaKey) {
          window.location.href = "/";
        }
        break;

      case "p":
        // Go to prices
        if (!e.ctrlKey && !e.metaKey) {
          window.location.href = "/price";
        }
        break;
    }
  });
}

initKeyboard();
document.addEventListener("astro:after-swap", initKeyboard);
