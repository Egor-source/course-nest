<template>
  <teleport
    to="body"
  >
    <div
      v-if="modelValue"
      class="
          absolute
          inset-0
          flex
          items-center
          justify-center
          bg-gray-700 bg-opacity-50
        "
      @click.self="hideModal"
    >
      <div class="max-w-2xl p-6 mx-4 bg-white rounded-md shadow-xl">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl">{{ title }}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 text-red-900 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            @click="hideModal"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="mt-4">
          <ObjectModalField
            class="mt-4"
            v-for="field in fields"
            :key="field.key"
            :field-data="field"
            v-model="values[field.key]"
          />
          <div
            v-if="error"
            class="p-4 mt-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50  text-red-400" role="alert"
          >
            <span class="font-medium">{{ error }}</span>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button
            class="px-6 py-2 text-blue-800 border border-blue-600 rounded"
            @click="onCancel"
          >
            Отмена
          </button>
          <button
            class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded"
            @click="onOk"
          >
            Ок
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import ObjectModalField from "@/components/ObjectModalField";

export default {
  name: "ObjectModal",
  components: {ObjectModalField},
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    fields: {
      type: Object,
      require: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
  watch: {
    modelValue(val) {
      if (!val) return null
      this.values = {}
      this.fields.forEach(({key, value}) => (this.values[key] = value))
    }
  },
  data() {
    return {
      values: {},
      error: '',
    }
  },
  methods: {
    onOk() {
      for (const {key, require} of this.fields) {
        if (require && !this.values[key]) {
          this.error = 'Не все обязательыне поля заполнены'
          return null
        }
      }
      this.$emit('ok', this.values)
      this.hideModal()
    },
    onCancel() {
      this.hideModal()
    },
    hideModal() {
      this.error = ''
      this.$emit('update:model-value', false)
    },
  }
}
</script>

<style scoped>

</style>
