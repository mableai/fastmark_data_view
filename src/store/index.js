import Vue from 'vue'
import Vuex from 'vuex'
import data from './modules/data'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // app,
    // errorLog,
    // permission,
    //indexdata,
    data
  },
  getters
})

export default store