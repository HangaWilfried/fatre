<script setup lang="ts">
import { ref, computed } from "vue";
import BaseImage from "@/components/BaseImage.vue";

const props = defineProps<{
  files: string[];
}>();

const slider = ref<HTMLElement | undefined>(undefined);

const currentSlide = ref<number>(0);
const orientation = ref<number>(1);

const showNextSlide = (): void => {
  if (currentSlide.value < props.files.length - 1) {
    currentSlide.value++;
    orientation.value = 1;
  }
};

const showPreviousSlide = (): void => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
    orientation.value = -1;
  }
};

const offsetWidth = computed<number>(() => {
  return slider.value?.offsetWidth ?? 0;
});

const slide = computed(() => ({
  width: offsetWidth.value * props.files.length + "px",
  transform: `translateX(${currentSlide.value * orientation.value * offsetWidth.value}px)`,
}));
</script>

<template>
  <section ref="slider" class="overflow-hidden relative h-32">
    <div :style="slide" class="flex">
      <BaseImage
        :class="`shrink-0 w-[${offsetWidth}px]`"
        v-for="file in files"
        :key="file"
        :path="file"
      />
    </div>
    <div
      class="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-4"
    >
      <div class="flex justify-between items-center py-4">
        <span
          @click="showPreviousSlide"
          class="text-xl border border-gray-800/20 bg-gray-800/20 text-white"
        >
          &larr;
        </span>
        <span
          @click="showNextSlide"
          class="text-xl border border-gray-800/20 bg-gray-800/20 text-white"
        >
          &rarr;
        </span>
      </div>
      <div class="overflow-hidden flex gap-2">
        <span
          v-for="file in files"
          :key="file"
          class="border w-3 h-3 bg-gray-400 shrink-0"
        />
      </div>
    </div>
  </section>
</template>
