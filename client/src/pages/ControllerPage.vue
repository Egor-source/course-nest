<template>
  <div class="h-full flex flex-col relative overflow-x-auto shadow-md sm:rounded-lg bg-gray-800">
    <ControllerTable
      v-model="selectedRow"
      v-if="cols.length>0"
      :cols="cols"
      :rows="rows"
    />
    <ControllerFooter
      :selected-row="selectedRow"
      @clearSelectedRow="selectedRow = null"
    />
  </div>
</template>
<script>
import ControllerTable from "@/components/ControllerTable";
import {mapActions, mapGetters} from "vuex";
import ControllerFooter from "@/components/ControllerFooter";

export default {
  name: "ControllerPage",
  components: {ControllerFooter, ControllerTable},
  data() {
    return {
      selectedRow: null,
    }
  },
  computed: {
    ...mapGetters({
      getControllerDataByName: 'controllersInfo/getControllerDataByName',
      getControllerInfoByName: 'controllersInfo/getControllerInfoByName',
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
    cols() {
      if (!this.controllerData || !this.controllerData.data.length > 0) return []
      return Object.keys(this.controllerData.data[this.controllerData.data.length - 1])
    },
    rows() {
      if (!this.controllerData) return []
      return this.controllerData.data.map((object) => {
        const row = Object.entries(object).map(([key, value]) => {
          const relationInfo = this.controllerInfo.options?.relationFields?.find(({fieldName}) => fieldName === key)
          const fieldData = {
            key,
            value,
            fieldType: relationInfo ? 'relation' : 'simple',
          }
          if (relationInfo) {
            fieldData.relationInfo = relationInfo
          }
          return fieldData
        })
        return row.reduce((acc, field) => {
          const index = this.cols.indexOf(field.key);
          if (index !== -1) {
            acc[index] = field
          }
          return acc
        }, [])
      })
    },
  },
  watch: {
    controllerName() {
      this.pagination()
    }
  },
  mounted() {
    this.pagination()
  },
  methods: {
    ...mapActions({
      paginate: 'controllersInfo/paginate',
      create: 'controllersInfo/create',
    }),
    pagination() {
      this.selectedRow = null;
      const {currentPage} = this.controllerData
      this.paginate({
        controllerName: this.controllerName,
        perPage: currentPage,
      });
    },
  }
}
</script>

<style scoped>

</style>
