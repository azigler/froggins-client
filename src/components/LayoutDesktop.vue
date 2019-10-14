<template>
  <div class="layout desktop">
    <aside :class="`sidebar ${hideSidebar ? 'hidden' : ''}`">
      <header class="froggins-header">
        <h1>Froggins</h1>
        <div
          class="toggle-hide"
          @click="hideSidebar = !hideSidebar"
          :class="`${hideSidebar ? 'hidden' : ''}`"
        >
          ◀️
        </div>
      </header>
      <div :class="`location ${timeOfDay}`">
        <span class="name">{{ locationName }}</span>
        <img :src="locationImage" class="black" />
      </div>
      <div class="status-bar">
        <span class="time">
          {{ timeOfDay === 'night' ? '🌙' : '☀️' }}
          {{ timeOfDay.capitalize() }}
        </span>
        <span class="users"
          >👥 {{ $store.state.server.connectedPlayers.length }}</span
        >
      </div>
      <div class="panel-container">
        <div class="tabs">
          <div
            @click="panelTab = 'PanelFroggins'"
            :class="
              `tab froggins ${panelTab === 'PanelFroggins' ? 'selected' : ''}`
            "
          >
            🦎
          </div>
          <div
            @click="panelTab = 'PanelItems'"
            :class="`tab items ${panelTab === 'PanelItems' ? 'selected' : ''}`"
          >
            📦
          </div>
          <div
            @click="panelTab = 'PanelStructures'"
            :class="
              `tab structures ${
                panelTab === 'PanelStructures' ? 'selected' : ''
              }`
            "
          >
            🏠
          </div>
          <div
            @click="panelTab = 'PanelWorld'"
            :class="`tab world ${panelTab === 'PanelWorld' ? 'selected' : ''}`"
          >
            🌐
          </div>
          <div
            @click="panelTab = 'PanelHelp'"
            :class="`tab help ${panelTab === 'PanelHelp' ? 'selected' : ''}`"
          >
            ❔
          </div>
        </div>
        <component :is="panelTab" class="content" />
        <div class="discord">
          <a
            class="purple button"
            target="_blank"
            href="https://discord.gg/QscwwBH"
          />
        </div>
        <span class="copyright">
          © 2019
          <a target="_blank" href="https://www.andrewzigler.com/">
            Andrew Zigler
          </a>
        </span>
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
  watch: {
    time(newTime, oldTime) {
      if (oldTime === '' || newTime.hours() !== oldTime.hours()) {
        if (newTime.hours() >= 5 || newTime.hours() < 7) {
          this.timeOfDay = 'dawn'
        }
        if (newTime.hours() >= 7 && newTime.hours() < 12) {
          this.timeOfDay = 'morning'
        }
        if (newTime.hours() >= 11 && newTime.hours() < 13) {
          this.timeOfDay = 'noon'
        }
        if (newTime.hours() >= 13 && newTime.hours() < 17) {
          this.timeOfDay = 'afternoon'
        }
        if (newTime.hours() >= 17 && newTime.hours() < 19) {
          this.timeOfDay = 'dusk'
        }
        if (newTime.hours() >= 19 || newTime.hours() < 6) {
          this.timeOfDay = 'night'
        }
      }
    }
  },
  created() {
    console.log('created desktop')
    this.$store.commit('SET_PLAYER', {
      isMobile: false
    })
    window.addEventListener('keypress', e => {
      if (
        e.key === '`' &&
        window.document.activeElement.tagName !== 'INPUT' &&
        window.document.activeElement.tagName !== 'TEXTAREA'
      )
        this.hideSidebar = !this.hideSidebar
    })
  },
  destroyed() {
    console.log('destroyed desktop')
  },
  data() {
    return {
      navShow: true,
      hideSidebar: false,
      locationImage: '/assets/location-swamp.png',
      time: '',
      panelTab: 'PanelFroggins',
      timeOfDay: 'start',
      locationName: 'deep in the swamplands'
    }
  },
  mounted() {
    this.updateDateTime()
  },
  methods: {
    updateDateTime() {
      this.time = moment()
      setTimeout(this.updateDateTime, 1000 * 60)
    }
  }
}
</script>

