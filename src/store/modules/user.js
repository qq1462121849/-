import * as api from '../../api'
import * as utils from '../../utils'

const state = {
  token: utils.storage.get('token'),
  userInfo: utils.storage.get('userInfo') ? utils.storage.get('userInfo') : null,
  commodity: utils.storage.get('commodity'),
  couponpassMoney: utils.storage.get('couponpassMoney'),
  loading: false
}

const getters = {}

const actions = {
  login (context, mobile, password) {
    // const mobile = form.mobile.trim()
    // const password = form.password.trim()
    return new Promise((resolve, reject) => {
      api.login(mobile, password).then(response => {
        if (response.code === 0) {
          context.commit('setToken', response.data.token)
          context.commit('setUserInfo', response.data.userInfo)
        }
        resolve(response)
      }).catch(error => { reject(error) })
    })
  }
}

const mutations = {
  logout (state) {
    utils.storage.remove('token')
    utils.storage.remove('userInfo')
    state.token = null
    state.userInfo = null
  },
  setToken: (state, data) => {
    utils.storage.set('token', data)
    state.token = data
  },
  setUserInfo: (state, data) => {
    utils.storage.set('userInfo', data)
    state.userInfo = data
  },
  setCouponpassMoney: (state, data) => {
    utils.storage.set('couponpassMoney', data)
    state.couponpassMoney = data
  },
  show (state) {
    state.loading = true
  },
  hide (state) {
    state.loading = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
