<template>
  <div id="app">
    <h1>Froggins</h1>
    <div class="server-handler">
      <div class="froggins-offline" v-if="!$store.state.server.online">
        Froggins is offline.
      </div>
      <RibbitSocket v-else />
    </div>
    <div class="client-handler" v-if="$store.state.server.online">
      <Debug v-if="$store.state.player.authenticated" />
      <PlayerLogin v-else />
    </div>
  </div>
</template>

<script>
import RibbitSocket from './components/RibbitSocket.vue'
import Debug from './components/Debug.vue'
import PlayerLogin from './components/PlayerLogin.vue'

export default {
  name: 'App',
  components: {
    RibbitSocket,
    Debug,
    PlayerLogin
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
  overflow: auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1e2f1e;
  background-color: #b0c1b0;
  line-height: 1.7;
  font-size: 1.1rem;

  body {
    margin: 0;
  }

  button {
    padding: 0.5rem;
    border-radius: 0.4rem;
    font-size: 0.8rem;
    background-color: #344434;
    color: white;
    font-weight: bold;

    &:hover {
      background-color: #567b56;
      cursor: pointer;
      font-style: italic;
    }
  }
}

#app > h1 {
  font-size: 2rem;
  margin-top: 0;
  border-bottom: 0.02rem solid #1d2f1d;
  background-color: #d5ecd5;
}

.froggins-offline {
  background-color: #d7e6d7;
  border-radius: 0.4rem;
  width: 50%;
  margin: 0 auto;

  &::before {
    content: '🐸💔';
  }
}
</style>
