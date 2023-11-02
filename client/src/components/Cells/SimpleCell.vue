<template>
  <div>{{ cellData.value }}</div>
</template>

<script>
import cellMixin from "@/components/Cells/mixins/cellMixin";

export default {
  name: "SimpleCell",
  mixins: [cellMixin],
}
</script>

<style scoped>

</style>
