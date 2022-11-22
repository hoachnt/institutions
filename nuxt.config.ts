// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  publicRuntimeConfig: {
    url: process.env.VITE_ENDPOINT,
    my_domain: process.env.MY_DOMAIN,
  },
  imports: {
    dirs: ["stores"],
  },
  modules: [
    "nuxt-directus",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // automatically imports `defineStore`
          "defineStore", // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
    '@nuxtjs/tailwindcss',
  ],
  directus: {
    url: "https://directus.hoach.skryonline.com",
    token: "",
  },
  css: [
    "~/assets/css/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@fortawesome/free-regular-svg-icons",
      "@fortawesome/free-brands-svg-icons",
    ],
  },
});
