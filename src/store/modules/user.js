import Cookies from 'js-cookie'
import userApi from '@/api/user'
// initial state
const state = {
  userName: Cookies.get('XddStudentUserName'),
  userInfo: Cookies.get('XddStudentUserInfo'),
  imagePath: Cookies.get('XddStudentImagePath'),
  messageCount: 0
}

// actions
const actions = {
  initUserInfo ({ commit }) {
    userApi.getCurrentUser().then(re => {
      commit('setUserInfo', re.response)
    })
  },
  getUserMessageInfo ({ commit }) {
    userApi.getMessageCount().then(re => {
      commit('setMessageCount', re.response)
    })
  }
}

// mutations
const mutations = {
  setUserName (state, userName) {
    state.userName = userName
    Cookies.set('XddStudentUserName', userName, { expires: 30 })
  },
  setUserInfo (state, userName) {
    state.userName = userName
    Cookies.set('XddStudentUserName', userName, { expires: 30 })
  },
  setImagePath: (state, imagePath) => {
    state.imagePath = imagePath
    Cookies.set('XddStudentImagePath', imagePath, { expires: 30 })
  },
  setMessageCount: (state, messageCount) => {
    state.messageCount = messageCount
  },
  messageCountSubtract: (state, num) => {
    state.messageCount = state.messageCount - num
  },
  clearLogin (state) {
    Cookies.remove('XddStudentUserName')
    Cookies.remove('XddStudentUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
