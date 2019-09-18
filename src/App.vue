<template>
  <div id="app">
    <Debug />
  </div>
</template>

<script>
import Debug from './components/Debug.vue'

export default {
  name: 'app',
  components: {
    Debug
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
