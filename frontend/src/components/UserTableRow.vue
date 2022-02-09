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
      <user-rating :user="user" @update-rating="updateRating" />
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
import { User, UserRating as Rating } from "@/types/user";
import { defineComponent, PropType } from "vue";
import EnterButton from "./UI/EnterButton.vue";
import RemoveButton from "./UI/RemoveButton.vue";
import UserRating from "./UserRating.vue";
import { setLocalRatings } from "@/helpers/localUserRatings";

export default defineComponent({
  components: { RemoveButton, EnterButton, UserRating },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
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
    async updateRating(rating: Rating) {
      await this.$store.dispatch(ActionTypes.UPDATE_USER_RATING, rating);

      setLocalRatings(
        this.$store.state.users.map(({ id, rating }) => ({ id, rating }))
      );
    },
  },
});
</script>
