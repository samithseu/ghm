<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    placeholder?: string;
  }>(),
  {
    placeholder: "Enter username...",
  }
);

const username = defineModel<string>("modelValue");
</script>

<template>
  <form
    class="w-full flex gap-2"
    @submit.prevent="() => navigateTo(`/${username}`)"
  >
    <input
      class="w-full px-2 py-1 border border-gray-300 rounded-md dark:border-white/10"
      pattern="^[\w\-\d]+$"
      :placeholder="props.placeholder"
      type="text"
      required
      v-model="username"
    />
    <button
      class="cursor-pointer px-2 py-1 border border-gray-300 rounded-md dark:border-white/10"
    >
      Search
    </button>
  </form>
</template>
