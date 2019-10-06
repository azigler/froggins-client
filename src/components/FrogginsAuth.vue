<template>
  <div class="froggins-auth">
    <header>
      <h1 id="froggins">Froggins</h1>
    </header>
    <div class="login" v-show="!register">
      <span>Log in</span>
      <input
        type="text"
        name="username"
        v-model="username"
        placeholder="Username"
        @keyup.enter="logInPlayer()"
      />
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="Password"
        @keyup.enter="logInPlayer()"
      />
      <button @click="logInPlayer()">LOG IN</button>
      <span class="message-box">{{ message }}</span>
      <button class="toggle" @click="register = !register">
        New? Click here
      </button>
    </div>
    <div class="register" v-show="register">
      <span>Register</span>
      <input
        type="text"
        name="username"
        v-model="username"
        placeholder="Username"
        @keyup.enter="registerPlayer()"
      />
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="Password"
        @keyup.enter="registerPlayer()"
      />
      <button @click="registerPlayer()">REGISTER</button>
      <span class="message-box">{{ message }}</span>
      <button class="toggle" @click="register = !register">
        Returning? Click here
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FrogginsAuth',
  data() {
    return {
      username: `${process.env.NODE_ENV === 'development' ? 'debug1' : ''}`,
      password: `${process.env.NODE_ENV === 'development' ? 'debug1' : ''}`,
      message: 'Welcome to Froggins!',
      register: false
    }
  },
  methods: {
    logInPlayer() {
      this.message = 'Logging in...'

      const usernameValidation = this.validate({
        label: 'username',
        field: this.username,
        length: 4,
        alphanumeric: true
      })
      const passwordValidation = this.validate({
        label: 'password',
        field: this.password,
        length: 6
      })

      if (usernameValidation === true && passwordValidation === true) {
        this.ribbitSend({
          id: 'login',
          username: this.username,
          password: this.password
        })
      } else {
        this.message =
          usernameValidation !== true ? usernameValidation : passwordValidation
      }
    },
    registerPlayer() {
      this.message = 'Registering...'

      const usernameValidation = this.validate({
        label: 'username',
        field: this.username,
        length: 4,
        alphanumeric: true
      })
      const passwordValidation = this.validate({
        label: 'password',
        field: this.password,
        length: 6
      })

      if (usernameValidation === true && passwordValidation === true) {
        this.ribbitSend({
          id: 'registration',
          username: this.username,
          password: this.password
        })
      } else {
        this.message =
          usernameValidation !== true ? usernameValidation : passwordValidation
      }
    }
  },
  mounted() {
    this.$options.sockets.onmessage = msg => {
      let data = JSON.parse(msg.data)

      if (data.id.split('-')[0] === 'reject') {
        this.message = data.value
      } else {
        if (data.id === 'confirm-login' || data.id === 'confirm-registration') {
          this.$store.commit('SET_PLAYER', { authenticated: true })
          this.$router.replace('/')
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
header {
  margin-top: 0;
  background-color: #d5ecd5;
  border-bottom: 2px solid #1d2f1d;

  h1#froggins {
    font-size: 2rem;
    margin: 0;
    user-select: none;
  }
}

.login,
.register {
  margin: 15% auto 0;
  width: 35%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.3rem;
  box-shadow: 0px 4px 20px 1px #425042;
  background-color: #d5ecd5;
  border: 2px solid #1c2f1c;

  @media (max-width: 767px) {
    width: initial;
    border-radius: initial;
    border: initial;
    border-top: 2px solid #1c2f1c;
    border-bottom: 2px solid #1c2f1c;
  }

  .message-box {
    height: 2rem;
  }

  input,
  button {
    height: 2rem;
    font-size: 1.2rem;
    margin-bottom: 0.4rem;
    border: 1px solid #1c2f1c;
    border-radius: 0.2rem;

    &.toggle {
      margin-top: 1rem;
      font-size: 1rem;
    }
  }

  button {
    border-radius: 0.5rem;
    background-color: #68a268;
    color: white;
    font-weight: bold;
    box-shadow: inset 0px -1px 1px 0px #0e3e0e;

    &:hover {
      background-color: #2e632e;
      cursor: pointer;
    }
  }
}
</style>
