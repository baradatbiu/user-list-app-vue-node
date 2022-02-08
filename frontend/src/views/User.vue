<template>
  <loader v-if="loading" />
  <user-card v-else-if="userExist" />
  <p class="py-24 text-xl italic text-center" v-else>This user was not found</p>
</template>

<script lang="ts">
import UserCard from "@/components/UserCard.vue";
import Loader from "@/components/UI/Loader.vue";
import { ActionTypes } from "@/store/actions";
import { defineComponent } from "vue";
import { getLocalRatings } from "@/helpers/localUserRatings";

export default defineComponent({
  components: { UserCard, Loader },
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
    this.$store.dispatch(ActionTypes.CLEAR_CURRENT_USER);
  },
  async created() {
    const userId = this.$route.params.id as string;

    await this.$store.dispatch(ActionTypes.FETCH_CURRENT_USER, { userId });

    const ratings = getLocalRatings();
    const currentUserRating = ratings.find(({ id }) => id === userId);

    if (currentUserRating) {
      this.$store.dispatch(
        ActionTypes.SET_CURRENT_USER_RATING,
        currentUserRating
      );
    }
  },
});
</script>
