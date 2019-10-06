<template>
  <div class="froggins-layout">
    <aside class="sidebar">
      <div class="top">
        <h1>Froggins</h1>
        <div
          :class="`hamburger ${navShow ? 'open' : ''}`"
          @click="navShow = !navShow"
        >
          ☰
        </div>
      </div>
      <nav v-if="navShow">
        <router-link to="/">Home</router-link>
        <router-link to="/debug">Debug</router-link>
      </nav>
      <div class="map">Map or description of area</div>
      <div class="online-bar">
        <span class="time">🕰️ {{ time }}</span>
        <span class="users"
          >👥 {{ $store.state.server.connectedPlayers.length }}</span
        >
      </div>
      <div class="window">
        <div class="tabs">
          <div class="froggins">🦎</div>
          <div class="items">📦</div>
          <div class="structures">🏠</div>
          <div class="world">🌐</div>
          <div class="help">❔</div>
        </div>
        <div class="content">
          ok
        </div>
      </div>
    </aside>
    <div id="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'FrogginsLayout',
  data() {
    return {
      navShow: false,
      time: ''
    }
  },
  mounted() {
    this.updateDateTime()
  },
  methods: {
    updateDateTime: function updateDateTime() {
      this.time = moment().format('hh:mm:ss A')

      setTimeout(this.updateDateTime, 1000)
    }
  }
}
</script>

<style lang="scss">
.froggins-layout {
  display: flex;

  aside.sidebar {
    display: flex;
    flex-direction: column;
    height: 100vh;
    border-right: 2px solid #1d2f1d;
    width: 14rem;

    .top {
      justify-content: space-between;
      display: flex;
      > h1 {
        margin: 0 0.5rem;
        text-align: left;
        user-select: none;

        &::before {
          content: '🐸';
          margin-right: 0.5rem;
        }
      }

      .hamburger {
        margin: 0.55rem 0.5rem 0 0.25rem;
        border: 2px solid #1c2f1c;
        border-radius: 6px;
        padding: 0rem 0.25rem 0.15rem;
        line-height: 1.3;
        height: fit-content;
        background: #dadada;
        box-shadow: 0px 8px 0px 0px #304030;

        &.open {
          margin-top: 1rem;
          box-shadow: 0px -8px 0px 0px #304030;
        }

        &:hover {
          background-color: #6a9a6a;
          cursor: pointer;
        }
      }
    }

    .map {
      border: 2px solid #1c2f1c;
      margin: 0.2rem;
      border-radius: 5px;
      height: 20%;
      justify-content: center;
      display: flex;
      align-items: center;
      margin-bottom: 0;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }

    .online-bar {
      border: 2px solid #1c2f1c;
      margin: 0.2rem;
      margin-top: 0;
      border-radius: 6px;
      border-top: none;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      background: linear-gradient(to right, #95ab95, #e7ffff);
      display: flex;
      justify-content: space-between;
      padding: 0 0.5rem;

      .users {
        font-weight: bold;
      }
    }

    .window {
      .tabs {
        display: flex;
        justify-content: center;
        border: 2px solid #1c2f1c;
        margin: 0 0.2rem;
        border-radius: 5px;
        background-color: gray;

        div {
          border-right: 2px solid #1c2f1c;
          padding: 0 0.4rem 0 0.5rem;
          background-color: #cccc7d;

          &:hover {
            background-color: red;
            cursor: pointer;
          }

          &:first-child {
            border-left: 2px solid #1c2f1c;
          }
        }
      }
    }
  }
  nav {
    padding: 0rem 2rem;
    background-color: #f5f556;
    display: flex;
    justify-content: space-evenly;
    border-bottom: 2px solid #1d2f1d;
    border-top: 2px solid #1d2f1d;

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
