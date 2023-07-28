import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    departments: [],
    baseUrl: 'http://localhost:3003',
    classes: [],
    classEdit: {}

  },
  getters: {
  },
  mutations: {
    SET_DEPARTMENTS (state, payload) {
      state.departments = payload
    },
    SET_CLASSES (state, payload) {
      state.classes = payload
    },
    SET_CLASSEDIT (state, payload) {
      payload.date = new Date(payload.date).toLocaleDateString('en-CA')
      state.classEdit = payload
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
        method: 'GET',
        headers: { accesstoken: localStorage.getItem('accesstoken') }
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('SET_CLASSES', data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getClassById (context, payload) {
      axios({
        url: `${this.state.baseUrl}/class/${payload}`,
        method: 'PUT',
        headers: { accesstoken: localStorage.getItem('accesstoken') }
      })
        .then(({ data }) => {
          context.commit('SET_CLASSEDIT', data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
