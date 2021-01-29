import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fireuser: null
  },
  mutations: {
    setFireuser (state, user) {
      state.fireuser = user
    }
  },
  actions: {
  },
  modules: {
  }
})
