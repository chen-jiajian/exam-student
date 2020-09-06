import Cookies from 'js-cookie'
import userApi from '@/api/user'
// initial state
const state = {
  userName: Cookies.get('XddTeacherUserName'),
  userInfo: Cookies.get('XddTeacherUserInfo')
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
    Cookies.set('XddTeacherUserName', userName, { expires: 30 })
  },
  setUserInfo: (state, userInfo) => {
    state.userInfo = userInfo
    Cookies.set('XddTeacherUserInfo', userInfo, { expires: 30 })
  },
  clearLogin (state) {
    Cookies.remove('XddTeacherUserName')
    Cookies.remove('XddTeacherUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
