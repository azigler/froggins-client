class Ribbit {
  constructor() {
    console.log('Ribbit constructor fired!')
  }
}

export default {
  install(Vue) {
    Vue.ribbit = new Ribbit()
  }
}
