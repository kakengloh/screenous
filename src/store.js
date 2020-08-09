import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  env: 'production',
}

// sync
const mutations = {
  setEnv(state, env) {
    state.env = env
  }
}

// sync / async
const actions = {
    setEnv: ({ commit }, env) => commit('setEnv', env)
}

// getters are functions.
const getters = {
//   evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})