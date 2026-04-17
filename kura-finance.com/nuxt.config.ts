export default defineNuxtConfig({
  ssr: true,
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/css/globals.css'],
  app: {
    head: {
      title: 'Kura Finance - Brand',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Kura Finance - Unify Your Financial Reality' }
      ]
    }
  },
  tailwindcss: {
    configPath: '~/tailwind.config.ts'
  },
  devtools: { enabled: false }
});
