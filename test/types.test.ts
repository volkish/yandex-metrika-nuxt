import { describe, expectTypeOf, test } from 'vitest'
import type { NuxtConfig } from 'nuxt/config'
import type { MetrikaModuleParams } from '~/src/runtime/type'

describe('types', function () {
  test('check module types', () => {
    expectTypeOf<Partial<MetrikaModuleParams>>().toMatchTypeOf<NuxtConfig['yandexMetrika']>()
  })
})
