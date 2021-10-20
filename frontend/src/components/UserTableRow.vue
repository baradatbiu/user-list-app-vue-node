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
      <div class="flex items-center justify-center">
        <enter-button
          @click="$router.push({ name: 'User', params: { id: user.id } })"
          title="Go to user"
        />
        <remove-button
          @click="removeUser({ userId: user.id })"
          title="Remove user"
        />
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { ActionTypes } from "@/store/actions";
import { User } from "@/types/user";
import { defineComponent, PropType } from "vue";
import { mapActions } from "vuex";
import EnterButton from "./UI/EnterButton.vue";
import RemoveButton from "./UI/RemoveButton.vue";

export default defineComponent({
  components: { RemoveButton, EnterButton },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
  methods: {
    ...mapActions({ removeUser: ActionTypes.REMOVE_USER }),
  },
});
</script>
