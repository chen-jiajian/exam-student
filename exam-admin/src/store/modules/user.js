import Cookies from 'js-cookie'
import userApi from '@/api/user'
// initial state
const state = {
  userName: Cookies.get('XddAdminUserName'),
  userInfo: Cookies.get('XddAdminUserInfo')
}

// actions
const actions = {
  initUserInfo ({ commit }) {
    userApi.getCurrentUser().then(re => {
      commit('setUserInfo', re.response)
    })
  }
}

// mutations
const mutations = {
  setUserName (state, userName) {
    state.userName = userName
    Cookies.set('XddAdminUserName', userName, { expires: 30 })
  },
  setUserInfo: (state, userInfo) => {
    state.userInfo = userInfo
    Cookies.set('XddAdminUserInfo', userInfo, { expires: 30 })
  },
  clearLogin (state) {
    Cookies.remove('XddAdminUserName')
    Cookies.remove('XddAdminUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
