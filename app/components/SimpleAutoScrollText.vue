<script lang="ts" setup>
const props = defineProps<{
  classes?: string;
  copyCallback?: () => void;
}>();
</script>

<template>
  <div
    class="overflow-x-auto no-scrollbar h-max cursor-copy py-1 px-2 select-all"
    :class="props.classes"
    @click="props.copyCallback && props.copyCallback()"
  >
    <code class="text-nowrap"><slot /></code>
  </div>
</template>
