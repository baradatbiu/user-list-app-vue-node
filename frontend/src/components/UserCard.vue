<template>
  <div class="py-10 flex items-center flex-col">
    <div class="h-32 w-32 p-1 mb-6 rounded-full border border-green-700">
      <img class="rounded-full" :src="user.picture.large" />
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
import { Details } from "@/types/user";
import { defineComponent } from "vue";

export default defineComponent({
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
  },
});
</script>
