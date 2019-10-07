<template>
  <div id="client">
    <div class="server-handler">
      <div class="froggins-offline" v-if="!$store.state.server.online">
        You are disconnected from <span id="froggins">Froggins</span>. 🐸💔
      </div>
      <RibbitSocket v-else />
    </div>
    <div class="client-handler" v-if="$store.state.server.online">
      <LayoutMobile
        v-if="$store.state.player.authenticated && window.width < 768"
      />
      <LayoutDesktop
        v-if="$store.state.player.authenticated && window.width >= 768"
      />
      <FrogginsAuth v-if="!$store.state.player.authenticated" />
    </div>
  </div>
</template>

<script>
import RibbitSocket from './components/RibbitSocket.vue'
import LayoutDesktop from './components/LayoutDesktop.vue'
import LayoutMobile from './components/LayoutMobile.vue'
import FrogginsAuth from './components/FrogginsAuth.vue'

export default {
  name: 'Client',
  components: {
    RibbitSocket,
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
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    }
  },
  mounted() {
    this.$options.sockets.onmessage = msg => {
      let data = JSON.parse(msg.data)

      // Ribbit required to detect server status (most important)
      if (!data.type) {
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
html {
  overscroll-behavior: none;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1e2f1e;
  background-color: #b0c1b0;
  line-height: 1.7;
  font-size: 1.1rem;
  height: 100%;
  overflow: hidden;

  body {
    margin: 0;
    overflow: hidden;
  }
}

#froggins {
  font-style: italic;
}

.froggins-offline {
  background-color: #d7e6d7;
  border-radius: 0.4rem;
  width: 70%;
  margin: 15% auto 0;
  padding: 2rem 0;
  border: 2px solid #1d2f1d;
  font-weight: bold;
}
</style>
