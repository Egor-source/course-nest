const routes = [{
  path: '',
  name: 'Main',
  component: () => import('../pages/MainPage'),
  children: [
    {
      path: ':controllerName',
      name: 'controllers',
      component: () => import('../pages/ControllerPage'),
    }
  ]
}, {
  path: '/login',
  name: 'Login',
  component: () => import('../pages/LoginPage')
}]

export default routes
