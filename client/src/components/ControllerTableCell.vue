<template>
  <component
    :is="cellComponentByType"
    :cellData="cellData"
  />
</template>

<script>
import SimpleCell from "@/components/Cells/SimpleCell";
import RelationCell from "@/components/Cells/RelationCell";

export default {
  name: "ControllerTableCell",
  props: {
    cellData: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      cellComponents: {
        simple: SimpleCell,
        relation: RelationCell,
      }
    }
  },
  computed: {
    cellComponentByType() {
      const component = this.cellComponents[this.cellData.fieldType]
      return component ?? SimpleCell
    },
  }
}
</script>

<style scoped>

</style>
