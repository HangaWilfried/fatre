<script setup lang="ts">
import type { Theme } from "@/utils/enum";

defineProps<{
  isLoading?: boolean;
  theme?: Theme;
  label: string;
}>();
</script>

<template>
  <button
    :data-test="`${label}-btn`"
    :class="[
      'py-1 px-2 min-w-14 flex items-center gap-2 justify-center',
      theme,
    ]"
    :disabled="isLoading"
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
  @apply bg-gray-600 text-white rounded-lg;
}

.red {
  @apply bg-red-500 text-white rounded-lg;
}

.dark {
  @apply text-white bg-gray-700 rounded-lg;
}
</style>
