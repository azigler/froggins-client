<template>
  <div class="debug">
    <div>
      <button @click="clickButton()">Click Me!</button>
      <span> {{ $store.state.player.uuid }} </span>
      <span>Clicks: {{ $store.state.debug.clicks }}</span>
    </div>
    <button @click="removeHandler()">remove debug() handler</button>
    <button @click="addHandler()">add debug() handler</button>
    <div>Players:</div>
    <span
      v-show="$store.state.server.online"
      v-for="player in $store.state.server.onlinePlayers"
      v-bind:key="player"
    >
      {{ player }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'LocationDebug',
  methods: {
    clickButton() {
      this.ribbitSend({
        text: 'someone clicked a button',
        handler: 'debug',
        id: 'incrementClicks'
      })
    },
    removeHandler() {
      this.ribbitSend({
        type: 'remove-handler',
        id: 'debug'
      })
    },
    addHandler() {
      this.ribbitSend({
        type: 'add-handler',
        id: 'debug'
      })
    }
  },
  mounted() {
    this.ribbitSend({
      type: 'add-handler',
      id: 'debug'
    })
  },
  destroyed() {
    this.ribbitSend({
      type: 'remove-handler',
      id: 'debug'
    })
  }
}
</script>

<style lang="scss">
.debug {
  padding: 1.5rem;
  background: #9ad89a;
}
</style>
