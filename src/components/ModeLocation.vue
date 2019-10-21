<template>
  <div class="mode location">
    Location mode.
    <button @click="$router.replace('/location/debug')">debug explore</button>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'ModeLocation'
}
</script>
