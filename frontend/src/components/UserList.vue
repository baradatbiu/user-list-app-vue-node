<template>
  <table class="w-full table-fixed border border-green-800 min-w-max">
    <thead>
      <tr>
        <th class="w-1/12 border border-green-600">Photo</th>
        <th
          class="border border-green-600"
          :class="{ 'bg-green-100': currentFilter === filters.Name }"
        >
          Name
        </th>
        <th
          class="border border-green-600"
          :class="{ 'bg-green-100': currentFilter === filters.Login }"
        >
          Login
        </th>
        <th
          class="w-1/3 border border-green-600"
          :class="{ 'bg-green-100': currentFilter === filters.Email }"
        >
          Email
        </th>
        <th
          class="border border-green-600"
          :class="{ 'bg-green-100': currentFilter === filters.Phone }"
        >
          Phone
        </th>
        <th class="w-1/12 border border-green-600">Actions</th>
      </tr>
    </thead>
    <tbody class="text-center">
      <tr
        v-for="user in sortedUsers"
        :key="user.id"
        class="transition-colors hover:bg-green-50"
      >
        <td class="p-2 border border-green-600">
          <div class="flex justify-center">
            <img
              class="object-contain h-12 w-12 rounded"
              :src="user.picture.thumbnail"
            />
          </div>
        </td>
        <td class="px-3 border border-green-600">
          {{ user.fullname }}
        </td>
        <td class="px-3 border border-green-600">
          {{ user.login }}
        </td>
        <td class="px-3 border border-green-600">{{ user.email }}</td>
        <td class="px-3 border border-green-600">{{ user.phone }}</td>
        <td class="px-3 border border-green-600">
          <button
            class="bg-transparent p-1"
            @click="removeUser({ id: user.id })"
          >
            <svg
              class="h-6 w-6 text-red-600 transition-colors hover:text-red-700"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
              />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Filters, Users } from "@/types/user";
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
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
  methods: {
    ...mapActions(["removeUser"]),
  },
});
</script>

<style scoped>
table {
  min-width: 950px;
}
</style>
