<template>
  <div class="space-y-4">
    <h1 class="border-b border-gray-300 pb-2 text-lg">Form to edit product</h1>
    <form @submit.prevent="handleSubmit" class="space-y-3">
      <TextField
        :errors="v$.title.$errors"
        v-model="state.title"
        label="product name"
      />
      <TextField
        :errors="v$.amount.$errors"
        v-model="state.amount"
        label="amount"
      />
      <TextareaField
        :errors="v$.description.$errors"
        v-model="state.description"
        label="description"
      />
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
import { onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";

import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import { Theme } from "@/utils/enum";
import { usePostStore } from "@/stores/post";
import type { PostData } from "@/domain/post";

import TextField from "@/components/TextField.vue";
import TextareaField from "@/components/TextareaField.vue";
import ButtonWrapper from "@/components/ButtonWrapper.vue";

defineEmits(["closeModal"]);
const props = defineProps<{ id: string }>();

const router = useRouter();
const store = usePostStore();

const isLoading = ref<boolean>(false);

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
};

const v$ = useVuelidate(rules, state);

const handleSubmit = async (): Promise<void> => {
  const isValid = await v$.value.$validate();
  if (isValid) {
    const { error } = await store.editOne({
      postId: props.id,
      post: state,
    });
    if (!error) {
      await router.push({
        name: "productDetailsPage",
        params: {
          id: props.id,
        },
      });
    }
  }
};

onBeforeMount(async () => {
  isLoading.value = true;
  const { data } = await store.getPostById(props.id);
  if (data) {
    state.title = data.title;
    state.amount = data.amount.value.toString();
    state.description = data.description;
    state.fileIds = data.files;
  }
  isLoading.value = false;
});
</script>
