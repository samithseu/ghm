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
  site: {
    name: "GHM - GitHub Mail",
    url: "https://ghm.samith.dev",
  },
  runtimeConfig: {
    github: { token: "" },
    public: {
      site: {
        name: "GHM - GitHub Mail",
        url: "https://ghm.samith.dev",
      },
    },
  },
  experimental: { viewTransition: true },
  app: {
    head: { titleTemplate: "%s" },
    viewTransition: "always",
  },
  sitemap: { zeroRuntime: true },
  fonts: {
    families: [
      {
        name: "Inter",
        styles: ["normal"],
        weights: [300, 400, 600, 700],
        subsets: ["latin"],
        global: true,
      },
      {
        name: "Geist Mono",
        styles: ["normal"],
        weights: [400, 700],
        subsets: ["latin"],
        global: true,
      },
    ],
  },
  nitro: {
    preset: "vercel",
    prerender: {
      crawlLinks: true,
      routes: [...NAMES.map((name) => `/${name}`), "/"],
    },
  },
  routeRules: { "/": { prerender: true } },
  icon: {
    mode: "svg",
    cssLayer: "base",
    serverBundle: { collections: ["lucide", "lineicons"] },
  },
  $production: { sourcemap: false },
});
