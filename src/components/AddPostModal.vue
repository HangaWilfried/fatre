<template>
  <ModalWrapper @close="$emit('closeModal')">
    <div class="space-y-4">
      <h1 class="p-4 pt-0 border-b border-gray-300">Form to add product</h1>
      <div class="p-4 space-y-3">
        <TextField v-model="state.title" label="product name" placeholder="" />
        <TextField v-model="state.amount" label="amount" placeholder="" />
        <TextareaField
          v-model="state.description"
          label="description"
          placeholder=""
        />
      </div>
    </div>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { PostData } from "@/domain/post";

import ModalWrapper from "@/components/ModalWrapper.vue";
import TextField from "@/components/TextField.vue";
import TextareaField from "@/components/TextareaField.vue";

defineEmits(["closeModal"]);

const state = reactive<PostData>({
  title: "",
  images: [],
  amount: "",
  description: "",
});
</script>
