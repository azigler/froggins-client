<template>
  <div class="online-players">
    <span class="count" @click="showModal = true">
      👥 {{ $store.state.server.onlinePlayers.length }}
    </span>
    <modal id="online-players" v-if="showModal" @close="showModal = false">
      <h2 slot="header">Online Players</h2>
      <div slot="body">
        <span
          v-show="$store.state.server.online"
          v-for="player in $store.state.server.onlinePlayers"
          v-bind:key="player"
        >
          {{ player }}
        </span>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal.vue'

export default {
  name: 'LayoutOnlinePlayers',
  components: {
    Modal
  },
  data() {
    return {
      showModal: false
    }
  }
}
</script>

<style lang="scss">
.online-players .count {
  color: blue;
  transition: all 2s ease-out;

  &:hover {
    cursor: pointer;
    color: red;
    font-size: 110%;
  }
}
</style>
