<template>
  <div class="froggins-auth">
    <div class="login" v-show="!register">
      <input
        type="text"
        name="username"
        v-model="username"
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="Password"
      />
      <button @click="logInPlayer()">LOG IN</button>
      <span v-show="error">{{ error }}</span>
      <button class="toggle" @click="register = !register">
        New? Click here to register.
      </button>
    </div>
    <div class="register" v-show="register">
      <input
        type="text"
        name="username"
        v-model="username"
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="Password"
      />
      <button @click="registerPlayer()">REGISTER</button>
      <span v-show="error">{{ error }}</span>
      <button class="toggle" @click="register = !register">
        Returning? Click here to log in.
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FrogginsAuth',
  data() {
    return {
      username: '',
      password: '',
      error: false,
      register: false
    }
  },
  methods: {
    logInPlayer() {
      this.ribbitSend({
        id: 'login',
        username: this.username,
        password: this.password
      })
    },
    registerPlayer() {
      this.ribbitSend({
        id: 'registration',
        username: this.username,
        password: this.password
      })
    }
  },
  mounted() {
    this.$options.sockets.onmessage = msg => {
      let data = JSON.parse(msg.data)

      if (data.id.split('-')[0] === 'reject') {
        this.error = data.value
      } else {
        if (data.id === 'confirm-login' || data.id === 'confirm-registration') {
          this.$store.commit('SET_PLAYER', { authenticated: true })
        }
      }
    }
  },
  destroyed() {
    delete this.$options.sockets.onmessage
  }
}
</script>

<style scoped lang="scss">
.login,
.register {
  margin: 15% auto 0;
  width: 50%;
  display: flex;
  flex-direction: column;

  input,
  button {
    height: 2rem;
    font-size: 1.2rem;

    &.toggle {
      margin-top: 1rem;
    }
  }
}
</style>
