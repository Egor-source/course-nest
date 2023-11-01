const routes = [{
  path: '',
  name: 'Main',
  component: () => import('../pages/MainPage')
}, {
  path: '/login',
  name: 'Login',
  component: () => import('../pages/LoginPage')
}]

export default routes
