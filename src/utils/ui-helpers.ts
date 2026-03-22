// src/utils/ui-helpers.ts
// ✅ Synced with ui.ts — re-exports for backward compatibility

import {
  LANGUAGES,
  UI,
  DEFAULT_LANG,
  LANG_TO_PATH,
  LANG_PATH_SEGMENTS,
  LANG_PATH_MAP,
  getLang,
  stripLangPrefix,
  hreflangLinks,
  useTranslations,
  type Lang,
} from "@/i18n/ui";

// Re-export everything for files that import from ui-helpers
export {
  LANGUAGES,
  UI,
  DEFAULT_LANG,
  LANG_TO_PATH,
  LANG_PATH_SEGMENTS,
  LANG_PATH_MAP,
  getLang,
  stripLangPrefix,
  hreflangLinks,
  useTranslations,
  type Lang,
};

export { hreflangLinks as buildAlternates };
