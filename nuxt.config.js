export default {
  head: {
    title: 'blog-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '~/assets/css/main.css',
  ],

  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  components: true,

  buildModules: [],

  modules: [

  ],

  axios: {
    baseURL: 'http://localhost:3000'
  },

  build: {},

  router: {
    middleware: ['auth']
    
  },

  // serverMiddleware: [
  //   { path: '/', handler: '~/serverMiddleware/cookies.js' }, // Path to your cookies middleware
  // ],

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/user', method: 'get' }
        }
      }
    }
  }
}
