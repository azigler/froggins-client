<template>
  <div class="froggins-auth">
    <header class="froggins-header">
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
    <button
      class="toggle-auth yellow"
      @click="
        () => {
          register = !register
          if (register === true) showModal = true
        }
      "
    >
      {{
        this.register === false ? 'New? Click here' : 'Returning? Click here'
      }}
    </button>
    <modal
      id="registration-modal"
      v-if="register && showModal"
      @close="showModal = false"
    >
      <h3 slot="header">Welcome!</h3>
      <div slot="body">
        <div>
          We're glad you're here. The Froggins of Frogginville need heroes like
          you to protect them from the dangers of the swamplands. Choose a
          username and password to register for immediate access to the newest
          virtual pet adoption website on the internet.
        </div>
        <span>🐸💚</span>
      </div>
    </modal>
  </div>
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

  h1 {
    font-size: 2rem;
    margin: 0;

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
    color: #1c301c;
    padding: 0 0.8rem;
    border: none;
    background-color: #d6ecd5;
    text-align: center;
    border-radius: 0;
    border-bottom: 0.1rem dashed green;

    &::placeholder {
      color: #8aa28a;
      text-align: center;
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
  width: 18rem;
}

#registration-modal {
  span {
    font-size: 2.1rem;
    animation: green-glow 1s infinite;
    user-select: none;
  }

  h3:after {
    content: '🏡';
    position: absolute;
  }
}
</style>
