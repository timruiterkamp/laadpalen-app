const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Recharge ⚡',
    htmlAttrs: {
      lang: 'nl'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Poppins:300,400,600,700&display=swap'
      }
    ]
  },
  env: {
    DEV_URL: 'http://localhost:3001',
    PROD_URL: 'https://server.denniswegereef.nl'
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: 'blue',
    height: '5px'
  },

  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/draggable.js',
    { src: '~/plugins/auth-token.js', ssr: false }
    //  { src: '@/plugins/vue-chartjs.js', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios'

    // '@nuxtjs/apollo'
  ],
  workbox: {
    // offlinePage: '/offline'
  },

  // workbox: {
  //   runtimeCaching: [
  //     {
  //       urlPattern: `'https://${
  //         process.env.NODE_ENV == 'development'
  //           ? process.env.DEV_URL
  //           : process.env.PROD_URL
  //       }/.*'`,
  //       handler: 'cacheFirst',
  //       method: 'GET',
  //       cacheableResponse: { statuses: [0, 200] }
  //     }
  //   ]
  // },

  /*
   ** Build configuration
   */
  minimize: false,
  build: {
    extend(config) {
      config.plugins = config.plugins.filter(
        plugin => plugin.constructor.name !== 'UglifyJsPlugin'
      )
    }
  }
}
