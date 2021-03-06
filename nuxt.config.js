import path from 'path'
import fs from 'fs'

const axiosCallURLs = {
  baseURL: 'https://ec2-18-191-146-196.us-east-2.compute.amazonaws.com:4000',
}

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  server: {
    port: 443,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'sslcert/server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'sslcert/server.crt')),
    },
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'SVstartup',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      {
        http_equiv: 'Content-Security-Policy',
        content: 'upgrade-insecure-requests',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['vue-snotify/styles/material.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios',
    '~/plugins/vee-validate.js',
    '~/plugins/vue-toast-notification.js',
    {
      src: '~/plugins/vue-snotify',
      ssr: false,
    },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: axiosCallURLs.baseURL,
    credentials: false,
    proxyHeaders: false,
  },

  auth: {
    localStorage: false,
    cookie: {
      options: {
        expires: 7,
      },
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/token', method: 'post', propertyName: false },
          logout: false,
          user: { url: '/users/me', method: 'get', propertyName: false },
        },
      },
    },
    plugins: [
      '~/plugins/axios.js',
      { src: '~/plugins/auth.js', mode: 'client' },
      { src: '~/plugins/persistedState.client.js' },
    ],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
