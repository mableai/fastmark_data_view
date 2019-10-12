const data = {
  state: {
    playMethod: "",
    activityId: "",
    activityStartDate: "",
    businessList: [],
  },
  mutations: {
    set_playMethod: (state, playMethod) => {
      state.playMethod = playMethod
    },
    set_activityId: (state, activityId) => {
      state.activityId = activityId
    },
    set_activityStartDate: (state, activityStartDate) => {
      state.activityStartDate = activityStartDate
    },
    set_businessList: (state, businessList) => {
      state.businessList = businessList
    },
  },
  actions: {
    getPlayMethod({ commit }, value) {
      commit('set_playMethod', value)
    },
    getActivityId({ commit }, value) {
      commit('set_activityId', value)
    },
    activityStartDate({ commit }, value) {
      commit('set_activityStartDate', value)
    },
    BusinessList({ commit }, value) {
      commit('set_businessList', value)
    }
   }
}
export default data