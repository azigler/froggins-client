<template>
  <div class="froggins-layout">
    <h1>Froggins</h1>
    <PanelDebug v-if="!$store.state.player.authenticated" />
  </div>
</template>

<script>
import PanelDebug from './PanelDebug.vue'

export default {
  name: 'FrogginsLayout',
  components: {
    PanelDebug
  }
}
</script>

<style lang="scss">
.froggins-layout {
  h1 {
    font-size: 2rem;
    margin-top: 0;
    border-bottom: 0.02rem solid #1d2f1d;
    background-color: #d5ecd5;
  }

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
</style>
