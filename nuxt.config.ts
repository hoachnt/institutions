// https://v3.nuxtjs.org/api/configuration/nuxt.config

export default defineNuxtConfig({
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
  directus: {}
})