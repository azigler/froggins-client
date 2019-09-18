import Vue from 'vue'
import App from './App.vue'
import VueNativeSock from 'vue-native-websocket'
import store from './store'
import Ribbit from './assets/ribbit'

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

Vue.use(Ribbit)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
