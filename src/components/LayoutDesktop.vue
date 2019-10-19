<template>
  <main class="layout desktop">
    <aside :class="`sidebar ${hideSidebar ? 'hidden' : ''}`">
      <header class="froggins header">
        <h1>Froggins</h1>
        <div
          class="toggle-hide"
          @click="hideSidebar = !hideSidebar"
          :class="`${hideSidebar ? 'hidden' : ''}`"
        >
          ◀️
        </div>
      </header>
      <layout-location />
      <div class="status-bar">
        <layout-time />
        <layout-online-players />
      </div>
      <div class="panel-container">
        <layout-panel-tabs v-on:current-tab="setCurrentTab" />
        <component :is="currentTab" class="froggins panel" />
        <layout-footer />
      </div>
    </aside>
    <panel-game />
  </main>
</template>

<script>
import PanelFroggins from './PanelFroggins'
import PanelItems from './PanelItems'
import PanelStructures from './PanelStructures'
import PanelWorld from './PanelWorld'
import PanelHelp from './PanelHelp'
import LayoutFooter from './LayoutFooter'
import LayoutLocation from './LayoutLocation'
import LayoutOnlinePlayers from './LayoutOnlinePlayers'
import LayoutTime from './LayoutTime'
import LayoutPanelTabs from './LayoutPanelTabs'
import PanelGame from './PanelGame'

export default {
  name: 'LayoutDesktop',
  components: {
    PanelFroggins,
    PanelItems,
    PanelStructures,
    PanelWorld,
    PanelHelp,
    LayoutFooter,
    LayoutLocation,
    LayoutOnlinePlayers,
    LayoutTime,
    LayoutPanelTabs,
    PanelGame
  },
  created() {
    window.addEventListener('keypress', e => {
      if (
        e.key === '`' &&
        window.document.activeElement.tagName !== 'INPUT' &&
        window.document.activeElement.tagName !== 'TEXTAREA'
      )
        this.hideSidebar = !this.hideSidebar
    })
  },
  data() {
    return {
      hideSidebar: false,
      currentTab: 'PanelFroggins'
    }
  },
  methods: {
    setCurrentTab(newTab) {
      this.currentTab = newTab
    }
  }
}
</script>

<style lang="scss">
.layout.desktop {
  display: flex;
  overflow: hidden;
  text-align: center;
  background-color: #b4cbba;

  aside.sidebar {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 12rem;
    border-right: 2px solid #1d2f1d;
    transition: margin 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: #b0c1b0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%23bdddcc' fill-opacity='0.4' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E");

    &.hidden {
      margin-left: -9.5rem;
    }

    header {
      position: relative;
      height: 2rem;

      > h1 {
        margin: -0.4rem 0.5rem 0;
        text-align: left;
        font-size: 1.5rem;
      }

      .toggle-hide {
        font-size: 1.2rem;
        margin: 0.55rem 0.5rem 0 0.25rem;
        padding: 0.15rem 0.25rem;
        transition: 0.3s;
        position: absolute;
        right: -6px;
        top: -12px;
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

    .status-bar {
      border: 2px solid #1c2f1c;
      margin: 0 0.2rem 0.2rem;
      border-radius: 0 0 6px 6px;
      border-top: none;
      background: linear-gradient(to right, #95ab95, #e7ffff);
      display: flex;
      justify-content: space-between;
      padding: 0 0.5rem;
      user-select: none;
      min-height: 1.7rem;
    }

    .panel-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      margin-bottom: 10vh;

      .panel {
        padding: 0.5rem;
        margin: 0 0.2rem;
        height: 100%;
        border: 2px solid #495d49;
        border-top: none;
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
      }
    }
  }

  .game .panel {
    border-bottom: 2px solid #495d49;
  }
}
</style>
