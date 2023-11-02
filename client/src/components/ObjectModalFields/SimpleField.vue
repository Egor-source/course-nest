<template>
  <div>
    <label
      :for="fieldData.key"
      :class="['block text-sm font-medium leading-6 text-gray-900',{
        require: fieldData.require
      }]"
    >
      {{ fieldData.label }}
    </label>
    <input
      v-model="value"
      :id="fieldData.key"
      :name="fieldData.key"
      class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
  </div>
</template>

<script>
import fieldMixin from "@/components/ObjectModalFields/mixins/fieldMixin";

export default {
  name: "SimpleField",
  mixins: [fieldMixin],
  props: {
    modelValue: {
      type: String,
      require: true
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:model-value', val);
      }
    },
  }
}
</script>

<style scoped>

</style>
