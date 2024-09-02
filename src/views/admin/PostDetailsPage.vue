<template>
  <section>
    <ShowLoader v-if="isLoading" />
    <div class="space-y-4" v-else>
      <div class="flex justify-between items-baseline">
        <h1 class="flex flex-col gap-2">
          <span class="text-xl font-black">{{ post.title }}</span>
          <span class="text-sm text-gray-900">{{ post.amount.toString }}</span>
          <span :class="['text-xs w-fit capitalize', post.status]">
            {{ post.status }}
          </span>
        </h1>
        <RouterLink
          :to="{
            name: 'productEditPage',
            params: {
              id,
            },
          }"
          class="text-gray-900 flex gap-1 items-center underline underline-offset-4 cursor-pointer"
        >
          <EditIcon class="w-3 h-3" />
          <span>Edit</span>
        </RouterLink>
      </div>
      <div class="flex gap-2 justify-end items-center text-sm">
        <ButtonWrapper
          v-if="post.isPosted"
          :isLoading="isRemovePublicationInProgress"
          label="draft"
          :theme="Theme.GRAY"
          @click="removePublication"
        />
        <ButtonWrapper
          v-if="post.isDraft"
          :isLoading="isPublishPublicationInProgress"
          label="post"
          :theme="Theme.BLUE"
          @click="postPublication"
        />
        <ButtonWrapper
          :isLoading="isDeletePublicationInProgress"
          label="delete"
          :theme="Theme.RED"
          @click="deletePublication"
        />
      </div>
      <div class="space-y-5">
        <p
          class="rounded-lg bg-green-100/50 p-2 break-after-all text-sm text-green-900"
        >
          {{ post.description }}
        </p>
        <div class="grid grid-cols-2 gap-2.5">
          <BaseImage v-for="file in post.files" :key="file" :path="file" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, type Ref } from "vue";

import { Theme } from "@/utils/enum";
import { usePostStore } from "@/stores/post";
import { EmptyPost, type Post } from "@/domain/post";

import BaseImage from "@/components/BaseImage.vue";
import ShowLoader from "@/components/ShowLoader.vue";
import ButtonWrapper from "@/components/ButtonWrapper.vue";
import EditIcon from "@/icons/EditIcon.vue";
import { RouterLink } from "vue-router";

const store = usePostStore();
const props = defineProps<{ id: string }>();

const isLoading = ref<boolean>(false);
const isRemovePublicationInProgress = ref<boolean>(false);
const isDeletePublicationInProgress = ref<boolean>(false);
const isPublishPublicationInProgress = ref<boolean>(false);

const post = ref<Post>(EmptyPost()) as Ref<Post>;
const removePublication = async (): Promise<void> => {
  isRemovePublicationInProgress.value = true;
  await store.maskOne(post.value.id);
  await fetchPost();
  isRemovePublicationInProgress.value = false;
};
const postPublication = async (): Promise<void> => {
  isPublishPublicationInProgress.value = true;
  await store.publishOne(post.value.id);
  await fetchPost();
  isPublishPublicationInProgress.value = false;
};
const deletePublication = async (): Promise<void> => {
  isDeletePublicationInProgress.value = true;
  await store.deleteOne(post.value.id);
  await fetchPost();
  isDeletePublicationInProgress.value = false;
};

const fetchPost = async (): Promise<void> => {
  const { data } = await store.getPostById(props.id);
  if (data) post.value = data;
};

onBeforeMount(async () => {
  isLoading.value = true;
  await fetchPost();
  isLoading.value = false;
});
</script>
