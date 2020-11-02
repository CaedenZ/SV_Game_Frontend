export default {
  setLoggedIn({ commit }, info) {
    new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
      console.log(info)
      commit('LOG_IN', info)
    })
  },

  getUserInfo({ commit }) {
    // api call here
    // this.$axios.$get('/login', loginInfo)
    new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
      console.log('info acquired')
    })
  },
}