<style lang="scss">
.layout.desktop {
  display: flex;
  overflow: hidden;
  background-color: #b0c1b0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%23bdddcc' fill-opacity='0.4' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E");

  aside.sidebar {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 12rem;
    border-right: 2px solid #1d2f1d;
    transition: margin 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: #b4cbba;

    &.hidden {
      margin-left: -9.5rem;
    }

    header {
      position: relative;
      min-height: 2.6rem;

      > h1 {
        margin: 0 0.5rem;
        text-align: left;
        font-size: 1.5rem;

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
        right: -6px;
        top: -6px;
        user-select: none;
        text-align: center;
        transition: 0.5s;
        transform: scale(1.1, 1);

        &:hover,
        &.hidden {
          cursor: pointer;
          text-shadow: 0px 0px 9px #254c71;
        }

        &.hidden {
          transform: scale(-1.1, 1);
        }
      }
    }

    .location {
      border: 2px solid #1c2f1c;
      margin: 0.2rem;
      border-radius: 5px;
      margin-bottom: 0;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      user-select: none;
      position: relative;
      height: 11.364rem;

      &.dawn,
      &.morning,
      &.noon,
      &.afternoon,
      &.dusk {
        .name {
          background-color: rgba(215, 236, 213, 0.8);
          color: #1c2f1c;
        }
      }

      &.dawn img {
        filter: saturate(0.8) brightness(0.8);
      }

      &.noon img {
        filter: saturate(1) brightness(1.2);
      }

      &.dusk img {
        filter: saturate(2) brightness(0.8);
      }

      &.night img {
        filter: saturate(0.5) brightness(0.3);
      }

      &.start img {
        &.black {
          filter: saturate(1) brightness(0);
        }
      }

      .name {
        transition: all 10s ease-out;
      }

      img {
        transition: filter 10s ease-out;
        image-rendering: pixelated;
      }

      .name {
        width: 100%;
        height: 1.2rem;
        border-bottom: dotted #1b2f1b 1px;
        line-height: 1.1;
        z-index: 1;
        position: absolute;
        left: 0;
        color: #b1c9db;
        background-color: rgba(215, 236, 213, 0.3);
      }
    }

    .status-bar {
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
      user-select: none;
      min-height: 1.7rem;

      .users {
        font-weight: bold;
      }
    }

    .panel-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      margin-bottom: 8vh;
    }

    .tabs {
      display: flex;
      justify-content: space-between;
      border: 2px solid #1c2f1c;
      margin: 0 0.2rem;
      border-radius: 5px;
      background-color: #1c2f1c;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      min-height: 1.8rem;

      .tab {
        border-radius: 5px;
        padding: 0 0.4rem 0 0.5rem;
        background-color: #cccc7d;

        &:hover,
        &.selected {
          background-color: red;
          cursor: pointer;
        }
      }
    }

    .panel {
      background-color: #9ad89a;
      border: 2px solid #495d49;
      padding: 0.5rem;
      margin: 0 0.2rem;
      border-top: none;
      height: 100%;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    .discord {
      height: 3.2rem;
      align-items: center;
      display: flex;
      justify-content: center;
      min-height: 5%;

      a {
        height: 75%;
        max-height: 75%;
        width: 50%;
        border-radius: 0.4rem;
        margin: 0 0.2rem;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-image: url('https://discordapp.com/assets/192cb9459cbc0f9e73e2591b700f1857.svg');
        position: relative;
      }
    }
  }

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

  span.copyright {
    font-size: 0.8rem;
    margin-top: -0.4rem;
    margin-bottom: 0.4rem;
    color: #414a73;
    text-shadow: #7289d8 0px 0px 13px;
  }
}
</style>
