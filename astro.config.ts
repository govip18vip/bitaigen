sitemap({
  filter: page => SITE.showArchives || !page.endsWith("/archives"),
  i18n: {
    defaultLocale: "zh-CN",
    locales: {
      "zh-CN": "zh-CN",
      "zh-tw": "zh-TW",
      "en":    "en",
      "es":    "es",
      "pt":    "pt-BR",
    },
  },
}),