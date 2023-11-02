export function setControllersInfo(store, controllersInfo) {
  store.controllersInfo = controllersInfo
}

export function setControllersData(store, controllersInfo) {
  store.controllersData = controllersInfo.reduce((acc, controllerInfo) => {
    acc[controllerInfo.name] = {
      data: [],
      perPage: 0,
      total: 0,
    }
    return acc
  }, {})
}

export function updateControllerData(store, {name, ...data}) {
  store.controllersData[name] = data
}
