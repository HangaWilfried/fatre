<script setup lang="ts">
import type { ErrorObject } from "@vuelidate/core";

const model = defineModel();

defineProps<{ label: string; placeholder?: string; errors?: ErrorObject[] }>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="text-zinc-900" :for="label">{{ label }}</label>
    <input
      type="text"
      :id="label"
      :data-test="`input-${label}`"
      v-model="model"
      :class="[
        'ipt-border',
        errors?.length ? 'ipt-border-error' : 'ipt-border-pristine',
      ]"
      :placeholder="placeholder"
    />
    <div v-if="errors?.length" class="flex flex-col gap-0.5">
      <span
        v-for="error in errors"
        :key="error.$uid"
        class="text-rose-600 font-bold text-sm"
      >
        {{ error.$message }}
      </span>
    </div>
  </div>
</template>
