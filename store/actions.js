export default {
  setLoggedIn({ commit }, info) {
    new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
      console.log('logged in')
      commit('LOG_IN', info)
    })
  },
}
