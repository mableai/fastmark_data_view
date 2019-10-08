const data = {
  state: {
    playMethod: "",
  },
  mutations: {
    set_playMethod: (state, playMethod) => {
      state.playMethod = playMethod
    },
  },
  actions: {
    getPlayMethod({ commit }, value) {
      commit('set_playMethod', value)
    },
  }
}
export default data