<template>
  <div
    class="py-3 px-4 border-solid flex justify-between border-t-2  border-gray-400"
  >
    <div class="flex gap-2">
      <button
        v-if="isMethodExist({controllerName, method:'create'})"
        class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        @click="showModal"
      >
        Добавить
      </button>
      <button
        v-if="isMethodExist({controllerName, method:'delete'})"
        :disabled="!selectedRow"
        class="disabled:opacity-25 flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        @click="onDelete"
      >
        Удалить
      </button>
    </div>
    <ControllerPagination
      :controller-data="controllerData"
    />
  </div>
  <ObjectModal
    v-model="isShowModal"
    :fields="createModalFields"
    title="Добавить"
    @ok="onCreate"
  />
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ControllerPagination from "@/components/ControllerPagination";
import ObjectModal from "@/components/ObjectModal";

export default {
  name: "ControllerFooter",
  components: {ControllerPagination, ObjectModal},
  props: {
    selectedRow: {
      type: Array,
      require: true,
    }
  },
  data() {
    return {
      isShowModal: false,
    }
  },
  computed: {
    ...mapGetters({
      getControllerDataByName: 'controllersInfo/getControllerDataByName',
      getControllerInfoByName: 'controllersInfo/getControllerInfoByName',
      getMethodOptions: 'controllersInfo/getMethodOptions',
      isMethodExist: 'controllersInfo/isMethodExist',
    }),
    controllerName() {
      return this.$route.params.controllerName
    },
    controllerData() {
      return this.getControllerDataByName(this.controllerName)
    },
    controllerInfo() {
      return this.getControllerInfoByName(this.controllerName)
    },
    createModalFields() {
      const createOptions = this.getMethodOptions({controllerName: this.controllerName, method: 'create'});
      return Object.entries(createOptions.body).map(([key, field]) => {
        const relationInfo = this.controllerInfo.options?.relationFields?.find(({fieldName}) => fieldName === key)
        const fieldData = {
          key,
          ...field,
          value: '',
          fieldType: relationInfo ? 'relation' : 'simple',
        }
        if (relationInfo) {
          fieldData.relationInfo = relationInfo
        }
        return fieldData
      })
    }
  },
  methods: {
    ...mapActions({
      create: 'controllersInfo/create',
      delete: 'controllersInfo/deleteObject',
    }),
    showModal() {
      this.isShowModal = true;
    },
    onCreate(createData) {
      this.create({
        controllerName: this.controllerName,
        createData
      })
    },
    async onDelete() {
      await this.delete({
        controllerName: this.controllerName,
        object: this.selectedRow,
      })
      this.$emit('objectDeleted')
    },
  }
}
</script>

<style scoped>

</style>
