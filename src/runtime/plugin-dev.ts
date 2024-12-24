import type { ActionParams, SubParams, VisitorParams } from './global'
import { defineNuxtPlugin, useRouter } from '#app'

export default defineNuxtPlugin(() => {
  const router = useRouter()

  router.afterEach((to) => {
    console.info(`[yandex.metrika] hit on "${to.fullPath}" on dev`)
  })

  return {
    provide: {
      metrika: {
        hit: (url: string, options?: SubParams) => {
          console.info(`[yandex.metrika] hit on "${url}" on dev`)

          if (options) {
            console.info(`[yandex.metrika] hit options: ${JSON.stringify(options)} on dev`)
          }
        },
        reachGoal: (target: string, _params?: ActionParams, _callback?: () => void, _ctx?: unknown) => {
          console.info(`[yandex.metrika] reach goal "${target}" on dev`)
        },
        userParams: (params: VisitorParams) => {
          const paramsStr = JSON.stringify(params)
          console.info(`[yandex.metrika] handle user params: ${paramsStr} on dev`)
        },
      },
    },
  }
})
