<template>
  <div class="froggins-layout">
    <header>
      <h1 id="froggins">Froggins</h1>
    </header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/debug">Debug</router-link>
    </nav>
    <div id="main">
      <router-view />
    </div>
    <footer>
      <span>Example</span>
      <span>Example2</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FrogginsLayout'
}
</script>

<style lang="scss">
.froggins-layout {
  header {
    margin-top: 0;
    background-color: #d5ecd5;

    h1#froggins {
      font-size: 2rem;
      margin: 0;
      user-select: none;
    }
  }

  nav {
    padding: 0rem 2rem;
    background-color: #f5f556;
    display: flex;
    justify-content: space-evenly;
    border: 1px solid #1d2f1d;
    border-left: none;
    border-right: none;

    a {
      background-color: #ecec87;
      padding: 0.7rem 0.5rem;
      color: #464622;
      text-transform: uppercase;
      text-decoration: none;
      font-weight: bold;
      font-size: 0.8rem;
      border: 1px solid #1d2f1d;
      border-top: none;
      border-bottom: none;
      border-radius: 3px;

      &:hover {
        background-color: #f3f3a0;
        color: #327132;
        box-shadow: inset green 0px 0px 5px 0px;
      }
    }
  }

  div#main {
    margin-top: 1rem;
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
