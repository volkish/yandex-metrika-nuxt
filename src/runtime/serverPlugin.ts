import type { MetaObject } from '@nuxt/schema'
import type { MetrikaModuleParams } from './type'
import { defineNuxtPlugin, useHead, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(() => {
  const moduleOptions = useRuntimeConfig().public.yandexMetrika
  if (!isValid(moduleOptions)) {
    console.log('[yandex.metrika] module cannot be initialized, please specify at least one ID')
    return
  }

  const meta: MetaObject = {}

  // setting up script tag
  meta.script = meta.script || []

  // setting up no-script tag
  if (moduleOptions.noscript) {
    meta.noscript = meta.noscript || []
  }

  moduleOptions.ids.forEach(moduleOption => {
    meta.script!.unshift({
      id: 'metrika-init-' + moduleOption.id,
      innerHTML: getScriptTag(moduleOption),
    })

    if (moduleOptions.noscript) {
      meta.noscript?.unshift({
        innerHTML: getNoscript(moduleOption.id),
      })
    }
  })

  useHead(meta)
})

function isValid(options: Partial<MetrikaModuleParams>): options is MetrikaModuleParams {
  return !!options.ids && options.ids.length > 0 && !!options.ids[0].id
}

function getScriptTag(options: MetrikaModuleParams['ids'][0]) {
  const metrikaContent = `
    ym("${options.id}", "init", ${JSON.stringify(options.initParams)});
  `
  return metrikaContent.trim()
}

function getNoscript(id: string) {
  return `<div><img src="https://mc.yandex.ru/watch/${id}" style="position:absolute; left:-9999px;" alt="" /></div>`
}
