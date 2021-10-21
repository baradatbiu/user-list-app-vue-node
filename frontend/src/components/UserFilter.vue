<template>
  <div
    class="flex items-center justify-end mb-6 uppercase"
    style="min-width: 500px"
  >
    <span class="font-medium">sort by</span>
    <filter-button
      v-for="(key, value) in filters"
      :key="key"
      :title="value"
      :active="currentFilter === key"
      :data-test="`filter-${key}`"
      @click="changeSortFilter(key)"
    />
    <span class="mx-3 h-6 w-0.5 bg-gray-600"></span>
    <sort-button
      data-test="sort-btn"
      :active="Boolean(currentFilter)"
      :invertedIcon="!directSortOrder"
      @click="toogleSortOrder"
    />
  </div>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/actions";
import { Filters } from "@/types/user";
import { defineComponent } from "vue";
import FilterButton from "./UI/FilterButton.vue";
import SortButton from "./UI/SortButton.vue";

export default defineComponent({
  components: { SortButton, FilterButton },
  data() {
    return {
      filters: Filters,
    };
  },
  computed: {
    currentFilter() {
      return this.$store.state.currentFilter;
    },
    directSortOrder() {
      return this.$store.state.directSortOrder;
    },
  },
  methods: {
    toogleSortOrder() {
      this.$store.dispatch(ActionTypes.TOOGLE_SORT_ORDER);
    },
    changeSortFilter(filter: Filters) {
      this.$store.dispatch(ActionTypes.CHANGE_SORT_FILTER, filter);
    },
  },
});
</script>
