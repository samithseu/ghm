<script setup lang="ts">
const props = defineProps<{
  copyState: boolean;
}>();
</script>

<template>
  <small
    class="text-center text-gray-500 dark:text-white/40 md:flex md:items-center md:justify-center md:gap-1"
  >
    click on email to copy
    <Icon
      v-if="copyState"
      style="view-transition-name: icon"
      class="mt-0.5 text-base text-primary"
      name="lucide:copy-check"
    />
    <Icon
      v-else
      style="view-transition-name: icon"
      class="mt-0.5 text-base"
      name="lucide:copy"
    />
  </small>
</template>
