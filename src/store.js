import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Ribbit from '/Users/andrew/Projects/froggins-server/ribbit/ribbit.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false
    },
    debug: {
      clicks: 0
    }
  },
  mutations: {
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
      console.log('🔌✅ WebSocket connected!')
    },
    SOCKET_ONCLOSE(state) {
      if (state.socket.isConnected) {
        console.log('🔌❌ WebSocket disconnected!')
      }
      state.socket.isConnected = false
    },
    SOCKET_ONERROR(state, event) {
      console.log('🔌🚫 WebSocket error!')
      console.error(state, event)
    },
    SOCKET_RECONNECT(state, count) {
      console.log(`🔌🔄 (${count}) Reconnecting to WebSocket...`)
    },
    SOCKET_RECONNECT_ERROR(state) {
      console.log('🔌🔄🚫 WebSocket reconnection error!')
      state.socket.reconnectError = true
    },

    // TODO: use Ribbit to interpret message
    SOCKET_ONMESSAGE(state, message) {
      console.log('🔌📝 WebSocket message received!')
      state.socket.message = message
      Ribbit.debug()
    },

    // TODO: use Ribbit to send data back to server
    SET_CLICKS(state, message) {
      state.debug.clicks = message
    }
  },
  plugins: [
    createPersistedState({
      key: 'froggins'
    })
  ]
})
