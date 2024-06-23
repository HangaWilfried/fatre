<script setup lang="ts">
import type { Post } from "@/domain/post";

import SlideCard from "@/components/SlideCard.vue";

defineProps<{
  post: Post;
  handleClick: Function;
}>();
</script>

<template>
  <div class="flex flex-col gap-2" @click="handleClick(post.id)">
    <SlideCard :files="post.files" />
    <h1>{{ post.title }}</h1>
    <span>{{ post.amount.toString }}</span>
  </div>
</template>
