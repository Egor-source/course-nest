<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Авторизация</h2>
    </div>

    <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <div>
          <label for="login" class="block text-sm font-medium leading-6 text-gray-900">Логин</label>
          <div class="mt-2">
            <input
              v-model="login"
              id="login"
              name="login"
              class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
          <div class="mt-2">
            <input
              v-model="password"
              id="password"
              name="password"
              class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <button
            :disabled="isDisableSendButton"
            class="disabled:opacity-50 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="authUser"
          >
            Войти
          </button>
        </div>
        <div
          v-if="error"
          class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  dark:text-red-400" role="alert"
        >
          <span class="font-medium">{{ error }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      login: '',
      password: '',
      error: ''
    }
  },
  computed: {
    isDisableSendButton() {
      return !this.login || !this.password;
    }
  },
  methods: {
    ...mapActions({
      auth: 'user/login'
    }),
    async authUser() {
      try {
        await this.auth({
          login: this.login,
          password: this.password
        })
        this.$router.push({name: 'Main'})
      } catch (e) {
        if (e.response.status === 401) {
          this.error = 'Не верный логин или пароль'
        } else {
          this.error = 'Ошибка'
        }
      }
    }
  }
}
</script>

<style scoped>
.display-block {
  display: block;
}
</style>
