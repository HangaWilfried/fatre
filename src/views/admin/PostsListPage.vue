<template>
  <section class="space-y-4">
    <div>list of publications</div>
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
    <div v-else>
      <EmptySVG />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Post } from "@/domain/post";
import { usePostStore } from "@/stores/post";
import { onBeforeMount, defineAsyncComponent, ref, type Ref } from "vue";
import { useRouter } from "vue-router";

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
  await router.push(`/admin/products/${postId}`);
};

onBeforeMount(async () => {
  isLoading.value = true;
  const { data } = await store.getMyPosts();
  posts.value = data!;
  isLoading.value = false;
});
</script>
