<template>
  <div class="layout-panel-tabs">
    <div
      @click="currentTab = 'PanelFroggins'"
      :class="
        `tab froggins ${currentTab === 'PanelFroggins' ? 'selected' : ''}`
      "
    >
      🦎
    </div>
    <div
      @click="currentTab = 'PanelItems'"
      :class="`tab items ${currentTab === 'PanelItems' ? 'selected' : ''}`"
    >
      📦
    </div>
    <div
      @click="currentTab = 'PanelStructures'"
      :class="
        `tab structures ${currentTab === 'PanelStructures' ? 'selected' : ''}`
      "
    >
      🏠
    </div>
    <div
      @click="currentTab = 'PanelWorld'"
      :class="`tab world ${currentTab === 'PanelWorld' ? 'selected' : ''}`"
    >
      🌐
    </div>
    <div
      @click="currentTab = 'PanelHelp'"
      :class="`tab help ${currentTab === 'PanelHelp' ? 'selected' : ''}`"
    >
      ❔
    </div>
    <div
      v-if="$store.state.player.isMobile"
      @click="currentTab = 'PanelGame'"
      :class="`tab help ${currentTab === 'PanelGame' ? 'selected' : ''}`"
    >
      🕹️
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutPanelTabs',
  data() {
    return {
      currentTab: `${
        this.$store.state.player.isMobile ? 'PanelGame' : 'PanelFroggins'
      }`
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
main.layout.desktop {
  .layout-panel-tabs {
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
}

main.layout.mobile {
  .layout-panel-tabs {
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
}
</style>
