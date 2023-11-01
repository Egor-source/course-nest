import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    next()
    return
  }
  const isAuth = store.getters['user/isAuth']

  if (!isAuth) {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    if (!accessToken || !refreshToken) {
      next('/login')
      return
    }

    store.commit('user/setAccessToken', accessToken)
    store.commit('user/setRefreshToken', refreshToken)
  }

  next()
})

export default router
