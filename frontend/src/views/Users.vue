<template>
  <div class="py-7 overflow-x-auto">
    <p class="py-24 text-xl italic text-center" v-if="loading">
      ...loading in progress
    </p>
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
import { ActionTypes } from "@/store/actions";

export default defineComponent({
  components: { UserList, UserFilter },
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
