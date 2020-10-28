import $axios from '../plugins/axios'

export const getGameList = async () => {
  const response = await $axios.get('/game/')
  return response.data.data
}

export const getGameByID = async (payload) => {
  const response = await $axios.get('/game/' + payload)
  return response.data.data
}
