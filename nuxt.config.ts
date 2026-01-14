import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/global.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@nuxt/icon", "@nuxt/fonts", "nuxt-og-image", "@nuxtjs/color-mode"],
  colorMode: {
    preference: "system",
    storageKey: "ghm-color-theme",
  },
  runtimeConfig: {
    github: {
      token: "",
    },
  },
  experimental: {
    viewTransition: true,
  },
  app: {
    viewTransition: "always",
  },
  routeRules: {
    "/": { prerender: true },
  },
  icon: {
    serverBundle: "auto",
    mode: "svg",
  },
});
