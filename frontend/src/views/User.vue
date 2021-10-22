<template>
  <user-card v-if="userExist" />
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
  },
  unmounted() {
    this.clearCurrentUser();
  },
  created() {
    const userId = this.$route.params.id as string;

    this.setCurrentUser(userId);
  },
  methods: {
    setCurrentUser(userId: string) {
      this.$store.dispatch(ActionTypes.SET_CURRENT_USER, { userId });
    },
    clearCurrentUser() {
      this.$store.dispatch(ActionTypes.CLEAR_CURRENT_USER);
    },
  },
});
</script>
