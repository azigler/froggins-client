<template>
  <div class="game-container">
    <nav v-if="navShow">
      <router-link to="/">Home</router-link>
      <router-link to="/debug">Debug</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'GameContainer',
  data() {
    return {
      navShow: true
    }
  }
}
</script>

<style lang="scss">
.game-container {
  border-top: none;
  flex: auto;
}

main.layout.desktop {
  .game-container {
    flex: auto;

    nav {
      padding: 0rem 2rem;
      background-color: #f5f556;
      display: flex;
      justify-content: space-around;
      border-bottom: 2px solid #1d2f1d;

      a {
        background-color: #ecec87;
        padding: 0.7rem 0.5rem;
        color: #464622;
        text-transform: uppercase;
        text-decoration: none;
        font-weight: bold;
        font-size: 0.8rem;
        border: 2px solid #1d2f1d;
        border-top: none;
        border-bottom: none;

        &:hover {
          background-color: #f3f3a0;
          color: #327132;
          box-shadow: inset green 0px 0px 5px 0px;
        }
      }
    }
  }
}

main.layout.mobile {
  .game-container {
    flex: auto;

    nav {
      padding: 0rem 2rem;
      background-color: #f5f556;
      display: flex;
      justify-content: space-around;
      border-bottom: 2px solid #1d2f1d;
      border: 2px solid #1c311c;
      border-top: none;
      height: 5%;

      a {
        background-color: #ecec87;
        padding: 5px 10px;
        color: #464622;
        text-transform: uppercase;
        text-decoration: none;
        font-weight: bold;
        font-size: 0.8rem;
        border: 2px solid #1d2f1d;
        border-top: none;
        border-bottom: none;

        &:hover {
          background-color: #f3f3a0;
          color: #327132;
          box-shadow: inset green 0px 0px 5px 0px;
        }
      }
    }
  }
}
</style>
