<template>
  <div id="app" class="froggins-client">
    <h1 id="froggins-title">Froggins</h1>
    <ConnectionHandler />
    <Frogginville />
  </div>
</template>

<script>
import ConnectionHandler from './components/ConnectionHandler.vue'
import Frogginville from './components/Frogginville.vue'

export default {
  name: 'FrogginsClient',
  components: {
    ConnectionHandler,
    Frogginville
  }
}
</script>

<style lang="scss">
html {
  overscroll-behavior: none;
  overflow: auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1e2f1e;
  background-color: #b0c1b0;
  line-height: 1.7;
  font-size: 1.1rem;

  button {
    padding: 0.5rem;
    border-radius: 0.4rem;
    font-size: 0.8rem;
    background-color: #344434;
    color: white;
    font-weight: bold;

    &:hover {
      background-color: #567b56;
      cursor: pointer;
      font-style: italic;
    }
  }
}

#app > h1 {
  font-size: 2rem;
}
</style>
