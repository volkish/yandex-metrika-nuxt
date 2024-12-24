import type { ActionParams, SubParams, VisitorParams } from './global'
import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(() => {
  const ids: string[] = useRuntimeConfig().public.yandexMetrika.ids.map(moduleOption => moduleOption.id)
  const router = useRouter()

  router.afterEach((to) => {
    ids.forEach(id => window.ym(id, 'hit', to.fullPath))
  })

  return {
    provide: {
      metrika: {
        hit: (url: string, options?: SubParams) => {
          ids.forEach(id => window.ym(id, 'hit', url, options))
        },
        reachGoal: (target: string, params?: ActionParams, callback?: () => void, ctx?: any) => {
          ids.forEach(id => window.ym(id, 'reachGoal', target, params, callback, ctx))
        },
        userParams: (params: VisitorParams) => {
          ids.forEach(id => window.ym(id, 'userParams', params))
        },
      },
    },
  }
})
