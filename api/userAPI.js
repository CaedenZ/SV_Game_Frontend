import $axios from 'plugins/axios'

export const getUserList = async (token, payload) => {
  const data = {
    company_id: payload,
    session_key: token,
  }
  const response = await $axios.post('/user/', data)
  console.log(response.data.data)
  return response.data.data
}

export const logIn = (payload) => {
  const data = {
    name: payload.name,
    email: payload.email,
  }

  return data
}
