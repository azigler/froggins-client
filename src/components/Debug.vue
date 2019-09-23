<template>
  <div class="froggins-client">
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
      v-for="player in $store.state.server.connectedPlayers"
      v-bind:key="player"
    >
      {{ player }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Debug',
  methods: {
    // TODO: use Ribbit to send data back to server
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
  }
}
</script>

<style lang="scss">
.froggins-client {
  background-color: #9ad89a;
  border-radius: 1.2rem;
  border: 0.05rem solid #495d49;
  padding: 1.5rem;
  width: 80%;
  margin: 0 auto;
}
</style>
