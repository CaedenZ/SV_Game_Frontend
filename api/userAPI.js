import $axios from '../plugins/axios'

export const logIn = (payload) => {
  const data = payload
  return data
}

export const getUserList = async () => {
  console.log('here')
  const response = await $axios.get('/users/')
  return response.data.data
}

export const getUserByID = async function (payload) {
  const response = await this.$axios.get('/users/' + payload)
  return response.data.data
}

export const updateUserScoreByID = async function (payload) {
  const data = {
    score: payload.score,
  }
  const response = await this.$axios.put('/users/' + payload.id, data)
  return response.data.data
}
