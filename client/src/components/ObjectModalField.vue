<template>
  <component
    :is="cellComponentByType"
    :fieldData="fieldData"
    v-model="value"
  />
</template>

<script>
import SimpleField from "@/components/ObjectModalFields/SimpleField";
import RelationField from "@/components/ObjectModalFields/RelationField";

export default {
  name: "ObjectModalField",
  props: {
    fieldData: {
      type: Object,
      require: true
    },
    modelValue: {
      type: Object || Array || String,
      require: true
    }
  },
  data() {
    return {
      fieldComponents: {
        simple: SimpleField,
        relation: RelationField,
      }
    }
  },
  computed: {
    cellComponentByType() {
      const component = this.fieldComponents[this.fieldData.fieldType]
      return component ?? SimpleField
    },
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

<style >
.require:after {
  content: " *";
  color: #e9573f;
}
</style>
