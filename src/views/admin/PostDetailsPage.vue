<template>
  <section>
    <ShowLoader v-if="isLoading" />
    <div class="space-y-5" v-else>
      <div class="flex justify-between items-baseline">
        <h1 class="flex flex-col gap-1">
          <span class="text-xl font-black">{{ post.title }}</span>
          <span :class="['text-xs w-fit capitalize', post.status]">{{
            post.status
          }}</span>
        </h1>
        <span class="text-sm text-gray-900">{{ post.amount.toString }}</span>
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
import { usePostStore } from "@/stores/post";
import { EmptyPost, type Post } from "@/domain/post";
import { onBeforeMount, ref, type Ref } from "vue";
import BaseImage from "@/components/BaseImage.vue";
import ShowLoader from "@/components/ShowLoader.vue";

const store = usePostStore();
const isLoading = ref<boolean>(false);
const props = defineProps<{ id: string }>();

const post = ref<Post>(EmptyPost()) as Ref<Post>;

onBeforeMount(async () => {
  isLoading.value = true;
  const { data } = await store.getPostById(props.id);
  if (data) post.value = data;
  isLoading.value = false;
});
</script>

<style scoped>
.draft {
  @apply text-xs text-zinc-500 bg-zinc-200 px-3 py-0.5 rounded-md;
}
</style>
