<script setup lang="ts">
const model = defineModel<string>();

defineProps<{ label: string; placeholder?: string }>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="text-zinc-900" :for="label">{{ label }}</label>
    <textarea
      :id="label"
      :data-test="`input-${label}`"
      v-model="model"
      class="scroll ipt-border ipt-border-pristine resize-none h-32 p-4"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>
