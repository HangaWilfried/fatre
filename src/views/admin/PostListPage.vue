<template>
  <section class="space-y-4">
    <div class="flex justify-between items-center">
      <h1>list of publications</h1>
      <RouterLink :to="{ name: 'addProductPage' }">
        <ButtonWrapper class="text-white bg-gray-700 rounded" label="add +" />
      </RouterLink>
    </div>
    <div v-if="isLoading" class="cards">
      <CardSkeleton />
    </div>
    <div class="cards" v-else-if="posts.length">
      <RouterLink
        v-for="post in posts"
        :key="post.id"
        :to="{ name: 'productDetailsPage', params: { id: post.id } }"
      >
        <PostCard :post="post" />
      </RouterLink>
    </div>
    <div v-else class="flex justify-center pt-10">
      <EmptySVG />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Post } from "@/domain/post";
import { usePostStore } from "@/stores/post";
import { onBeforeMount, defineAsyncComponent, ref, type Ref } from "vue";
import ButtonWrapper from "@/components/ButtonWrapper.vue";

const PostCard = defineAsyncComponent(
  () => import("@/components/PostCard.vue"),
);
const CardSkeleton = defineAsyncComponent(
  () => import("@/components/CardSkeleton.vue"),
);
const EmptySVG = defineAsyncComponent(() => import("@/icons/EmptySVG.vue"));

const store = usePostStore();
const posts = ref<Post[]>([]) as Ref<Post[]>;
const isLoading = ref<boolean>(false);

onBeforeMount(async () => {
  isLoading.value = true;
  const { data } = await store.getMyPosts();
  posts.value = data!;
  isLoading.value = false;
});
</script>
