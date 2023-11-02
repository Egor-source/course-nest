import axiosInstance from '@/axios'

export async function loadControllersInfo({commit}) {
  const {data} = await axiosInstance('admin');
  commit('setControllersInfo', data)
  commit('setControllersData', data)
}

export async function paginate({getters, commit}, paginateInfo) {
  const controllerInfo = getters.getControllerInfoByName(paginateInfo.controllerName)
  const {data} = await axiosInstance.post(controllerInfo.methods.paginate.path, {
    perPage: paginateInfo.perPage,
    count: +process.env.PAGINATE_COUNT,
  });
  commit('updateControllerData', {
    name: paginateInfo.controllerName,
    ...data,
  })
}

export async function create({getters, commit}, {controllerName, createData}) {
  const controllerInfo = getters.getControllerInfoByName(controllerName)
  const {data} = await axiosInstance.post(controllerInfo.methods.create.path, createData);
  commit('addObjectToData', {controllerName, data})
}

export async function deleteObject({getters, commit}, {controllerName, object}) {
  const controllerInfo = getters.getControllerInfoByName(controllerName);
  const path = replacePathParams(controllerInfo.methods.delete.options.params, object, controllerInfo.methods.delete.path)
  const {data} = await axiosInstance.delete(path);
  commit('deleteObjectFromData', {controllerName, data})
}

export async function update({getters, commit}, {controllerName, object, updateData}) {
  updateData = Object.entries(updateData).reduce((acc, [key, value]) => {
    const field = object.find((field) => field.key === key)
    if (field.value !== value) {
      acc[key] = value
    }
    return acc
  }, {})
  if (Object.keys(updateData).length === 0) return null
  const controllerInfo = getters.getControllerInfoByName(controllerName);
  const path = replacePathParams(controllerInfo.methods.update.options.params, object, controllerInfo.methods.update.path)
  const {data} = await axiosInstance.patch(path, updateData);
  commit('updateObject', {controllerName, data})
}

export async function login({getters, commit}, {controllerName, object}) {
  const controllerInfo = getters.getControllerInfoByName(controllerName);
  const options = controllerInfo.methods.login.options;
  const userData = Object.entries(options?.body).reduce((acc, [key, {field}]) => {
    acc[key] = object.find((rowField) => rowField.key === field).value
    return acc;
  }, {})
  const {data} = await axiosInstance.post(controllerInfo.methods.login.path, userData);
  localStorage.setItem('accessToken', data.access_token)
  localStorage.setItem('refreshToken', data.refresh_token)
  return data
}

function replacePathParams(params, object, path) {
  return Object.entries(params).reduce((acc, [key, objectKey]) => {
    acc = acc.replace(key, object.find((field) => field.key === objectKey).value)
    return acc
  }, path);
}
