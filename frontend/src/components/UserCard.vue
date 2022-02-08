<template>
  <div class="py-10 flex items-center flex-col">
    <div
      class="h-32 w-32 p-1 mb-6 rounded-full border border-green-700 relative"
    >
      <img class="rounded-full" :src="user.picture.large" />
      <div
        class="
          flex flex-col
          items-center
          font-bold
          text-2xl
          absolute
          left-full
          top-2/4
          transform
          -translate-y-1/2
          ml-3
        "
      >
        <span
          class="px-3 cursor-pointer"
          :class="{
            'opacity-20 pointer-events-none': !checkRatingRange(
              Directions.DOWN
            ),
          }"
          @click="updateRating(Directions.DOWN)"
          >-</span
        >
        <span class="text-green-600">{{ user.rating }}</span>
        <span
          class="px-2 cursor-pointer"
          :class="{
            'opacity-20 pointer-events-none': !checkRatingRange(Directions.UP),
          }"
          @click="updateRating(Directions.UP)"
          >+</span
        >
      </div>
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
import { Details } from "@/types/user";
import { Directions } from "@/types/rating";
import { defineComponent } from "vue";
import { setLocalRatings } from "@/helpers/localUserRatings";

export default defineComponent({
  data() {
    return {
      currentTab: Details.Name,
      infoTabs: Details,
      Directions,
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
    async updateRating(direction: Directions) {
      if (this.checkRatingRange(direction) === false) return;

      const getRating = () => {
        const currentRating = this.user.rating;

        switch (direction) {
          case Directions.UP:
            return currentRating + 1;
          case Directions.DOWN:
            return currentRating - 1;
        }
      };

      const currentUserRating = { id: this.user.id, rating: getRating() };

      await this.$store.dispatch(
        ActionTypes.SET_CURRENT_USER_RATING,
        currentUserRating
      );

      const storeUsers = [
        ...this.$store.state.users.map(({ id, rating }) => ({ id, rating })),
      ];
      const userInStoreUsers = storeUsers.find(({ id }) => id === this.user.id);

      if (userInStoreUsers) {
        userInStoreUsers.rating = currentUserRating.rating;
      } else {
        storeUsers.push(currentUserRating);
      }

      setLocalRatings(storeUsers);
    },
    checkRatingRange(direction: Directions) {
      const currentRating = this.user.rating;

      switch (direction) {
        case Directions.UP:
          return currentRating < 5;
        case Directions.DOWN:
          return currentRating > 0;
      }
    },
  },
});
</script>
