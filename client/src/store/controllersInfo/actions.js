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
  const path = Object.entries(controllerInfo.methods.delete.options.params).reduce((acc, [key, objectKey]) => {
    acc = acc.replace(key, object.find((field) => field.key === objectKey).value)
    return acc
  }, controllerInfo.methods.delete.path);
  const {data} = await axiosInstance.delete(path);
  commit('deleteObjectFromData', {controllerName, data})
}
