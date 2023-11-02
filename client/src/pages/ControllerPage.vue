<template>
  <ControllerTable
    v-if="cols.length>0"
    :cols="cols"
    :rows="rows"
  />
</template>
<script>
import ControllerTable from "@/components/ControllerTable";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ControllerPage",
  components: {ControllerTable},
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
      const {perPage} = this.controllerData
      this.paginate({
        controllerName: this.controllerName,
        perPage: perPage + scale,
      });
    }
  }
}
</script>

<style scoped>

</style>
