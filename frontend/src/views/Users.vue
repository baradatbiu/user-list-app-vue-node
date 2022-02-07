<template>
  <div class="py-7 overflow-x-auto">
    <loader v-if="loading" data-test="loader" />
    <template v-else>
      <user-filter />
      <user-list />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserList from "@/components/UserList.vue";
import UserFilter from "@/components/UserFilter.vue";
import Loader from "@/components/UI/Loader.vue";
import { ActionTypes } from "@/store/actions";

export default defineComponent({
  components: { UserList, UserFilter, Loader },
  name: "Users",
  computed: {
    users() {
      return this.$store.state.users;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  async created() {
    if (this.users.length === 0) {
      await this.fetchUsers();
    }
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch(ActionTypes.FETCH_USERS);
    },
  },
});
</script>
