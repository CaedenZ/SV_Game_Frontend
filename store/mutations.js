import { setStore } from '../config/mUtils'

export default {
  LOG_IN(state, info) {
    console.log(state)
    state.userInfo = info
    state.userInfo.login = true
    setStore('email', info.email)
  },
}
