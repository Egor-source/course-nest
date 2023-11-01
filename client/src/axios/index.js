import axios from 'axios'
import store from '@/store'

const axiosInstance = axios.create({
  baseURL: `${process.env.SERVER_BASE_URL}/${
    process.env.GLOBAL_PREFIX ? `${process.env.GLOBAL_PREFIX}/` : ''
  }`
})

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = store.getters['user/getUser']

  config.headers.Authorization = `Bearer ${accessToken}`
  config.headers['Content-Type'] = 'application/json'
  return config
})

export default axiosInstance
