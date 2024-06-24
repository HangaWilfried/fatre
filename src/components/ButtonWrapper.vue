<script setup lang="ts">
defineProps<{
  isLoading?: boolean;
  label: string;
}>();
</script>

<template>
  <button
    :data-test="`${label}-btn`"
    class="py-1 px-2 flex items-center gap-2 justify-center"
  >
    <slot name="cta">
      <span v-if="isLoading" class="spinner" />
      <span v-else>{{ label }}</span>
    </slot>
  </button>
</template>

<style scoped>
.blue {
  @apply bg-blue-500 text-white rounded-lg;
}

.gray {
  @apply bg-gray-500 text-gray-900 rounded-lg;
}
</style>
