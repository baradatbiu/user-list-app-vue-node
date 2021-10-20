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
import { mapActions, mapState } from "vuex";

export default defineComponent({
  components: { UserList, UserFilter },
  name: "Users",
  computed: {
    ...mapState(["users", "loading"]),
  },
  async created() {
    if (this.users.length === 0) {
      await this.fetchUsers();
    }
  },
  methods: {
    ...mapActions(["fetchUsers"]),
  },
});
</script>
