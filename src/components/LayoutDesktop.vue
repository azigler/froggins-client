<template>
  <div class="layout desktop">
    <aside :class="`sidebar ${hideSidebar ? 'hidden' : ''}`">
      <div class="top froggins-header">
        <h1>Froggins</h1>
        <div
          class="toggle-hide"
          @click="hideSidebar = !hideSidebar"
          :class="`${hideSidebar ? 'hidden' : ''}`"
        >
          ◀️
        </div>
      </div>
      <div class="map">Map or description of area</div>
      <div class="online-bar">
        <span class="time">🕰️ {{ time }}</span>
        <span class="users"
          >👥 {{ $store.state.server.connectedPlayers.length }}</span
        >
      </div>
      <div class="bottom">
        <div class="panels">
          <div class="tabs">
            <div
              @click="panelTab = 'PanelFroggins'"
              :class="
                `froggins ${panelTab === 'PanelFroggins' ? 'selected' : ''}`
              "
            >
              🦎
            </div>
            <div
              @click="panelTab = 'PanelItems'"
              :class="`froggins ${panelTab === 'PanelItems' ? 'selected' : ''}`"
            >
              📦
            </div>
            <div
              @click="panelTab = 'PanelStructures'"
              :class="
                `froggins ${panelTab === 'PanelStructures' ? 'selected' : ''}`
              "
            >
              🏠
            </div>
            <div
              @click="panelTab = 'PanelWorld'"
              :class="`froggins ${panelTab === 'PanelWorld' ? 'selected' : ''}`"
            >
              🌐
            </div>
            <div
              @click="panelTab = 'PanelHelp'"
              :class="`froggins ${panelTab === 'PanelHelp' ? 'selected' : ''}`"
            >
              ❔
            </div>
          </div>
          <component :is="panelTab" class="content" />
        </div>
        <div class="discord">
          <a href="https://discord.gg/QscwwBH">CHAT ON DISCORD</a>
        </div>
      </div>
    </aside>
    <div id="main">
      <nav v-if="navShow">
        <router-link to="/">Home</router-link>
        <router-link to="/debug">Debug</router-link>
      </nav>
      <router-view />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import PanelFroggins from './PanelFroggins'
import PanelItems from './PanelItems'
import PanelStructures from './PanelStructures'
import PanelWorld from './PanelWorld'
import PanelHelp from './PanelHelp'

export default {
  name: 'LayoutDesktop',
  components: {
    PanelFroggins,
    PanelItems,
    PanelStructures,
    PanelWorld,
    PanelHelp
  },
  created() {
    console.log('created desktop')
  },
  destroyed() {
    console.log('destroyed desktop')
  },
  data() {
    return {
      navShow: true,
      hideSidebar: false,
      time: '',
      panelTab: 'PanelFroggins'
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
.layout.desktop {
  display: flex;
  overflow: hidden;

  aside.sidebar {
    display: flex;
    flex-direction: column;
    height: 100vh;
    border-right: 2px solid #1d2f1d;
    transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    &.hidden {
      margin-left: -9.5rem;
    }

    .top {
      position: relative;

      > h1 {
        margin: 0 0.5rem;
        text-align: left;

        &:before {
          content: '🐸';
        }
      }

      .toggle-hide {
        font-size: 1.2rem;
        margin: 0.55rem 0.5rem 0 0.25rem;
        padding: 0.15rem 0.25rem;
        transition: 0.3s;
        position: absolute;
        right: 0;
        top: -6px;
        user-select: none;
        text-align: center;
        transition: 0.5s;

        &:hover,
        &.hidden {
          cursor: pointer;
          text-shadow: 0px 0px 9px #254c71;
        }

        &.hidden {
          transform: scale(-1, 1);
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

    .bottom {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      height: inherit;

      .panels {
        height: 90%;
      }

      .tabs {
        display: flex;
        justify-content: center;
        border: 2px solid #1c2f1c;
        margin: 0 0.2rem;
        border-radius: 5px;
        background-color: gray;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        div {
          border-right: 2px solid #1c2f1c;
          padding: 0 0.4rem 0 0.5rem;
          background-color: #cccc7d;

          &:hover,
          &.selected {
            background-color: red;
            cursor: pointer;
          }

          &:first-child {
            border-left: 2px solid #1c2f1c;
          }
        }
      }

      .panel {
        background-color: #9ad89a;
        border: 2px solid #495d49;
        padding: 0.5rem;
        margin: 0 0.2rem;
        border-top: none;
        height: inherit;
      }
    }
  }
  nav {
    padding: 0rem 2rem;
    background-color: #f5f556;
    display: flex;
    justify-content: space-evenly;
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

  div#main {
    flex: auto;
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
