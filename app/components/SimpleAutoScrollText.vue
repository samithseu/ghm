<script lang="ts" setup>
const props = defineProps<{
  classes?: string;
  copyCallback?: () => void;
}>();
</script>

<template>
  <div
    class="w-full overflow-hidden overflow-x-auto no-scrollbar h-max cursor-copy py-1.5 px-3 select-none scroll-smooth"
    :class="props.classes"
    @click="props.copyCallback && props.copyCallback()"
    @keydown.enter="props.copyCallback && props.copyCallback()"
  >
    <code class="text-nowrap"><slot /></code>
  </div>
</template>
