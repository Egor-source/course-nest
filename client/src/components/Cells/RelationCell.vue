<template>
  <div>{{ displayValue }}</div>
</template>

<script>
import cellMixin from "@/components/Cells/mixins/cellMixin";

export default {
  name: "RelationCell",
  mixins: [cellMixin],
  computed: {
    displayValue() {
      const {relationInfo} = this.cellData
      if (relationInfo.multiple) {
        return this.cellData.value.map((val) => {
          if (!relationInfo.displayValueFrom) return val
          return val[relationInfo.displayValueFrom]
        }).join(', ')
      }

      if (!relationInfo.displayValueFrom) return this.cellData.value

      return this.cellData.value[relationInfo.displayValueFrom]
    }
  },
}
</script>

<style scoped>

</style>
