import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    departments: [],
    baseUrl: 'http://localhost:3003',
    classes: []
  },
  getters: {
  },
  mutations: {
    SET_DEPARTMENTS (state, payload) {
      state.departments = payload
    },
    SET_CLASSES (state, payload) {
      state.classes = payload
    }

  },
  actions: {
    getDepartments (context) {
      axios({
        url: `${this.state.baseUrl}/department`,
        method: 'GET'
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('SET_DEPARTMENTS', data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getClass (context) {
      axios({
        url: `${this.state.baseUrl}/class`,
        method: 'GET'
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('SET_CLASSES', data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
