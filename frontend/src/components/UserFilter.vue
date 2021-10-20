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
      @click="changeSortFilter(key)"
    />
    <span class="mx-3 h-6 w-0.5 bg-gray-600"></span>
    <sort-button
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
import { mapActions, mapState } from "vuex";
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
    ...mapState(["currentFilter", "directSortOrder"]),
  },
  methods: {
    ...mapActions({
      changeSortFilter: ActionTypes.CHANGE_SORT_FILTER,
      toogleSortOrder: ActionTypes.TOOGLE_SORT_ORDER,
    }),
  },
});
</script>
