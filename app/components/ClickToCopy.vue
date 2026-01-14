<script setup lang="ts">
const props = defineProps<{
  copyState: boolean;
}>();

const enter_leave_active =
  "transition-[scale,opacity] duration-200 ease-in-out";
const enter_from_leave_to = "opacity-0 scale-50";
</script>

<template>
  <p
    class="text-sm text-center text-gray-500 dark:text-white/40 inline-flex justify-center gap-1.5 items-center relative w-fit mx-auto"
  >
    <span class="-ml-5.5">click on email to copy</span>
    <Transition
      :enter-active-class="enter_leave_active"
      :leave-active-class="enter_leave_active"
      :enter-from-class="enter_from_leave_to"
      :leave-to-class="enter_from_leave_to"
    >
      <span class="absolute -right-5.5" v-if="copyState">
        <Icon class="text-base text-primary" name="lucide:copy-check" />
      </span>
      <span class="absolute -right-5.5" v-else>
        <Icon class="text-base" name="lucide:copy" />
      </span>
    </Transition>
  </p>
</template>
