import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  ignores: ["**/dist", "**/node_modules", "**/playground"],
  dirs: {
    src: [
      './playground',
    ],
  },
}).append({
  files: ['playground/app.vue', 'playground/pages/**/*.vue', 'playground/layouts/**/*.vue'],
  rules: {
    'vue/multi-word-component-names': 'off'
  }
})
