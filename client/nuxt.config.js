const pkg = require('./package')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
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
    PROD_URL: 'https://denniswegereef.nl'
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

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
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
    // '@nuxtjs/pwa'
    // '@nuxtjs/apollo'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  // apollo: {
  //   tokenName: 'laadpalen-app', // optional, default: apollo-token
  //   tokenExpires: 10, // optional, default: 7 (days)
  //   includeNodeModules: false, // optional, default: false (this includes graphql-tag for node_modules folder)
  //   authenticationType: 'Basic', // optional, default: 'Bearer'
  //   // (Optional) Default 'apollo' definition
  //   defaultOptions: {
  //     // See 'apollo' definition
  //     // For example: default query options
  //     $query: {
  //       loadingKey: 'loading',
  //       fetchPolicy: 'cache-and-network'
  //     }
  //   },
  //   // optional
  //   errorHandler: '~/plugins/apollo-error-handler.js',
  //   // required
  //   clientConfigs: {
  //     default: {
  //       // required
  //       httpEndpoint: 'http://localhost:3001',
  //       // optional
  //       // See https://www.apollographql.com/docs/link/links/http.html#options
  //       httpLinkOptions: {
  //         credentials: 'same-origin'
  //       },
  //       // You can use `wss` for secure connection (recommended in production)
  //       // Use `null` to disable subscriptions
  //       wsEndpoint: '', // optional
  //       // LocalStorage token
  //       tokenName: 'laadpalen-app', // optional
  //       // Enable Automatic Query persisting with Apollo Engine
  //       persisting: false, // Optional
  //       // Use websockets for everything (no HTTP)
  //       // You need to pass a `wsEndpoint` for this to work
  //       websocketsOnly: false // Optional
  //     },
  //     test: {
  //       httpEndpoint: 'http://localhost:3001',
  //       wsEndpoint: 'ws://localhost:3001',
  //       tokenName: 'laadpalen-app'
  //     }
  //     // alternative: user path to config which returns exact same config options
  //     // test2: '~/plugins/my-alternative-apollo-config.js'
  //   }
  // },

  /*
   ** Build configuration
   */
  build: {
    extend(config) {
      config.plugins = config.plugins.filter(
        plugin => plugin.constructor.name !== 'UglifyJsPlugin'
      )
    }
  }
}
