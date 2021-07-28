import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state, n) {
      state.count += n
    }
  },
  getters:{
    doneTodos: state => {
      return state.count*10;
    }
  }
});

export default store;
