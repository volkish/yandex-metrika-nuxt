import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '../'

export default defineNuxtConfig({
  compatibilityDate: '2024-12-24',
  modules: [MyModule],
  yandexMetrika: {
    ids: [{
      id: '49439650',
    }]
  }
})
