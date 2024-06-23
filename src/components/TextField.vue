<script setup lang="ts">
import type { ErrorObject } from "@vuelidate/core";

const model = defineModel();

defineProps<{ label: string; placeholder: string; errors?: ErrorObject[] }>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="text-zinc-900" :for="label">{{ label }}</label>
    <input
      type="text"
      :id="label"
      v-model="model"
      :class="[
        'ipt-border',
        errors?.length ? 'ipt-border-error' : 'ipt-border-pristine',
      ]"
      :placeholder="placeholder"
    />
  </div>
</template>
