<template>
  <div id="client">
    <div class="server-handler">
      <div class="message-box disconnected" v-if="!$store.state.server.online">
        You are disconnected from Froggins. 🐸💔
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

// HOIST
.message-box {
  background-color: #d7e6d7;
  border-radius: 0.4rem;
  width: 70%;
  margin: 15% auto 0;
  padding: 2rem 0;
  border: 2px solid #1d2f1d;
  font-weight: bold;
  text-align: center;
}

// HOIST
.froggins-header {
  background-color: #d7edd5;
  border-bottom: 2px solid #c2d8c0;
  -webkit-box-shadow: 0px 2px 20px 0px #59925a;
  box-shadow: 0px 2px 20px 0px #657566;
}

// HOIST
.mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}

// HOIST
.text-fade-wrapper {
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    pointer-events: none;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.8) 100%
    );
    width: 100%;
    height: 1rem;
  }
}
</style>
