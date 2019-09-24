import Vue from 'vue'
import Client from './Client.vue'
import VueNativeSock from 'vue-native-websocket'
import store from './store'
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
    reconnectionDelay: 3 * 1000,
    store
  }
)

new Vue({
  store,
  render: h => h(Client)
}).$mount('#client')
