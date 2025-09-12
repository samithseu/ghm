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
    class="w-full flex *:border *:border-gray-300 *:dark:border-gray-900"
    @submit.prevent="() => navigateTo(`/${username}`)"
  >
    <input
      class="w-full px-2 py-1"
      pattern="^[\w\-\d]+$"
      :placeholder="props.placeholder"
      type="text"
      required
      v-model="username"
    />
    <button
      class="cursor-pointer transition-colors hover:bg-primary/20 dark:hover:bg-primary/10 px-2 py-1 -ms-[1px]"
    >
      Search
    </button>
  </form>
</template>
