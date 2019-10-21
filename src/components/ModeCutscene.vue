<template>
  <div class="mode cutscene">
    Cutscene mode.
    <button @click="$router.replace('/cutscene/intro')">intro cutscene</button>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'ModeCutscene'
}
</script>
