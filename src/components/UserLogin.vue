<template>
  <div class="user-login">
    <button @click="authenticateUser()">LOG IN</button>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  methods: {
    authenticateUser() {
      this.$store.commit('AUTHENTICATE_USER')
    }
  }
}
</script>
