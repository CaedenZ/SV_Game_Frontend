// import $axios from '../plugins/axios'

export const login = (payload) => {
  this.$axios
    .post('/login', {
      email: payload.email,
      password: payload.password,
    })
    .then((resp) => {
      this.$auth.setToken('local', 'Bearer ' + resp.data.access_token)
      this.$auth.setRefreshToken('local', resp.data.refresh_token)
      this.$axios.setHeader('Authorization', 'Bearer ' + resp.data.access_token)
      this.$auth.ctx.app.$axios.setHeader(
        'Authorization',
        'Bearer ' + resp.data.access_token
      )
      this.$axios.get('/users/me').then((resp) => {
        this.$auth.setUser(resp.data)
        this.$router.push('/')
      })
    })
}

export const logout = (payload) => {
  this.$axios.post('/logout').then((resp) => {
    this.$auth.setToken('local', 'Bearer ' + resp.data.access_token)
    this.$auth.setRefreshToken('local', resp.data.refresh_token)
    this.$axios.setHeader('Authorization', 'Bearer ' + resp.data.access_token)
    this.$auth.ctx.app.$axios.setHeader(
      'Authorization',
      'Bearer ' + resp.data.access_token
    )
    this.$axios.get('/users/me').then((resp) => {
      this.$auth.setUser(resp.data)
      this.$router.push('/')
    })
  })
}
