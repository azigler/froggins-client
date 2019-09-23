<template>
  <div id="ribbit-socket" />
</template>

<script>
export default {
  name: 'RibbitSocket',
  mounted() {
    this.$options.sockets.onmessage = msg => {
      let data = JSON.parse(msg.data)

      // Handle 'set' type Ribbits
      if (data.type === 'set') {
        // if setting a specific property within a state object
        if (data.id.split('.').length > 1) {
          return this.$store.commit(
            `${data.type.toUpperCase()}_${data.id.split('.')[0].toUpperCase()}`,
            { [data.id.split('.')[1]]: data.value }
          )
          // if setting an entire state object
        } else {
          return this.$store.commit(
            `${data.type.toUpperCase()}_${data.id.split('.')[0].toUpperCase()}`,
            data.value
          )
        }
      }
    }
  },
  destroyed() {
    delete this.$options.sockets.onmessage
  }
}
</script>
