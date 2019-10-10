<template>
  <div class="froggins-auth">
    <header>
      <h1 id="froggins">Froggins</h1>
    </header>
    <div class="login" v-show="!register">
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
      <button @click="logInPlayer()">Log in</button>
      <span>{{ message }}</span>
    </div>
    <div class="register" v-show="register">
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
      <button @click="registerPlayer()">Register</button>
      <span>{{ message }}</span>
    </div>
    <button class="toggle-auth yellow" @click="register = !register">
      {{
        this.register === false ? 'New? Click here' : 'Returning? Click here'
      }}
    </button>
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
          type: 'auth',
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
          type: 'auth',
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
          this.$store.commit('SET_PLAYER', { auth: true })
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
  background-color: #d7edd5;
  border-bottom: 2px solid #c2d8c0;
  -webkit-box-shadow: 0px 2px 20px 0px #59925a;
  box-shadow: 0px 2px 20px 0px #657566;

  h1 {
    font-size: 2rem;
    margin: 0;
    user-select: none;
    font-family: 'Fredoka One', Helvetica, Arial, sans-serif;

    &::after {
      content: '🐸';
      margin-right: 0.5rem;
      position: absolute;
    }
  }
}

.login,
.register {
  margin: 8rem auto 0;
  width: 20rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.3rem;
  box-shadow: 0px 4px 20px 1px #425042;
  background-color: #d5ecd5;
  border: 2px solid #91ab92;

  @media (max-width: 767px) {
    width: 15rem;
  }

  input {
    height: 3rem;
    font-size: 2rem;
    color: #1c301c;
    padding: 0 0.8rem;
    border: none;
    background-color: #d6ecd5;

    border-radius: 0;
    border-bottom: 0.1rem dashed green;

    &::placeholder {
      color: #8aa28a;
    }

    &:focus {
      outline: none;
      background-color: #bae8b9;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom: 0.1rem solid green;
    }
  }

  button {
    text-transform: uppercase;
  }
}

.toggle-auth {
  margin-top: 2.5rem;
  font-size: 1.1rem;
  width: 15rem;
}
</style>
