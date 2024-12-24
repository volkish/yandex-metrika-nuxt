import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },

  yandexMetrika: {
    ids: [{
      id: '49439650',
    }]
  },

  compatibilityDate: '2024-12-24'
})