<template>
  <table class="w-full table-fixed border border-green-800 min-w-max">
    <thead>
      <tr>
        <th class="w-1/12 border border-green-600">Photo</th>
        <header-cell
          v-for="(key, value) in filters"
          :key="key"
          :title="value"
          :active="currentFilter === key"
          :class="{ 'w-1/3': key === 'email' }"
          >{{ value }}</header-cell
        >
        <th class="w-1/12 border border-green-600">Actions</th>
      </tr>
    </thead>
    <tbody class="text-center">
      <user-table-row v-for="user in sortedUsers" :key="user.id" :user="user" />
    </tbody>
  </table>
</template>

<script lang="ts">
import { Filters, Users } from "@/types/user";
import { defineComponent } from "vue";
import HeaderCell from "./UI/HeaderCell.vue";
import UserTableRow from "./UserTableRow.vue";

export default defineComponent({
  components: { HeaderCell, UserTableRow },
  data() {
    return {
      filters: Filters,
    };
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
    currentFilter() {
      return this.$store.state.currentFilter;
    },
    directSortOrder() {
      return this.$store.state.directSortOrder;
    },
    sortedUsers(): Users {
      if (this.currentFilter === "") return this.users;

      const usersClone = [...this.users];
      const sortKey = this.currentFilter;

      const sortedUsers = usersClone.sort((a, b) =>
        a[sortKey].localeCompare(b[sortKey])
      );

      return this.directSortOrder ? sortedUsers : sortedUsers.reverse();
    },
  },
});
</script>

<style scoped>
table {
  min-width: 950px;
}
</style>
