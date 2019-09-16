<template>
  <div id="app">
    <WebSocketExample />
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
</template>

<script>
import WebSocketExample from './components/WebSocketExample.vue'

export default {
  name: 'app',
  components: {
    WebSocketExample
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
