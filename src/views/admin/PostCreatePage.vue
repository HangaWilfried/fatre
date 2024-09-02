<template>
  <div class="space-y-4">
    <h1 class="border-b border-gray-300 pb-2 text-lg">Form to add product</h1>
    <form @submit.prevent="handleSubmit" class="space-y-3">
      <TextField v-model="state.title" label="product name" />
      <TextField v-model="state.amount" label="amount" />
      <TextareaField v-model="state.description" label="description" />
      <h2>Product image</h2>
      <ImageField v-model="state.fileIds" />
      <div class="pt-7 grid grid-cols-1">
        <ButtonWrapper
          type="submit"
          class="py-4"
          :theme="Theme.DARK"
          label="Save product"
          data-test="submit-btn"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

import { Theme } from "@/utils/enum";
import { usePostStore } from "@/stores/post";
import type { PostData } from "@/domain/post";

import TextField from "@/components/TextField.vue";
import ImageField from "@/components/ImageField.vue";
import TextareaField from "@/components/TextareaField.vue";

defineEmits(["closeModal"]);
const router = useRouter();
const store = usePostStore();

const state = reactive<PostData>({
  title: "",
  fileIds: [],
  amount: "",
  description: "",
});

const rules = {
  title: { required },
  amount: { required },
  description: { required },
  fileIds: {
    required,
    minLength: minLength(1),
  },
};

const v$ = useVuelidate(rules, state);

const handleSubmit = async (): Promise<void> => {
  const isValid = await v$.value.$validate();
  if (isValid) {
    const { data } = await store.createOne(state);
    if (data)
      await router.push({
        name: "productDetailsPage",
        params: {
          id: data,
        },
      });
  }
};
</script>
