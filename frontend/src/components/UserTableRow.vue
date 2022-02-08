<template>
  <tr
    class="transition-colors hover:bg-green-50"
    :class="{
      'opacity-50 pointer-events-none': loading,
      'bg-red-50': user.rating < 3,
    }"
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
      <div class="flex items-center justify-center font-bold text-lg">
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
    </td>
    <td class="px-3 border border-green-600">
      <div class="flex items-center justify-center">
        <enter-button
          @click="redirectToUser"
          title="Go to user"
          data-test="enter-btn"
        />
        <remove-button
          @click="removeUser"
          title="Remove user"
          data-test="remove-btn"
        />
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/actions";
import { User } from "@/types/user";
import { Directions } from "@/types/rating";
import { defineComponent, PropType } from "vue";
import EnterButton from "./UI/EnterButton.vue";
import RemoveButton from "./UI/RemoveButton.vue";
import { setLocalRatings } from "@/helpers/localUserRatings";

export default defineComponent({
  components: { RemoveButton, EnterButton },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      Directions,
    };
  },
  methods: {
    redirectToUser() {
      this.$router.push({ name: "User", params: { id: this.user.id } });
    },
    async removeUser() {
      try {
        this.loading = true;

        await this.$store.dispatch(ActionTypes.REMOVE_USER, {
          userId: this.user.id,
        });
      } finally {
        this.loading = false;
      }
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

      await this.$store.dispatch(ActionTypes.UPDATE_USER_RATING, {
        id: this.user.id,
        rating: getRating(),
      });

      setLocalRatings(
        this.$store.state.users.map(({ id, rating }) => ({ id, rating }))
      );
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
