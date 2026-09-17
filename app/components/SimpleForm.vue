<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    placeholder?: string;
    autofocus?: boolean;
  }>(),
  {
    placeholder: "Enter username...",
    autofocus: false,
  },
);

const username = defineModel<string>("modelValue");

const handleSubmit = () => {
  const target = username.value?.trim();
  if (target) {
    navigateTo(`/${encodeURIComponent(target)}`);
  }
};
</script>

<template>
  <form
    class="font-mono w-full flex *:border *:border-zinc-300 *:dark:border-zinc-800"
    @submit.prevent="handleSubmit"
  >
    <input
      :autofocus="props.autofocus"
      class="w-full px-3 py-1.5"
      pattern="^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$"
      :placeholder="props.placeholder"
      aria-label="GitHub username"
      type="text"
      required
      v-model="username"
    />
    <button
      type="submit"
      class="cursor-pointer transition-colors hover:bg-primary/20 dark:hover:bg-primary/10 hover:border-primary/10! px-3 py-1.5 -ms-px"
    >
      Search
    </button>
  </form>
</template>
