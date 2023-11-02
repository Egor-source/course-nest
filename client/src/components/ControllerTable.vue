<template>
    <div class="flex-1">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
        <tr>
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
            v-for="cell in row"
            :key="cell.key"
            class="px-6 py-4"
          >
            {{ cell.value }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
export default {
  name: "ControllerTable",
  props: {
    cols: {
      type: Array,
      require: true,
    },
    rows: {
      type: Array,
      require: true,
    }
  }
}
</script>

<style scoped>

</style>
