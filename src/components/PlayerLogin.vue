<template>
  <div class="player-login">
    <button @click="authenticatePlayer()">LOG IN</button>
  </div>
</template>

<script>
export default {
  name: 'PlayerLogin',
  methods: {
    authenticatePlayer() {
      this.$store.commit('SET_PLAYER', { authenticated: true })
    }
  }
}
</script>
