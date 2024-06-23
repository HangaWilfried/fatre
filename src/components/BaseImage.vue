<template>
  <div
    class="relative rounded-lg overflow-hidden aspect-video"
    :data-id="uniqueId"
  >
    <div
      v-if="isLoading"
      class="w-full h-full left-0 top-0 bg-gray-400 animate-pulse"
    />
    <img :src="source" alt="img.placeholder" class="object-cover" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { UseMediaStore } from "@/stores/media";
import { useIntersectionObserver } from "@/utils/observer";

const store = UseMediaStore();

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});

const source = ref<string>("");
const isLoading = ref<boolean>(true);

const getSource = async () => {
  const { error, data } = await store.getOne(props.path);
  if (error) {
    source.value = new URL("../assets/images/", import.meta.url).href;
  }
  if (data) {
    source.value = URL.createObjectURL(data);
  }
  isLoading.value = false;
};

const { uniqueId } = useIntersectionObserver(getSource);

watch(
  () => props.path,
  async (newPath) => {
    if (newPath) await getSource();
  },
);
</script>

<style scoped>
img {
  overflow-clip-margin: content-box;
  overflow: clip;
  height: 100%;
  width: 100%;
}
</style>
