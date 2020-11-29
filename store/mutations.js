import { setStore } from '../config/mUtils'

export default {
  LOG_IN(state, info) {
    state.userInfo = info
    state.userInfo.login = true
    setStore('userInfo', info)
  },

  LOG_OUT(state) {
    state.userInfo = null
    localStorage.removeItem('userInfo')
  },
}
