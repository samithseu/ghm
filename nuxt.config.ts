import tailwindcss from "@tailwindcss/vite";
import { SSG_USERNAMES as NAMES } from "./shared/utils";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/global.css"],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "@unhead/schema-org/vue",
      ],
    },
  },
  modules: [
    "@nuxt/icon",
    "@nuxt/fonts",
    "nuxt-og-image",
    "@nuxtjs/color-mode",
    "@nuxtjs/seo",
  ],
  colorMode: { preference: "system", storageKey: "ghm-color-theme" },
  runtimeConfig: { github: { token: "" }, public: { siteUrl: "" } },
  experimental: { viewTransition: true },
  app: {
    head: { titleTemplate: "%s" },
    viewTransition: "always",
  },
  sitemap: { zeroRuntime: true },
  ogImage: { zeroRuntime: true },
  fonts: {
    families: [
      {
        name: "Inter",
        styles: ["normal"],
        weights: [400, 700],
        subsets: ["latin"],
      },
      {
        name: "Geist Mono",
        styles: ["normal"],
        weights: [400, 700],
        subsets: ["latin"],
      },
    ],
  },
  nitro: {
    prerender: { routes: NAMES.map((usr) => `/api/mail/${usr}`) },
  },
  routeRules: { "/": { prerender: true } },
  icon: { serverBundle: "auto", mode: "svg" },
  $production: { sourcemap: false },
});
