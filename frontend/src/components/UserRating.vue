<template>
  <div class="flex items-center justify-center font-bold text-lg">
    <span
      class="px-3 cursor-pointer"
      :class="{
        'opacity-20 pointer-events-none': !checkRatingRange(Directions.DOWN),
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
</template>

<script lang="ts">
import { User } from "@/types/user";
import { defineComponent, PropType } from "vue";

enum Directions {
  UP = "up",
  DOWN = "down",
}

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  data() {
    return {
      Directions,
    };
  },
  methods: {
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

      this.$emit("updateRating", currentUserRating);
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
