import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import Cookie from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      layout: 'default',
      profile: null,
      token: Cookie.get('token'),
      loadingOverlay: false
    }
  },
  getters: {
    profile: state => state.profile,
    hasToken: state => state.token,
    layout: state => state.layout || 'default'
  },
  mutations: {
    [types.START_LOADING] (state) {
      state.loadingOverlay = true
      document.getElementById('loading').style.opacity = 'block'
    },
    [types.END_LOADING] (state) {
      state.loadingOverlay = false
      document.getElementById('loading').style.display = 'none'
    },
    [types.SET_LAYOUT] (state, { layout }) {
      state.layout = layout
    },
    [types.SET_TOKEN] (state, token) {
      state.token = token
      Cookie.set('token', token)
    },
    [types.SET_PROFILE] (state, { profile }) {
      state.profile = profile
    },
    [types.LOG_OUT] (state) {
      state.token = null
      state.profile = null
      Cookie.remove('token')
    }
  }
})
