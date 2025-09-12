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
    class="font-mono w-full flex *:border *:border-zinc-300 *:dark:border-zinc-800"
    @submit.prevent="() => navigateTo(`/${username}`)"
  >
    <input
      class="w-full px-3 py-1.5"
      pattern="^[\w\-\d]+$"
      :placeholder="props.placeholder"
      type="text"
      required
      v-model="username"
    />
    <button
      class="cursor-pointer transition-colors hover:bg-primary/20 dark:hover:bg-primary/10 hover:!border-primary/10 px-3 py-1.5 -ms-[1px]"
    >
      Search
    </button>
  </form>
</template>
