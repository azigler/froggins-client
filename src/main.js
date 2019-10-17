import Vue from 'vue'
import VueRouter from 'vue-router'
import Client from './Client.vue'
import VueNativeSock from 'vue-native-websocket'
import store from './store'
import routes from './routes.js'
import moment from 'moment'

Vue.config.productionTip = false

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

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
    },
    validate: function({ label, field, length = false, alphanumeric = false }) {
      if (field.length === 0) {
        return `No ${label} was provided.`
      }

      if (length !== false && field.length < length) {
        return `${label.capitalize()} is not long enough.`
      }

      if (alphanumeric && /^[a-zA-Z0-9]+$/.test(field) === false) {
        return `${label.capitalize()} contains invalid characters.`
      } else {
        return true
      }
    }
  }
})

const isLAN = window.location.hostname.includes('192.168.')
  ? 'mud.andrewzigler.com'
  : false

Vue.use(
  VueNativeSock,
  `ws${process.env.NODE_ENV === 'development' && !isLAN ? '' : 's'}://${
    isLAN ? isLAN : process.env.VUE_APP_WEBSOCKET_URL
  }:${process.env.VUE_APP_WEBSOCKET_PORT}`,
  {
    format: 'json',
    reconnection: true,
    reconnectionAttempts:
      1 * (process.env.NODE_ENV === 'development' ? 100 : 2),
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
  if (store.state.player.auth) {
    next()
  } else {
    router.push('/')
  }
})

new Vue({
  store,
  router,
  render: h => h(Client)
}).$mount('#client')
