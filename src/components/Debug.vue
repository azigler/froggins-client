<template>
  <div>
    <button @click="clickButton()">Click Me!</button>
    <span> {{ userId }} </span>
    <span>Clicks: {{ debug.clicks }}</span>
    <div>Users:</div>
    <span v-for="user in connectedUsers" v-bind:key="user"> {{ user }} </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Debug',
  computed: {
    ...mapState(['debug'])
  },
  data() {
    return {
      userId: '',
      connectedUsers: []
    }
  },
  methods: {
    // TODO: use Ribbit to send data back to server
    clickButton() {
      this.$socket.sendObj({
        text: 'someone clicked a button',
        action: 'incrementClicks'
      })
    }
  },
  beforeMount() {
    // TODO: use Ribbit to interpret server data
    this.$options.sockets.onopen = () => {
      this.$socket.sendObj({
        text: 'someone is fetching clicks',
        action: 'fetchClicks'
      })
    }

    // TODO: use Ribbit to interpret server data
    this.$options.sockets.onmessage = msg => {
      let data = JSON.parse(msg.data)
      if (data.label) {
        console.log(data.userId)
        return (this.userId = data.userId)
      }
      if (data.connectedUsers) {
        console.log(data.connectedUsers)
        return (this.connectedUsers = data.connectedUsers)
      } else {
        this.$store.commit('SET_CLICKS', data)
        console.log(`click count: ${data}`)
      }
    }
  }
}
</script>
