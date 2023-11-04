<template>
  <ul class="flex items-center -space-x-px h-8 text-sm">
    <li>
      <button
        class="flex items-center justify-center px-3 h-8 ml-0 leading-tight  border rounded-l-lg hover:bg-gray-100  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
        @click="onPaginate(controllerData.currentPage - 1)"
      >
        <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 1 1 5l4 4"/>
        </svg>
      </button>
    </li>
    <li
      v-for="pageNumber in pageCount"
      :key="pageNumber"
    >
      <button
        :class="[
              {
                'bg-gray-600': pageNumber === controllerData.currentPage + 1,
                'text-gray-300': pageNumber === controllerData.currentPage + 1,
                'bg-gray-800':pageNumber !== controllerData.currentPage + 1,
                'text-gray-400 ':pageNumber !== controllerData.currentPage + 1,
              },
              'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-700 hover:bg-gray-700 hover:text-white'
          ]"
        @click="onPaginate(pageNumber-1)"
      >
        {{ pageNumber }}
      </button>
    </li>
    <li>
      <button
        class="flex items-center justify-center px-3 h-8 leading-tight border rounded-r-lg  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
        @click="onPaginate(controllerData.currentPage + 1)"
      >
        <svg class="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 9 4-4-4-4"/>
        </svg>
      </button>
    </li>
  </ul>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ControllerPagination",
  props: {
    controllerData: {
      type: Object,
      require: true
    },
  },
  computed: {
    controllerName() {
      return this.$route.params.controllerName
    },
    pageCount() {
      return Math.ceil(this.controllerData.total / +process.env.PAGINATE_COUNT)
    },
  },
  methods: {
    ...mapActions({
      paginate: 'controllersInfo/paginate'
    }),
    onPaginate(perPage) {
      if (perPage === this.controllerData.currentPage || perPage < 0 || perPage + 1 > this.pageCount) return null
      this.paginate({
        controllerName: this.controllerName,
        perPage,
      });
    },
  }
}
</script>

<style scoped>

</style>
