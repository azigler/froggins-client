<template>
  <div class="mode battle">
    Battle mode.
    <button @click="$router.replace('/battle/pve')">battle pve</button>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'ModeBattle'
}
</script>
