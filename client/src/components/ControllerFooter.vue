<template>
  <div
    class="py-3 px-4 border-solid flex justify-between border-t-2  border-gray-400"
  >
    <div class="flex gap-2">
      <button
        v-if="isMethodExist({controllerName, method:'create'})"
        class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        @click="showCreateModal"
      >
        Добавить
      </button>
      <button
        v-if="isMethodExist({controllerName, method:'update'})"
        :disabled="!selectedRow"
        class="disabled:opacity-25  flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        @click="showUpdateModal"
      >
        Редактировать
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
    v-model="isShowCreateModal"
    :fields="createModalFields"
    title="Добавить"
    @ok="onCreate"
  />
  <ObjectModal
    v-model="isShowUpdateModal"
    :fields="updateModalFields"
    title="Изменить"
    @ok="onUpdate"
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
      isShowCreateModal: false,
      isShowUpdateModal: false,
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
    },
    updateModalFields() {
      const updateOptions = this.getMethodOptions({controllerName: this.controllerName, method: 'update'});
      if (!updateOptions) return null
      return Object.entries(updateOptions.body).map(([key, field]) => {
        const relationInfo = this.controllerInfo.options?.relationFields?.find(({fieldName}) => fieldName === key)
        const fieldData = {
          key,
          ...field,
          value: this.selectedRow?.find((rowField) => rowField.key === field.field)?.value,
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
      update: 'controllersInfo/update',
    }),
    showCreateModal() {
      this.isShowCreateModal = true;
    },
    showUpdateModal() {
      this.isShowUpdateModal = true;
    },
    onCreate(createData) {
      this.create({
        controllerName: this.controllerName,
        createData
      })
    },
    async onUpdate(updateData) {
      await this.update({
        controllerName: this.controllerName,
        object: this.selectedRow,
        updateData
      })
      this.$emit('clearSelectedRow')
    },
    async onDelete() {
      await this.delete({
        controllerName: this.controllerName,
        object: this.selectedRow,
      })
      this.$emit('clearSelectedRow')
    },
  }
}
</script>

<style scoped>

</style>
