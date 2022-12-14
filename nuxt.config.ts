// https://v3.nuxtjs.org/api/configuration/nuxt.config

import { en } from "./locales/en";
import { ru } from "./locales/ru";
import { vn } from "./locales/vn";
import app from "./middleware/cookies"

const defaultLanguage = "en";

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Institution",
      meta: [
        { charset: "utf-8" },
        {
          hid: "viewport",
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1.0",
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
  },
  publicRuntimeConfig: {
    url: process.env.VITE_ENDPOINT,
    my_domain: process.env.MY_DOMAIN,
  },
  imports: {
    dirs: ["stores"],
  },
  ssr: true,
  target: "server",
  modules: [
    "nuxt-directus",
    "cookie-universal-nuxt",
    ["cookie-universal-nuxt", { alias: "cookiz" }],
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
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
  ],
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    vueI18n: {
      legacy: false,
      locale: defaultLanguage,
      messages: {
        en,
        ru,
        vn,
      },
    },
  },
  directus: {
    url: "https://directus.hoach.skryonline.com",
    token: "",
  },
  css: [
    "~/assets/css/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "vuetify/lib/styles/main.sass",
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
      "vuetify",
    ],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
});
