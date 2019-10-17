<template>
  <div id="client">
    <div class="server-handler">
      <div class="mask" v-if="!$store.state.server.online">
        <div id="socket-status" class="modal">
          {{ $store.state.socket.status }}
          <div>
            <span class="glow green">🐸</span><span class="glow red">❤️</span>
          </div>
        </div>
      </div>
      <FrogginsWebSocket v-else />
    </div>
    <div class="client-handler" v-if="$store.state.server.online">
      <LayoutMobile
        v-if="$store.state.player.auth && $store.state.player.isMobile"
      />
      <LayoutDesktop
        v-if="$store.state.player.auth && !$store.state.player.isMobile"
      />
      <FrogginsAuth v-if="!$store.state.player.auth" />
    </div>
  </div>
</template>

<script>
import FrogginsWebSocket from './components/FrogginsWebSocket.vue'
import LayoutDesktop from './components/LayoutDesktop.vue'
import LayoutMobile from './components/LayoutMobile.vue'
import FrogginsAuth from './components/FrogginsAuth.vue'

export default {
  name: 'Client',
  components: {
    FrogginsWebSocket,
    LayoutDesktop,
    LayoutMobile,
    FrogginsAuth
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0
      }
    }
  },
  created() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
      this.$store.commit('SET_PLAYER', {
        isMobile: this.window.width < 768 ? true : false
      })
    }
  },
  mounted() {
    this.$options.sockets.onmessage = msg => {
      let data = JSON.parse(msg.data)

      if (data.type === 'server-status') {
        switch (data.id) {
          case 'server.online': {
            return this.$store.commit('SET_SERVER', { online: data.value })
          }
        }
      }
    }
  },
  destroyed() {
    delete this.$options.sockets.onmessage
  }
}
</script>

<style lang="scss">
@import '@/styles/froggins.scss';

.client-handler main.layout {
  width: 100%;
  height: 100%;
  position: absolute;
}

#socket-status.modal {
  background-color: #d7e6d7;
  border: 2px solid #1d2f1d;
  font-weight: bold;
  text-align: center;
  margin-top: -20vh;
  min-width: 25%;
  user-select: none;

  div {
    font-size: 1.7rem;
    user-select: none;
  }
}
</style>
