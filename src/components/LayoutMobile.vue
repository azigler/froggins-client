<template>
  <main class="layout mobile">
    <h1>Froggins</h1>
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
    <nav v-if="panelTab === 'play'">
      <router-link to="/">Home</router-link>
      <router-link to="/debug">Debug</router-link>
    </nav>
    <router-view v-if="panelTab === 'play'" class="panel" />
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
  created() {
    console.log('created mobile')
  },
  destroyed() {
    console.log('destroyed mobile')
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
.layout.mobile {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;

  > h1 {
    margin: 0 0.5rem;
    text-align: left;
    user-select: none;
    font-size: 1.2rem;
    text-align: center;

    &::before {
      content: '🐸';
      margin-right: 0.5rem;
    }
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
    height: inherit;
    border: 2px solid #1c301c;
    border-top: none;
    margin: 0 0.2rem 0.2rem;
  }

  nav {
    padding: 0rem 2rem;
    background-color: #f5f556;
    display: flex;
    justify-content: space-evenly;
    border-bottom: 2px solid #1d2f1d;
    margin: 0 0.2rem;
    border: 2px solid #1c311c;
    border-top: none;

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
