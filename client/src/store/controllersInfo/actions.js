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
