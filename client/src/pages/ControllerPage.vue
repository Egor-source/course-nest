<template>
  <div class="h-full flex flex-col relative overflow-x-auto shadow-md sm:rounded-lg dark:bg-gray-800">
    <ControllerTable
      v-if="cols.length>0"
      :cols="cols"
      :rows="rows"
    />
    <ControllerPagination
      :controller-data="controllerData"
    />
  </div>
</template>
<script>
import ControllerTable from "@/components/ControllerTable";
import {mapActions, mapGetters} from "vuex";
import ControllerPagination from "@/components/ControllerPagination";

export default {
  name: "ControllerPage",
  components: {ControllerPagination, ControllerTable},
  computed: {
    ...mapGetters({
      getControllerDataByName: 'controllersInfo/getControllerDataByName'
    }),
    controllerName() {
      return this.$route.params.controllerName
    },
    controllerData() {
      return this.getControllerDataByName(this.controllerName)
    },
    cols() {
      if (!this.controllerData || !this.controllerData.data.length > 0) return []
      return Object.keys(this.controllerData.data[0])
    },
    rows() {
      if (!this.controllerData) return []
      return this.controllerData.data.map((object) => {
        return Object.entries(object).map(([key, value]) => ({
          key,
          value
        }))
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
      paginate: 'controllersInfo/paginate'
    }),
    pagination(scale = 0) {
      const {currentPage} = this.controllerData
      this.paginate({
        controllerName: this.controllerName,
        perPage: currentPage + scale,
      });
    }
  }
}
</script>

<style scoped>

</style>
