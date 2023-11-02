<template>
  <div class="w-full h-full">
    <div class="grid grid-cols-12  grid-flow-col h-full w-full">
      <div
        class="bg-gray-800 col-span-2 shadow h-full">
        <router-link
          v-for="controllerInfo in controllersInfo"
          :key="controllerInfo.name"
          :to="{
            name:'controllers',
            params:{
              controllerName:controllerInfo.name
            }
          }"
          :class="[
              {
                'bg-gray-700': controllerInfo.name === selectedController,
                'text-gray-300':controllerInfo.name === selectedController,
              },
              'flex border-solid  border-b-2 rad px-6 border-gray-400  w-full justify-between text-gray-400 hover:bg-gray-600 transition hover:text-gray-300 cursor-pointer items-center py-3 text-sm'
            ]"
        >
          {{ controllerInfo.label }}
        </router-link>
      </div>
      <div v-if="controllersInfo.length> 0"
           class="col-span-10 h-full py-6 w-full max-h-screen px-10"
           style="background-color: rgb(79, 91, 115)">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import {RouterLink} from 'vue-router'

export default {
  name: 'MainPage',
  components: {RouterLink},
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      controllersInfo: 'controllersInfo/getAllControllers'
    }),
    selectedController() {
      return this.$route.params.controllerName
    }
  },
  async mounted() {
    if (!this.user.id) {
      await this.loadUser();
    }
    try {
      await this.loadControllersInfo();
    } catch (e) {
      if (e.response.status === 403) {
        this.resetAuth()
      }
    }
  },
  methods: {
    ...mapMutations({
      resetAuth: 'user/resetAuth',
    }),
    ...mapActions({
      loadUser: 'user/loadUser',
      loadControllersInfo: 'controllersInfo/loadControllersInfo',
    }),
  },
}
</script>

<style scoped>

</style>
