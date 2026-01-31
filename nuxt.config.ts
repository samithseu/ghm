import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/global.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@nuxt/icon",
    "@nuxt/fonts",
    "nuxt-og-image",
    "@nuxtjs/color-mode",
    "@nuxtjs/seo",
  ],
  colorMode: {
    preference: "system",
    storageKey: "ghm-color-theme",
  },
  runtimeConfig: {
    github: { token: "" },
    public: { siteUrl: "" },
  },
  experimental: {
    viewTransition: true,
  },
  app: {
    head: { titleTemplate: "%s" },
    viewTransition: "always",
  },
  sitemap: {
    zeroRuntime: true,
  },
  routeRules: {
    "/": { prerender: true },
  },
  icon: {
    serverBundle: "auto",
    mode: "svg",
  },
});
