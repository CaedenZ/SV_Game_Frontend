import $axios from '../plugins/axios'

export const getUserList = async () => {
  const response = await $axios.get('/user/')
  return response.data.data
}

export const getUserByID = async (payload) => {
  const response = await $axios.get('/user/' + payload)
  return response.data.data
}

export const updateUserScoreByID = async (payload) => {
  const data = {
    score: payload.score,
  }
  const response = await $axios.put('/user/' + payload.id, data)
  return response.data.data
}

