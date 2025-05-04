import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    // '@nuxt/fonts',
    // '@nuxt/scripts',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
  ],
  app: {
    head: {
      title: "Dev bookmarks",
      htmlAttrs: {
        lang: "en"
      }
    }
  },
  googleFonts: {
    families: {
      'Poppins': ["400", "500", "800"]
    }
  }
})