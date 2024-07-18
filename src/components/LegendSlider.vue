<template>
  <div
    class="flex gap-1 p-2 items-center overflow-hidden w-16 absolute bottom-6 left-[45%]"
  >
    <span
      v-for="(item, index) in files"
      :class="[
        'w-1.5 h-1.5 rounded-full shrink-0 transition duration-200 ease-in-out',
        currentItem === index ? 'bg-white' : 'bg-gray-50/40',
      ]"
      :key="item"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { type PropType } from "vue";

defineProps({
  files: {
    type: Array as PropType<string[]>,
    required: true,
  },
  currentItem: {
    type: Number,
    required: true,
  },
});
</script>
