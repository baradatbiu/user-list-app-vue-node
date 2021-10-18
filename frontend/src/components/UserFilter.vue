<template>
  <div class="flex items-center justify-end mb-6 uppercase">
    <span class="font-medium">sort by</span>
    <button
      class="
        text-sm text-white
        bg-green-500
        hover:bg-green-600
        px-4
        py-1
        ml-5
        rounded
        uppercase
      "
      v-for="(key, value) in filters"
      :key="key"
      :class="{ 'bg-green-700': currentFilter === key }"
      @click="changeSortFilter(key)"
    >
      {{ value }}
    </button>
    <span class="mx-3 h-6 w-0.5 bg-gray-600"></span>
    <button
      class="text-white bg-green-500 hover:bg-green-600 px-2 py-1 rounded"
      :class="{ 'bg-green-700': currentFilter }"
      @click="toogleSortOrder"
    >
      <svg
        fill="currentColor"
        class="h-5 w-5 transition-transform"
        :class="{ 'transform rotate-180': !directSortOrder }"
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { Filters } from "@/types/user";
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  data() {
    return {
      filters: Filters,
    };
  },
  computed: {
    ...mapState(["currentFilter", "directSortOrder"]),
  },
  methods: {
    ...mapActions(["changeSortFilter", "toogleSortOrder"]),
  },
});
</script>

<style scoped></style>
