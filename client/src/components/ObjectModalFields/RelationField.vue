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
    <select
      :id="fieldData.key"
      v-model="value"
      :multiple="fieldData.relationInfo.multiple"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
    >
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.id"
      >
        {{ option[fieldData.relationInfo.paginateDisplayValueFrom] }}
      </option>
    </select>
  </div>
</template>

<script>
import fieldMixin from "@/components/ObjectModalFields/mixins/fieldMixin";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "RelationField",
  mixins: [fieldMixin],
  props: {
    modelValue: {
      type: Object || Array || String,
      require: true
    }
  },
  async created() {
    await this.paginate({
      controllerName: this.fieldData.relationInfo.paginateFrom,
      perPage: 0
    })
  },
  computed: {
    ...mapGetters({
      getControllerDataByName: 'controllersInfo/getControllerDataByName',
    }),
    displayValue() {
      if (!this.value) return ''
      const {relationInfo} = this.fieldData
      if (relationInfo.multiple) {
        return this.value.map((val) => {
          if (!relationInfo.displayValueFrom) return val
          return val[relationInfo.displayValueFrom]
        }).join(', ')
      }

      if (!relationInfo.displayValueFrom) return this.cellData.value

      return this.cellData.value[relationInfo.displayValueFrom]
    },
    value: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:model-value', val);
      }
    },
    options() {
      const {data} = this.getControllerDataByName(this.fieldData.relationInfo.paginateFrom)
      return data
    },
  },
  methods: {
    ...mapActions({
      paginate: 'controllersInfo/paginate'
    }),
  }
}
</script>

<style scoped>

</style>
