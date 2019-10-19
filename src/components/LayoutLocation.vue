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

main.layout.mobile {
  .layout-location {
    position: absolute;
    bottom: 0;
    left: 2vw;
    height: 11.364rem;
    transition: margin 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    margin: -6rem 1.25rem;
    z-index: 2;

    &:hover {
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
  }
}
</style>
