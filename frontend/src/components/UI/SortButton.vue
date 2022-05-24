<template>
  <button
    class="text-white bg-green-500 hover:bg-green-600 px-2 py-1 rounded"
    :class="{ 'bg-green-700': active }"
  >
    <svg
      fill="currentColor"
      class="h-5 w-5 transition-transform"
      :class="{ 'transform rotate-180': invertedIcon }"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    invertedIcon: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
