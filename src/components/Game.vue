<template>
  <div id="game">
    <nav v-if="navShow">
      <router-link to="/location">Location</router-link>
      <router-link to="/battle">Battle</router-link>
      <router-link to="/cutscene">Cutscene</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Game',
  data() {
    return {
      navShow: true
    }
  }
}
</script>

<style lang="scss">
#game {
  display: flex;
  flex-direction: column;
  flex: auto;
  background: #9ad89a;
}

main.layout.desktop {
  #game {
    nav {
      padding: 0rem 2rem;
      background-color: #f5f556;
      display: flex;
      height: 2rem;
      justify-content: space-around;
      border-bottom: 2px solid #1c2f1c;

      a {
        background-color: #ecec87;
        padding: 0.35rem 0.7rem 0.5rem;
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
  #game {
    nav {
      margin-top: 0.3rem;
      background-color: #f5f556;
      display: flex;
      justify-content: space-around;
      border-bottom: 2px solid #1d2f1d;
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
