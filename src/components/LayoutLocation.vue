<template>
  <div :class="`layout-location ${$store.state.server.timeOfDay}`">
    <span class="name">{{ locationName }}</span>
    <img :src="locationImage" class="black" />
  </div>
</template>

<script>
export default {
  name: 'LayoutLocation',
  data() {
    return {
      locationImage: 'assets/img/location-swamp.png',
      locationName: 'deep in the swamplands'
    }
  }
}
</script>

<style lang="scss">
.layout-location {
  border: 2px solid #495d49;
  margin: 0.2rem 0.2rem 0 0.2rem;
  border-radius: 5px 5px 0 0;
  user-select: none;
  position: relative;
  height: 200px;

  .name {
    width: 100%;
    height: 1.2rem;
    border-bottom: dotted rgba(215, 236, 213, 0.3) 2px;
    line-height: 1.1;
    position: absolute;
    left: 0;
    color: #b1c9db;
    z-index: 99;
    background-color: rgba(215, 236, 213, 0.3);
    transition: 10s cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: color, background-color, border;
  }

  &.dawn,
  &.morning,
  &.noon,
  &.afternoon,
  &.dusk {
    .name {
      background-color: rgba(215, 236, 213, 0.8);
      color: #1c2f1c;
      border-bottom: dotted #495d49 2px;
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

  img {
    transition: filter 10s cubic-bezier(0.4, 0, 0.2, 1);
    image-rendering: pixelated;
  }
}

main.layout.mobile {
  .layout-location {
    position: absolute;
    bottom: 0;
    height: 200px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    margin: -8rem 0.5rem;
    z-index: 98;
    border-bottom: none;

    &:hover {
      margin: 0 1.2rem;
    }

    &:not(:hover):before {
      content: 'tap!';
      position: absolute;
      width: 2rem;
      top: 0.5rem;
      right: -0.8rem;
      transform: rotate(25deg);
      z-index: 100;
      font-weight: bold;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      color: #1b301c;
      text-shadow: #9ad89a 0px 1px 2px;
      border: 1px solid rgba(154, 216, 154, 0.2);
    }
  }
}
</style>
