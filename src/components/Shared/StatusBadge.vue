<template>
  <div
    class="px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium whitespace-nowrap w-fit"
    :class="statusClasses"
  >
    {{ capitalizedStatus }}
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

const capitalizedStatus = computed(() => {
  if (!props.status) return "";
  return props.status.charAt(0).toUpperCase() + props.status.slice(1);
});

const statusClasses = computed(() => {
  switch (props.status) {
    case "success":
      return "bg-[var(--bg-primary)] text-[var(--text-success-primary)] border border-[var(--border-success-subtle)] dark:bg-green-900/30 dark:text-green-400";
    case "pending":
      return "bg-[var(--bg-warning-primary)] text-[var(--text-warning-primary)] border border-[var(--border-success-subtle)] dark:bg-green-900/30 dark:text-green-400";
    case "rejected":
      return "bg-[var(--bg-primary)] text-[var(--success-primary)] border border-[var(--border-success-subtle)] dark:bg-green-900/30 dark:text-green-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
  }
});
</script>
