<template>
  <div
    :class="[
      'w-full h-full rounded-lg',
      { 'bg-gray-400 animate-pulse': isLoading },
    ]"
    :data-id="uniqueId"
  >
    <img
      v-if="source"
      :src="source"
      alt="img.placeholder"
      class="object-cover rounded-lg"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useMediaStore } from "@/stores/media";
import { useIntersectionObserver } from "@/utils/observer";

const store = useMediaStore();

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});

const source = ref<string>("");
const isLoading = ref<boolean>(true);

const getSource = async () => {
  isLoading.value = true;
  const { error, data } = await store.getOne(props.path);
  if (error) {
    source.value = new URL("../assets/images/", import.meta.url).href;
  }
  if (data) {
    const clone = await data.clone().blob();
    source.value = URL.createObjectURL(clone);
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
