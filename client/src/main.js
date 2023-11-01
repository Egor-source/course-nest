import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import axiosInstance from '@/axios'
import './assets/tailwind.css'
import './index.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.config.globalProperties.$axios = axiosInstance
app.mount('#app')
