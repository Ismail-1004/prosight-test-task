// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ["@/assets/styles/main.css"],

  googleFonts: {
    families: {
      Manrope: [300, 400, 500, 600, 700]
    }
  },

  modules: [
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
  ],
})