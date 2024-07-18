<script setup lang="ts">
import type { Post } from "@/domain/post";

import SlideCard from "@/components/SlideCard.vue";

defineProps<{
  post: Post;
}>();
</script>

<template>
  <div
    class="flex flex-col gap-2 overflow-hidden"
    :data-test="`product-${post.id}`"
  >
    <SlideCard :files="post.files" />
    <h1>{{ post.title }}</h1>
    <span>{{ post.amount.toString }}</span>
  </div>
</template>
