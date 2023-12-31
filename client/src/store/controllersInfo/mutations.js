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
  store.controllersData[controllerName].data.unshift(data)
  if (store.controllersData[controllerName].data.length > +process.env.PAGINATE_COUNT) {
    store.controllersData[controllerName].data.splice(store.controllersData[controllerName].data.length - 1, 1)
  }
  store.controllersData[controllerName].total += 1
}

export function deleteObjectFromData(store, {controllerName, data}) {
  const [key, value] = Object.entries(data)[0]
  store.controllersData[controllerName].data = store.controllersData[controllerName].data.filter((object) => {
    return object[key] !== value
  })
  store.controllersData[controllerName].total -= 1
}

export function updateObject(store, {controllerName, data}) {
  const controllerData = store.controllersData[controllerName].data
  const updateObject = controllerData.find((object) => object.id === data.id)
  Object.entries(data).forEach(([key, value]) => {
    updateObject[key] = value
  })
}

export function updateControllerData(store, {name, ...data}) {
  store.controllersData[name] = data
}
