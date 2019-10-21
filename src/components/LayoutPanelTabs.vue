<template>
  <div class="layout-panel-tabs">
    <div
      v-if="$store.state.player.isMobile"
      @click="currentTab = 'Game'"
      :class="`yellow button help ${currentTab === 'Game' ? 'selected' : ''}`"
    >
      🕹️
    </div>
    <div
      @click="currentTab = 'PanelParty'"
      :class="
        `yellow button party ${currentTab === 'PanelParty' ? 'selected' : ''}`
      "
    >
      🦎
    </div>
    <div
      @click="currentTab = 'PanelItems'"
      :class="
        `yellow button items ${currentTab === 'PanelItems' ? 'selected' : ''}`
      "
    >
      ⚗️
    </div>
    <div
      @click="currentTab = 'PanelDemesne'"
      :class="
        `yellow button demesne ${
          currentTab === 'PanelDemesne' ? 'selected' : ''
        }`
      "
    >
      👑
    </div>
    <div
      @click="currentTab = 'PanelLog'"
      :class="
        `yellow button log ${currentTab === 'PanelLog' ? 'selected' : ''}`
      "
    >
      📘
    </div>
    <div
      @click="currentTab = 'PanelHelp'"
      :class="
        `yellow button help ${currentTab === 'PanelHelp' ? 'selected' : ''}`
      "
    >
      ❔
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutPanelTabs',
  data() {
    return {
      currentTab: `${this.$store.state.player.isMobile ? 'Game' : 'PanelParty'}`
    }
  },
  mounted() {
    this.$emit('current-tab', this.currentTab)
  },
  watch: {
    currentTab(newTab) {
      this.$emit('current-tab', newTab)
    }
  }
}
</script>

<style lang="scss">
.layout-panel-tabs {
  display: flex;
  background-color: #495d49;

  .button {
    padding: 0 0.4rem;
    border-radius: 5px 5px 0 0;
    border: 2px solid #495d49;
    border-bottom: none;
    border-bottom: 1px solid #495d49;

    &:hover,
    &.selected {
      cursor: pointer;
    }

    &.selected {
      border-bottom: none;
      background-color: #c6c05f !important;
    }
  }
}

main.layout.desktop {
  .layout-panel-tabs {
    justify-content: space-between;
    margin: 0 0.2rem;
    min-height: 2.1rem;
    border-radius: 4px 4px 0 0;
  }
}

main.layout.mobile {
  .layout-panel-tabs {
    justify-content: center;
    height: 5%;

    .button {
      display: flex;
      line-height: 2;
      align-items: center;
      flex: auto;
      justify-content: center;

      &:nth-child(1) {
        border-left: none;
      }

      &:nth-child(6) {
        border-right: none;
      }
    }
  }
}
</style>
