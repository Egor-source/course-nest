import {createStore} from 'vuex'
import user from './user'
import controllersInfo from './controllersInfo'

export default createStore({
  modules: {
    user,
    controllersInfo
  }
})
