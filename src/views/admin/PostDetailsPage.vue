<template>
  <section>
    <div v-if="isLoading">Is loading ...</div>
    <div v-else>
      {{ JSON.stringify(post) }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePostStore } from "@/stores/post";
import { EmptyPost, type Post } from "@/domain/post";

import { onBeforeMount, ref, type Ref } from "vue";

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
