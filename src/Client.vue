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
  font-family: 'Patrick Hand', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #1e2f1e;
  background-color: #b0c1b0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%23bdddcc' fill-opacity='0.4' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E");
  line-height: 1.7;
  font-size: 1.1rem;
  overflow: hidden;

  body {
    margin: 0;
  }
}

input,
button {
  height: 2rem;
  font-size: 1.2rem;
  margin-bottom: 0.4rem;
  border: 1px solid #1c2f1c;
  font-family: Courier, monospace;
  transition: 0.3s;
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

  &.yellow {
    background-color: #e0c400;
    box-shadow: inset 0px -1px 1px 0px #b1a026;
    border: 1px solid #867b3a;

    &:hover {
      background-color: #ffe219;
    }

    &:focus {
      background-color: #e2c600;
      box-shadow: inset #b1a026 1px 1px 1px;
    }

    &:active {
      background-color: #e0cb32;
      box-shadow: inset #b1a026 1px 1px 6px 3px;
    }
  }

  &.ok {
    position: absolute;
    right: 1.2rem;
    padding: initial;
    border: none;
    font-size: 1.8rem;
    background: none;

    &:hover {
      transform: rotate(15deg) scale(1, 1.2);
      background: none;
    }
  }
}

h1 {
  user-select: none;
  font-family: 'Fredoka One', Helvetica, Arial, sans-serif;
}

h3 {
  font-weight: normal;
  font-family: 'Fredoka One', Helvetica, Arial, sans-serif;
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

.froggins-header {
  background-color: #d7edd5;
  border-bottom: 2px solid #c2d8c0;
  -webkit-box-shadow: 0px 2px 20px 0px #59925a;
  box-shadow: 0px 2px 20px 0px #657566;
}

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

.text-fade-wrapper {
  position: relative;

  &:after {
    content: '';
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    pointer-events: none;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.8) 100%
    );
    width: 100%;
    height: 30%;
  }
}

// TRANSITION STYLES
.fade-leave-active {
  opacity: 0;
}

.fade-enter .modal,
.fade-leave-active .modal {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
