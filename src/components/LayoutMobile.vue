<template>
  <main class="layout mobile">
    <header class="froggins-header">
      <h1>Froggins</h1>
      <span class="time">
        {{ timeOfDay === 'night' ? '🌙' : '☀️' }}
        {{ timeOfDay.capitalize() }}
      </span>
      <span class="users">
        👥 {{ $store.state.server.connectedPlayers.length }}
      </span>
    </header>
    <div class="tabs">
      <div
        @click="panelTab = 'PanelFroggins'"
        :class="`froggins ${panelTab === 'PanelFroggins' ? 'selected' : ''}`"
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
        :class="`froggins ${panelTab === 'PanelStructures' ? 'selected' : ''}`"
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
      <div
        @click="panelTab = 'play'"
        :class="`froggins ${panelTab === 'play' ? 'selected' : ''}`"
      >
        🕹️
      </div>
    </div>
    <component v-if="panelTab !== 'play'" :is="panelTab" />
    <router-view v-if="panelTab === 'play'" class="panel" />
    <nav v-if="panelTab === 'XXXXplay'">
      <router-link to="/">Home</router-link>
      <router-link to="/debug">Debug</router-link>
    </nav>
    <div v-if="panelTab === 'play'" :class="`location ${timeOfDay}`">
      <span class="name">{{ locationName }}</span>
      <img :src="locationImage" class="black" />
    </div>
    <footer>
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
    </footer>
  </main>
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
    console.log('created mobile')
    this.$store.commit('SET_PLAYER', {
      isMobile: true
    })
  },
  destroyed() {
    console.log('destroyed mobile')
  },
  data() {
    return {
      navShow: true,
      hideSidebar: false,
      locationImage: '/assets/location-swamp.png',
      time: '',
      panelTab: 'play',
      timeOfDay: 'start',
      locationName: 'deep in the swamplands'
    }
  },
  mounted() {
    this.updateDateTime()
  },
  methods: {
    updateDateTime: function updateDateTime() {
      this.time = moment()
      setTimeout(this.updateDateTime, 1000)
    }
  }
}
</script>

<style lang="scss">
.layout.mobile {
  display: flex;
  flex-direction: column;
  height: 80vh;
  position: relative;
  background-color: #b0c1b0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%23bdddcc' fill-opacity='0.4' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E");

  header {
    display: flex;
    justify-content: space-around;
    height: 5%;
    min-height: 1.5rem;
    align-items: center;

    h1 {
      margin: 0;
      font-size: 1rem;

      &:before {
        content: '🐸';
      }
    }
  }

  .tabs {
    display: flex;
    justify-content: center;
    background-color: gray;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    height: 5%;
    min-height: 2rem;

    div {
      border-right: 2px solid #1c2f1c;
      padding: 0 0.4rem 0 0.5rem;
      background-color: #cccc7d;
      display: flex;
      align-self: center;
      line-height: 2;
      height: 100%;
      align-items: center;

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

  .location {
    border: 2px solid #1c2f1c;
    margin: 0.2rem;
    border-radius: 5px;
    margin-bottom: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    user-select: none;
    position: absolute;
    bottom: 0;
    left: 2vw;
    height: 11.364rem;
    transition: margin 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    margin: -6rem 1.25rem;
    z-index: 2;

    &:hover {
      opacity: 1;
      margin: 0 1.25rem;
    }

    &:not(:hover):before {
      content: 'tap!';
      position: absolute;
      right: 0;
      top: 0;
      transform: rotate(25deg);
      z-index: 2;
      font-weight: bold;
      background-color: white;
      border-radius: 18px;
      border: 1px dashed;
      color: #ad5094;
      text-shadow: #f5f556 0px 1px 10px;
    }

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

  .panel {
    border-top: none;
    height: 80%;
    background-color: green;
  }

  nav {
    padding: 0rem 2rem;
    background-color: #f5f556;
    display: flex;
    justify-content: space-around;
    border-bottom: 2px solid #1d2f1d;
    margin: 0 0.2rem;
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

  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: flex-end;

    &:after {
      content: '';
      position: absolute;
      background-color: #b4cbba;
      width: 100vw;
      left: 0;
      height: 100%;
      z-index: 0;
      border-top: 1px solid #1d2f1d;
    }

    span {
      font-size: 11px;
      margin-top: 0rem;
      color: #414a73;
      text-shadow: #7289d8 0px 0px 13px;
      z-index: 1;
      margin-top: -0.3rem;
    }

    .discord {
      height: 3.2rem;
      align-items: center;
      display: flex;
      justify-content: flex-end;
      z-index: 1;
      margin-top: 0.2rem;

      a {
        height: 100%;
        max-height: 2rem;
        width: 6rem;
        border-radius: 0.4rem;
        margin: 0 0.2rem;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-image: url('https://discordapp.com/assets/192cb9459cbc0f9e73e2591b700f1857.svg');
        position: relative;
      }
    }
  }
}
</style>
