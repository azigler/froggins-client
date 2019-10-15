<template>
  <main class="froggins-auth">
    <header class="froggins-header">
      <h1 id="froggins">Froggins</h1>
    </header>
    <div class="login" v-show="!register">
      <input
        type="text"
        name="username"
        class="green"
        v-model="username"
        placeholder="Username"
        @keyup.enter="logInPlayer()"
      />
      <input
        type="password"
        name="password"
        class="green"
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
        class="green"
        v-model="username"
        placeholder="Username"
        @keyup.enter="registerPlayer()"
      />
      <input
        type="password"
        name="password"
        class="green"
        v-model="password"
        placeholder="Password"
        @keyup.enter="registerPlayer()"
      />
      <button @click="registerPlayer()">Register</button>
      <span>{{ message }}</span>
    </div>
    <button class="toggle-auth yellow" @click="toggleAuth()">
      {{
        this.register === false ? 'New? Click here' : 'Returning? Click here'
      }}
    </button>
    <modal
      id="registration"
      v-if="register && showModal"
      @close="showModal = false"
    >
      <h2 slot="header">Welcome!</h2>
      <div slot="body">
        <div>
          We're glad you're here. The Froggins of Frogginville need heroes like
          you to protect them from the dangers of the swamplands. Choose a
          username and password to register for immediate access to the newest
          virtual pet adoption website on the internet.
        </div>
        <span class="pulsing">🐸💚</span>
      </div>
    </modal>
  </main>
</template>

<script>
import Modal from './Modal.vue'

export default {
  name: 'FrogginsAuth',
  components: {
    Modal
  },
  data() {
    return {
      username: `${process.env.NODE_ENV === 'development' ? 'debug1' : ''}`,
      password: `${process.env.NODE_ENV === 'development' ? 'debug1' : ''}`,
      message: 'Welcome to Froggins!',
      register: false,
      showModal: false
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
    },
    toggleAuth() {
      this.register = !this.register
      if (this.register === true) this.showModal = true
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

<style lang="scss">
.froggins-auth {
  text-align: center;

  header {
    h1 {
      &:after {
        content: '🐸';
        position: absolute;
      }
    }
  }

  .login,
  .register {
    margin: 10vh auto 0;
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
      padding: 0 0.8rem;
      border-radius: 0;
      text-align: center;

      &:focus {
        outline: none;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
    }

    button {
      text-transform: uppercase;
    }
  }

  button.toggle-auth {
    margin-top: 2.5rem;
    font-size: 1.1rem;
    width: 18rem;
  }

  #registration .modal {
    span.pulsing {
      font-size: 2.1rem;
      animation: glow-green 1s infinite;
      user-select: none;
    }

    h2:after {
      content: '🏡';
      position: absolute;
    }
  }
}
</style>
