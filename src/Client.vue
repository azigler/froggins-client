<template>
  <div id="client">
    <div class="server-handler">
      <div class="message-box disconnected" v-if="!$store.state.server.online">
        You are disconnected from Froggins. 🐸💔
      </div>
      <FrogginsWebSocket v-else />
    </div>
    <div class="client-handler" v-if="$store.state.server.online">
      <LayoutMobile v-if="$store.state.player.auth && window.width < 768" />
      <LayoutDesktop v-if="$store.state.player.auth && window.width >= 768" />
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
html {
  overscroll-behavior: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #1e2f1e;
  background-color: #b0c1b0;
  line-height: 1.7;
  font-size: 1.1rem;
  overflow: hidden;

  body {
    margin: 0;

    input,
    button {
      height: 2rem;
      font-size: 1.2rem;
      margin-bottom: 0.4rem;
      border: 1px solid #1c2f1c;
    }

    input {
      border-radius: 0.2rem;

      &:focus {
        outline: none;
        background-color: #bae8b9;
      }
    }

    button {
      border-radius: 0.5rem;
      background-color: #68a268;
      color: white;
      font-weight: bold;
      box-shadow: inset 0px -1px 1px 0px #0e3e0e;
      text-shadow: 0px 1px 1px #1c301c;

      &:hover {
        background-color: #69cc69;
        cursor: pointer;
      }

      &:focus {
        outline: none;
        background-color: #589058;
        box-shadow: inset #467245 1px 1px 1px;
      }

      &:active {
        outline: none;
        background-color: #589058;
        box-shadow: inset #467245 1px 1px 6px 3px;
      }
    }
  }
}

.message-box {
  background-color: #d7e6d7;
  border-radius: 0.4rem;
  width: 70%;
  margin: 15% auto 0;
  padding: 2rem 0;
  border: 2px solid #1d2f1d;
  font-weight: bold;
}
</style>
