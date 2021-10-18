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
import { mapState } from "vuex";
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
    ...mapState(["users", "currentFilter", "directSortOrder"]),
    sortedUsers(): Users {
      if (this.currentFilter === "") return this.users;

      const usersClone = [...this.users];

      const sortedUsers = usersClone.sort((a, b) =>
        a[this.currentFilter].localeCompare(b[this.currentFilter])
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
