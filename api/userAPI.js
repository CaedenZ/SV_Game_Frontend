import $axios from '../plugins/axios'

export const getUserList = async () => {
  const response = await $axios.get('/users/')
  return response.data.data
}

export const getUserByID = async (payload) => {
  const response = await $axios.get('/users/' + payload)
  return response.data.data
}

export const updateUserScoreByID = async (payload) => {
  const data = {
    score: payload.score,
  }
  const response = await $axios.put('/users/' + payload.id, data)
  return response.data.data
}
