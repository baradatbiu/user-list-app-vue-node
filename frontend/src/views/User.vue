<template>
  <p class="py-24 text-xl italic text-center" data-test="loader" v-if="loading">
    ...loading in progress
  </p>
  <user-card v-else-if="userExist" />
  <p class="py-24 text-xl italic text-center" v-else>This user was not found</p>
</template>

<script lang="ts">
import UserCard from "@/components/UserCard.vue";
import { ActionTypes } from "@/store/actions";
import { defineComponent } from "vue";

export default defineComponent({
  components: { UserCard },
  name: "User",
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
    userExist(): boolean {
      return Object.keys(this.user).length > 0;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  unmounted() {
    this.clearCurrentUser();
  },
  async created() {
    const userId = this.$route.params.id as string;

    await this.fetchUser(userId);
  },
  methods: {
    fetchUser(userId: string) {
      this.$store.dispatch(ActionTypes.FETCH_CURRENT_USER, { userId });
    },
    clearCurrentUser() {
      this.$store.dispatch(ActionTypes.CLEAR_CURRENT_USER);
    },
  },
});
</script>
