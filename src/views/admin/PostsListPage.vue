<template>
  <section class="space-y-4">
    <div class="flex justify-between items-center">
      <h1>list of publications</h1>
      <RouterLink to="/products/new">
        <ButtonWrapper class="text-white bg-gray-700 rounded" label="add +" />
      </RouterLink>
    </div>
    <div v-if="isLoading" class="cards">
      <CardSkeleton />
    </div>
    <div class="cards" v-else-if="posts.length">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        :handleClick="goToPostDetails"
      />
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
import { useRouter } from "vue-router";
import ButtonWrapper from "@/components/ButtonWrapper.vue";

const PostCard = defineAsyncComponent(
  () => import("@/components/PostCard.vue"),
);
const CardSkeleton = defineAsyncComponent(
  () => import("@/components/CardSkeleton.vue"),
);
const EmptySVG = defineAsyncComponent(() => import("@/icons/EmptySVG.vue"));

const store = usePostStore();
const router = useRouter();

const posts = ref<Post[]>([]) as Ref<Post[]>;

const isLoading = ref<boolean>(false);

const goToPostDetails = async (postId: string): Promise<void> => {
  await router.push(`/products/${postId}`);
};

onBeforeMount(async () => {
  isLoading.value = true;
  const { data } = await store.getMyPosts();
  posts.value = data!;
  isLoading.value = false;
});
</script>
