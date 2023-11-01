export function isAuth (store) {
  return !!store.accessToken
}

export function getUser (store) {
  return {
    id: store.id,
    login: store.login,
    roles: store.roles,
    accessToken: store.accessToken,
    refreshToken: store.refreshToken
  }
}
