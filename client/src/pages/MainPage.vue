<template>
  <div>321</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'MainPage',
  methods: {
    ...mapActions({
      loadUser: 'user/loadUser',
    }),
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
    }),
  },
  async mounted() {
    if (!this.user.id) {
      await this.loadUser();
    }
  },
}
</script>

<style scoped>

</style>
