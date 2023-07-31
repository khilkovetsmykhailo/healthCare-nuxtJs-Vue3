// change
export default {
  mode: 'spa',

  head: {
    title: 'Demo Recover | Portal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Client (web) application for Demo Health. Empowered by the Demo Health API. Node.js application hosted on Heroku, leveraging Nuxt and Vue frameworks.',
      },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,700' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
    ],
    script: [
      { src: 'https://media.twiliocdn.com/sdk/js/chat/v3.4/twilio-chat.min.js' },
    ],
  },

  loading: false,

  publicRuntimeConfig: {
    env: process.env.NODE_ENV || 'development',
    apiUrl: process.env.API_URL,
    authCallbackUrl: process.env.AUTH_CALLBACK_URL,
    awsCognitoClientId: process.env.AWS_COGNITO_CLIENT_ID,
    awsCognitoRegion: process.env.AWS_COGNITO_REGION,
    awsCognitoUserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    awsCognitoDomain: process.env.AWS_COGNITO_DOMAIN,
    awsCognitoIdentityPoolId: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
    awsS3Bucket: process.env.AWS_S3_BUCKET,
    awsS3Region: process.env.AWS_S3_REGION,
  },

  css: [
    './assets/scss/app',
  ],

  buildModules: [
    '@nuxtjs/moment',
  ],

  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    'nuxt-fontawesome',
    'nuxt-svg-loader',
    '@nuxtjs/toast', // TODO remove
    'nuxt-clipboard2',
    '@nuxtjs/markdownit', // TODO remove
  ],

  plugins: [
    '~/plugins/amplify',
    '~/plugins/axios',
    '~/plugins/bootstrap-vue',
    '~/plugins/mixins',
    '~/plugins/filters',
    '~/plugins/components',
    '~/plugins/components.server',
    '~/plugins/components.client',
    '~/plugins/event-bus',
    '~/plugins/twilio.client',
  ],

  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas'],
      },
      {
        set: '@fortawesome/free-regular-svg-icons',
        icons: ['far'],
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab'],
      },
    ],
  },

  router: {
    middleware: [
      'auth',
      'currentUser',
      'currentOrganization',
      'getInitialPatients',
      'getStaticData',
      'twilio',
    ],
  },

  axios: {
    baseURL: process.env.API_URL,
  },

  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true,
    use: [
      'markdown-it-div',
      // 'markdown-it-attrs' throwing a syntax error in IE
    ],
  },

  toast: {
    position: 'bottom-center',
    duration: 4000,
  },
}
