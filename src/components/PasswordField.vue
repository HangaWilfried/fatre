<script setup lang="ts">
import { ref } from "vue";
import type { ErrorObject } from "@vuelidate/core";
import OpenEyeIcon from "@/icons/OpenEyeIcon.vue";
import CloseEyeIcon from "@/icons/CloseEyeIcon.vue";

const model = defineModel();

defineProps<{ label: string; placeholder: string; errors?: ErrorObject[] }>();

const showPassword = ref<boolean>(false);
</script>

<template>
  <div class="flex flex-col gap-2 text-xl">
    <label class="text-zinc-900" :for="label">{{ label }}</label>
    <div class="relative flex flex-col">
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
      <span
        @click="showPassword = !showPassword"
        class="absolute left-[91%] top-[29%]"
      >
        <CloseEyeIcon v-if="showPassword" />
        <OpenEyeIcon v-else />
      </span>
    </div>
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
