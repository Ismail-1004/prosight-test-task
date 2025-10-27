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
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: 'Task Flow',
      short_name: 'TaskFlow',
      description: 'Manage your tasks offline and online!',
      theme_color: '#3b82f6',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
      runtimeCaching: [
        {
          urlPattern: ({ request }) =>
            ['document', 'script', 'style', 'image', 'font'].includes(request.destination),
          handler: 'CacheFirst',
          options: {
            cacheName: 'static-resources',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30
            }
          }
        },
        {
          urlPattern: ({ url }) => url.pathname.startsWith('/data.json'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            networkTimeoutSeconds: 3,
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 7
            }
          }
        }
      ]
    }
  }
})