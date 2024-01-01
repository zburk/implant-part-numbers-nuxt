// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@vite-pwa/nuxt'],
  hooks: {
    'components:dirs': (dirs) => {
      dirs.unshift({
        path: '~/components/ui',
        // this is required else Nuxt will autoImport `.ts` file
        extensions: ['.vue'],
        // prefix for your components, eg: UiButton
        prefix: '',
        // prevent adding another prefix component by it's path.
        pathPrefix: false
      })
    }
  },
  typescript: {
    typeCheck: true,
    strict: true
  }
})