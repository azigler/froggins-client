import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
      status: 'Attempting connection to Froggins...'
    },
    server: {
      connectedPlayers: [],
      online: false
    },
    player: {
      auth: false,
      isMobile: false,
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
      state.socket.status = '🔌✅ Connected to Froggins!'
    },
    SOCKET_ONCLOSE(state) {
      if (state.socket.isConnected) {
        state.socket.isConnected = false
        state.server.online = false
        state.player.auth = false
        state.socket.status = '🔌❌ Disconnected from Froggins!'
      }
    },
    SOCKET_ONERROR(state, event) {
      state.socket.status = '🔌🚫 Froggins connection error!'
      console.error(state, event)
    },
    SOCKET_RECONNECT(state) {
      state.socket.status = `🔌🔄 Reconnecting to Froggins...`
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.status = '🔌🔄🚫 Froggins reconnection error!'
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
