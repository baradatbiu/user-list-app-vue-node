<template>
  <div class="py-10 flex items-center flex-col">
    <div
      class="h-32 w-32 p-1 mb-6 rounded-full border border-green-700 relative"
    >
      <img class="rounded-full" :src="user.picture" />
      <user-rating
        class="
          flex-col
          text-2xl
          absolute
          left-full
          top-2/4
          transform
          -translate-y-1/2
          ml-3
        "
        :user="user"
        @update-rating="updateRating"
      />
    </div>
    <div
      data-test="user-info"
      class="py-3 mb-5 text-2xl text-green-500 font-semibold"
    >
      {{ userInfoByField }}
    </div>
    <ul class="flex flex-wrap justify-center">
      <li v-for="tab in infoTabs" :key="tab" class="p-2 mx-1.5">
        <button
          :data-test="`tab-${tab}`"
          class="
            uppercase
            transition-colors
            border-b-2 border-transparent
            hover:border-green-700
          "
          :class="{ 'border-green-700': currentTab === tab }"
          @click="changeTab(tab)"
        >
          {{ tab }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/actions";
import { Details, UserRating as Rating } from "@/types/user";
import UserRating from "./UserRating.vue";
import { defineComponent } from "vue";
import { setLocalRatings } from "@/helpers/localUserRatings";

export default defineComponent({
  components: { UserRating },
  data() {
    return {
      currentTab: Details.Name,
      infoTabs: Details,
    };
  },
  computed: {
    user() {
      return this.$store.state.currentUser;
    },
    userInfoByField(): string | number {
      return this.user[this.currentTab];
    },
  },
  methods: {
    changeTab(tab: Details) {
      this.currentTab = tab;
    },
    async updateRating(currentRating: Rating) {
      await this.$store.dispatch(
        ActionTypes.SET_CURRENT_USER_RATING,
        currentRating
      );

      const storeUsers = [
        ...this.$store.state.users.map(({ id, rating }) => ({ id, rating })),
      ];
      const userInStoreUsers = storeUsers.find(({ id }) => id === this.user.id);

      if (userInStoreUsers) {
        userInStoreUsers.rating = currentRating.rating;
      } else {
        storeUsers.push(currentRating);
      }

      setLocalRatings(storeUsers);
    },
  },
});
</script>
