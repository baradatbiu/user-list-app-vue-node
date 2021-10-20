<template>
  <div class="py-10 flex items-center flex-col">
    <div class="h-32 w-32 p-1 mb-6 rounded-full border border-green-700">
      <img class="rounded-full" :src="user.picture.large" />
    </div>
    <div class="py-3 mb-5 text-2xl text-green-500 font-semibold">
      {{ userInfoByField }}
    </div>
    <ul class="flex">
      <li v-for="tab in infoTabs" :key="tab" class="p-2 mx-1.5">
        <button
          class="
            uppercase
            transition-colors
            border-b-2 border-transparent
            hover:border-green-700
          "
          :class="{ 'border-green-700': currentTab === tab }"
          @click="currentTab = tab"
        >
          {{ tab }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Details } from "@/types/user";
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  data() {
    return {
      currentTab: Details.Name,
      infoTabs: Details,
    };
  },
  computed: {
    ...mapState({
      user: "currentUser",
    }),
    userInfoByField(): string | number {
      return this.user[this.currentTab];
    },
  },
});
</script>
