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
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],

  pwa: {
    manifest: {
      name: "Ads App",
      short_name: "AdsApp",
      description: "Test Task",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#4f46e5",
      icons: [
        { src: '/icons/logo-64.png', sizes: '64x64', type: 'image/png' },
        { src: '/icons/logo-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/logo-512.png', sizes: '512x512', type: 'image/png' }
      ]
    },
    workbox: {
      navigateFallback: '/',
      runtimeCaching: [
        {
          urlPattern: /^\/.*$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'assets-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 7
            }
          }
        }
      ]
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  }
})