import tailwindcss from "@tailwindcss/vite";
import { SSG_USERNAMES as NAMES } from "./shared/utils";

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
        weights: [400, 700],
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
    future: {
      nativeSWR: true,
    },
    prerender: {
      crawlLinks: true,
      routes: [...NAMES.map((name) => `/${name}`), "/"],
    },
  },
  routeRules: {
    "/api/mail/**": {
      swr: 3600,
      cache: {
        maxAge: 3600,
        swr: true,
        staleMaxAge: 86400,
      },
    },
  },
  icon: {
    mode: "svg",
    cssLayer: "base",
    serverBundle: false,
    clientBundle: { scan: { globInclude: ["**/*.{vue,ts,js}"] } },
  },
  $production: { sourcemap: false },
});
