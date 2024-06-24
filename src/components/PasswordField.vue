<script setup lang="ts">
import { ref } from "vue";
import { useTranslation } from "@/utils/i18n";
import type { ErrorObject } from "@vuelidate/core";

const model = defineModel();

const t = useTranslation();

defineProps<{ label: string; placeholder: string; errors?: ErrorObject[] }>();

const showPassword = ref<boolean>(false);
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="text-zinc-900" :for="label">{{ label }}</label>
    <div class="relative">
      <input
        :type="showPassword ? 'text' : 'password'"
        :id="label"
        v-model="model"
        :data-test="`input-${label}`"
        :class="[
          'ipt-border',
          errors?.length ? 'ipt-border-error' : 'ipt-border-pristine',
        ]"
        autocomplete="off"
        :placeholder="placeholder"
      />
      <span @click="showPassword = !showPassword">
        {{ t(showPassword ? "show" : "hide") }}
      </span>
    </div>
  </div>
</template>
