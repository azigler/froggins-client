import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false
    },
    server: {
      connectedPlayers: [],
      online: false
    },
    player: {
      auth: false,
      uuid: ''
    },
    debug: {
      clicks: 0
    }
  },
  mutations: {
    // WEBSOCKETS
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
      console.log('🔌✅ WebSocket connected!')
    },
    SOCKET_ONCLOSE(state) {
      if (state.socket.isConnected) {
        state.socket.isConnected = false
        state.server.online = false
        state.player.auth = false
        console.log('🔌❌ WebSocket disconnected!')
      }
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
    SOCKET_ONMESSAGE(state, message) {
      state.socket.message = message
      if (process.env.NODE_ENV === 'development') {
        console.log('🐸⬇ Ribbit received:', JSON.parse(JSON.stringify(message)))
      }
    },

    // FROGGINS
    SET_SERVER(state, server) {
      state.server = { ...state.server, ...server }
    },
    SET_PLAYER(state, player) {
      state.player = { ...state.player, ...player }
    },
    SET_DEBUG(state, debug) {
      state.debug = { ...state.debug, ...debug }
    }
  }
})
