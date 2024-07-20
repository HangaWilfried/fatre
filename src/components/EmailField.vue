<script setup lang="ts">
import type { ErrorObject } from "@vuelidate/core";

const model = defineModel();

defineProps<{ label: string; placeholder: string; errors?: ErrorObject[] }>();
</script>

<template>
  <div class="flex flex-col gap-2 text-xl">
    <label class="text-zinc-900" :for="label">{{ label }}</label>
    <input
      :id="label"
      type="email"
      v-model="model"
      :data-test="`input-${label}`"
      :class="[
        'ipt-border',
        errors?.length ? 'ipt-border-error' : 'ipt-border-pristine',
      ]"
      autocomplete="off"
      :placeholder="placeholder"
    />
  </div>
</template>
