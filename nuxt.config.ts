// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
  publicRuntimeConfig: {
    url: process.env.VITE_ENDPOINT
  },
  imports: {
    dirs: ['stores'],
  },
  modules: ["nuxt-directus", [
    '@pinia/nuxt',
    {
      autoImports: [
        // automatically imports `defineStore`
        'defineStore', // import { defineStore } from 'pinia'
        // automatically imports `defineStore` as `definePiniaStore`
        ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
      ],
    },
  ],],
  directus: {
    url: process.env.VITE_ENDPOINT,
    token: ''
  },
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      "@fortawesome/free-solid-svg-icons",
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons'
    ]
  }
})