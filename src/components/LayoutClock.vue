<template>
  <div class="layout-clock">
    <span class="time" @click="showModal = true">
      {{ $store.state.server.timeOfDay === 'night' ? '🌙' : '☀️' }}
      {{
        $store.state.server.timeOfDay.charAt(0).toUpperCase() +
          $store.state.server.timeOfDay.slice(1)
      }}
    </span>
    <modal id="clock" v-if="showModal" @close="showModal = false">
      <h2 slot="header">Clock</h2>
      <div slot="body">
        <span>
          {{ $store.state.server.timestamp || new Date() }}
        </span>
      </div>
    </modal>
  </div>
</template>

<script>
import moment from 'moment'
import Modal from './Modal.vue'

export default {
  name: 'LayoutClock',
  components: {
    Modal
  },
  watch: {
    time(newTime, oldTime) {
      if (oldTime === '' || newTime.hours() !== oldTime.hours()) {
        if (newTime.hours() >= 5 || newTime.hours() < 7) {
          this.$store.commit('SET_SERVER', { timeOfDay: 'dawn' })
        }
        if (newTime.hours() >= 7 && newTime.hours() < 12) {
          this.$store.commit('SET_SERVER', { timeOfDay: 'morning' })
        }
        if (newTime.hours() >= 11 && newTime.hours() < 13) {
          this.$store.commit('SET_SERVER', { timeOfDay: 'noon' })
        }
        if (newTime.hours() >= 13 && newTime.hours() < 17) {
          this.$store.commit('SET_SERVER', { timeOfDay: 'afternoon' })
        }
        if (newTime.hours() >= 17 && newTime.hours() < 19) {
          this.$store.commit('SET_SERVER', { timeOfDay: 'dusk' })
        }
        if (newTime.hours() >= 19 || newTime.hours() < 6) {
          this.$store.commit('SET_SERVER', { timeOfDay: 'night' })
        }
      }
    }
  },
  methods: {
    updateDateTime() {
      this.time = moment()
      setTimeout(this.updateDateTime, 1000 * 60)
    }
  },
  mounted() {
    this.updateDateTime()
  },
  data() {
    return {
      showModal: false,
      time: '',
      timeOfDay: 'start'
    }
  }
}
</script>

<style lang="scss">
.layout-clock .time {
  color: blue;
  transition: all 2s ease-out;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    color: red;
  }
}
</style>
