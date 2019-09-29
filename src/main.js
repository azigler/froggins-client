import Vue from 'vue'
import VueRouter from 'vue-router'
import Client from './Client.vue'
import VueNativeSock from 'vue-native-websocket'
import store from './store'
import routes from './routes.js'
import moment from 'moment'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    ribbitSend: function(message) {
      const data = {
        timestamp: moment().format(),
        ...message
      }
      this.$socket.sendObj(data)
      if (process.env.NODE_ENV === 'development') {
        console.log('🐸⬆ Ribbit sent:', message)
      }
    }
  }
})

Vue.use(
  VueNativeSock,
  `ws://${process.env.VUE_APP_WEBSOCKET_URL}:${process.env.VUE_APP_WEBSOCKET_PORT}`,
  {
    format: 'json',
    reconnection: true,
    reconnectionAttempts: 1 * 100,
    reconnectionDelay: 1 * 1000,
    store
  }
)

Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: 'abstract'
})

router.beforeEach((to, from, next) => {
  if (store.state.player.authenticated) {
    console.log('authenticated, proceeding...')
    next()
  } else {
    console.log('unauthenticated, redirecting to home')
    router.push('/')
  }
})

new Vue({
  store,
  router,
  render: h => h(Client)
}).$mount('#client')
