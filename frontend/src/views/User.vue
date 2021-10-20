<template>
  <user-card v-if="userExist" />
  <p class="py-24 text-xl italic text-center" v-else>This user was not found</p>
</template>

<script lang="ts">
import UserCard from "@/components/UserCard.vue";
import { ActionTypes } from "@/store/actions";
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  components: { UserCard },
  name: "User",
  computed: {
    ...mapState({
      user: "currentUser",
    }),
    userExist() {
      return Object.keys(this.user).length > 0;
    },
  },
  beforeRouteLeave() {
    this.clearCurrentUser();
  },
  created() {
    const userId = this.$route.params.id;

    this.setCurrentUser({ userId });
  },
  methods: {
    ...mapActions({
      setCurrentUser: ActionTypes.SET_CURRENT_USER,
      clearCurrentUser: ActionTypes.CLEAR_CURRENT_USER,
    }),
  },
});
</script>
