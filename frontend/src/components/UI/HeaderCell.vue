<template>
  <th class="border border-green-600" :class="{ 'bg-green-100': active }">
    {{ title }}
  </th>
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
