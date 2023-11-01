import axiosInstance from '@/axios'

export async function login({commit}, userData) {
  const {data} = await axiosInstance.post('users/login', userData)
  console.log(data)
  localStorage.setItem('accessToken', data.access_token)
  localStorage.setItem('refreshToken', data.refresh_token)

  commit('setUser', data)
  commit('setAccessToken', data.access_token)
  commit('setRefreshToken', data.refresh_token)
  return data
}

export async function loadUser({commit, getters}) {
  try {
    const {data} = await axiosInstance('/users/authUser')
    commit('setUser', data)
  } catch (e) {
    try {
      const {refreshToken} = getters.getUser
      const {data} = await axiosInstance.post('users/refreshTokens', {
        token: refreshToken
      })

      localStorage.setItem('accessToken', data.access_token)
      localStorage.setItem('refreshToken', data.refresh_token)

      commit('setUser', data)
      commit('setAccessToken', data.access_token)
      commit('setRefreshToken', data.refresh_token)
    } catch (e) {
      commit('resetAuth')
    }
  }
}
