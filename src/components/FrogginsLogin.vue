<template>
  <div class="froggins-login">
    <button @click="authenticatePlayer()">LOG IN</button>
  </div>
</template>

<script>
export default {
  name: 'FrogginsLogin',
  methods: {
    authenticatePlayer() {
      this.$store.commit('SET_PLAYER', { authenticated: true })
    }
  }
}
</script>
