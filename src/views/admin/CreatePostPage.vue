<template>
  <div class="space-y-4">
    <h1 class="p-4 pt-0 border-b border-gray-300">Form to add product</h1>
    <form @submit.prevent="handleSubmit" class="p-4 space-y-3">
      <TextField v-model="state.title" label="product name" placeholder="" />
      <TextField v-model="state.amount" label="amount" placeholder="" />
      <TextareaField
        v-model="state.description"
        label="description"
        placeholder=""
      />
      <h2>Product image</h2>
      <ImageField v-model="state.fileIds" />
      <button
        data-test="submit-btn"
        type="submit"
        class="w-full py-2 border rounded mt-4 font-bold text-white bg-gray-700"
      >
        Save product
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
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
  title: { required: true },
  amount: { required: true },
  description: { required: true },
  fileIds: {
    required: true,
    minLength: 1,
  },
};

const v$ = useVuelidate(rules, state);

const handleSubmit = async (): Promise<void> => {
  const isValid = await v$.value.$validate();
  if (isValid) {
    const { data } = await store.createOne(state);
    if (data)
      await router.push({
        name: "single product page",
        params: {
          id: data,
        },
      });
  }
};
</script>
