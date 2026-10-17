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
    "@vite-pwa/nuxt",
  ],
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "GHM - GitHub Mail",
      short_name: "GHM",
      description: "Find GitHub-based noreply email by username.",
      theme_color: "#0a0a0a",
      background_color: "#ffffff",
      display: "standalone",
      orientation: "portrait",
      scope: "/",
      start_url: "/",
      icons: [
        {
          src: "/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/pwa-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: null,
      globPatterns: ["**/*.{js,css,html,png,svg,ico,woff,woff2}"],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/avatars\.githubusercontent\.com\/.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "github-avatars-cache",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 7,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^\/api\/mail\/.*/i,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "ghm-api-cache",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    devOptions: {
      enabled: false,
    },
  },
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
    head: {
      titleTemplate: "%s",
      link: [
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
    },
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
