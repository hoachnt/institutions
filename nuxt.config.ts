// https://v3.nuxtjs.org/api/configuration/nuxt.config

import { en } from './locales/en'
import { ru } from './locales/ru'
import { vn } from './locales/vn'

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: 'Institution',
      meta: [
        { charset: 'utf-8' },
        {
          hid: 'viewport',
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=1.0'
        }
      ]
    }
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
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    '@vueuse/nuxt',
  ],
  i18n: {
    vueI18n: {
      legacy: false,
      locale: "en",
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
    'vuetify/lib/styles/main.sass',
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
      "vuetify"
    ],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
});