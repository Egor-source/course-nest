export function getAllControllers(store) {
  return store.controllersInfo
}

export function getControllerInfoByName(store) {
  return (name) => {
    return store.controllersInfo.find((controllerInfo) => name === controllerInfo.name)
  }
}

export function getControllerDataByName(store) {
  return (name) => {
    return store.controllersData[name]
  }
}
