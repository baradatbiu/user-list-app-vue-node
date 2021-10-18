<template>
  <tr class="transition-colors hover:bg-green-50">
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
      <remove-button @click="removeUser({ id: user.id })" />
    </td>
  </tr>
</template>

<script lang="ts">
import { User } from "@/types/user";
import { defineComponent, PropType } from "vue";
import { mapActions } from "vuex";
import RemoveButton from "./UI/RemoveButton.vue";

export default defineComponent({
  components: { RemoveButton },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  methods: {
    ...mapActions(["removeUser"]),
  },
});
</script>
