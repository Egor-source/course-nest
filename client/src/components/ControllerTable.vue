<template>
  <div class="flex-1">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th
          class="px-6 py-3"
        />
        <th
          v-for="col in cols"
          :key="col"
          class="px-6 py-3"
        >
          {{ col }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="row in rows"
        :key="row"
        class="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td
          class="px-6 py-4"
        >
          <input
            :checked="row === selectedRow"
            id="default-radio-1"
            type="radio"
            name="default-radio"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            @click="checkRadio($event, row)"
          >
        </td>
        <td
          v-for="cell in row"
          :key="cell.key"
          class="px-6 py-4"
        >
          <ControllerTableCell
            :cell-data="cell"
          />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ControllerTableCell from "@/components/ControllerTableCell";

export default {
  name: "ControllerTable",
  components: {ControllerTableCell},
  props: {
    modelValue: {
      type: Array,
      require: true,
    },
    cols: {
      type: Array,
      require: true,
    },
    rows: {
      type: Array,
      require: true,
    }
  },
  computed: {
    selectedRow: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:model-value', value)
      }
    },
  },
  methods: {
    checkRadio(e, row) {
      const isEq = this.selectedRow?.reduce((acc, field, index) => {
        acc = this.compareObjects(field, row[index])
        return acc
      }, false)

      if (isEq) {
        e.target.checked = false
        this.selectedRow = null
      } else {
        this.selectedRow = row
      }
    },
    compareObjects(obj1, obj2) {
      // Проверка на совпадение типов и наличие свойств
      if (typeof obj1 !== typeof obj2 || Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
      }

      for (const key in obj1) {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
          if (!this.compareObjects(obj1[key], obj2[key])) {
            return false;
          }
        } else if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
      return true;
    }
  }
}
</script>

<style scoped>

</style>
