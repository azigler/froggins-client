import Vue from 'vue'
import FrogginsClient from './FrogginsClient.vue'
import VueNativeSock from 'vue-native-websocket'
import store from './store'

Vue.config.productionTip = false

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
  render: h => h(FrogginsClient)
}).$mount('#app')
