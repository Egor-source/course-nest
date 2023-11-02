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

export function isMethodExist(store) {
  return ({controllerName, method}) => {
    const controller = getControllerInfoByName(store)(controllerName)
    return !!controller.methods[method]
  }
}

export function getMethodOptions(store) {
  return ({controllerName, method}) => {
    const controller = getControllerInfoByName(store)(controllerName)
    return controller.methods[method]?.options
  }
}
