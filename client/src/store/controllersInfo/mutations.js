export function setControllersInfo(store, controllersInfo) {
  store.controllersInfo = controllersInfo
}

export function setControllersData(store, controllersInfo) {
  store.controllersData = controllersInfo.reduce((acc, controllerInfo) => {
    acc[controllerInfo.name] = {
      data: [],
      currentPage: 0,
      total: 0,
    }
    return acc
  }, {})
}

export function addObjectToData(store, {controllerName, data}) {
  store.controllersData[controllerName].data.push(data)
}

export function updateControllerData(store, {name, ...data}) {
  store.controllersData[name] = data
}
