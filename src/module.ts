import { addPlugin, addServerPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { name, version } from '../package.json'
import type { MetrikaModuleParams } from './runtime/type'

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    yandexMetrika: Pick<MetrikaModuleParams, 'ids'>
  }

  interface PublicRuntimeConfig {
    yandexMetrika: Pick<MetrikaModuleParams, 'ids'>
  }
}

function getScriptTag (options: MetrikaModuleParams) {
  const libURL = !options.useCDN ? 'https://mc.yandex.ru/metrika/tag.js' : 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js'
  const metrikaContent = `
    (function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "${libURL}", "ym");
  `
  return metrikaContent.trim()
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ModuleOptions extends MetrikaModuleParams {}

export default defineNuxtModule<MetrikaModuleParams>({
  meta: {
    name,
    version,
    configKey: 'yandexMetrika'
  },
  defaults: {
    noscript: true,
    useCDN: false,
    verbose: true,
    defaultInitParams: {
      defer: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      ecommerce: true,
    },
  },
  setup (options, nuxt) {
    const moduleOptions: MetrikaModuleParams = {
      ...options,
      ids: options?.ids?.map(moduleOption => {
        return {
          ...moduleOption,
          initParams: {
            ...moduleOption.initParams,
            ...options.defaultInitParams
          }
        }
      }) ?? []
    }

    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.yandexMetrika = {
      ids: moduleOptions.ids
    }

    if (!nuxt.options.dev && ['production', 'test'].includes(process.env.NODE_ENV!)) {
      nuxt.options.app.head.script = nuxt.options.app.head.script || []
      nuxt.options.app.head.script.unshift({
        id: 'metrika',
        innerHTML: getScriptTag(moduleOptions),
      })

      addServerPlugin(resolver.resolve('./runtime/serverPlugin'))
      addPlugin(resolver.resolve('./runtime/plugin'))
    } else if (options.verbose === true) {
      addPlugin(resolver.resolve('./runtime/plugin-dev'))
    }
  },
})
