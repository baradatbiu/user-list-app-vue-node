<template>
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
    :class="{ 'bg-green-700': active }"
  >
    {{ title }}
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
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
