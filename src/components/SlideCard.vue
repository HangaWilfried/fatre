<template>
  <section class="relative overflow-hidden">
    <div
      :style="widthDependingSlideElements"
      ref="sliderContainer"
      class="flex h-[321px]"
    >
      <BaseImage
        :key="index"
        :path="file"
        :style="listPosition"
        v-for="(file, index) in files"
        class="translate-x-0 transform ease-in-out duration-200"
      />
      <ArrowWithBackground
        class="absolute right-4 top-[45%] cursor-pointer z-10"
        v-if="currentIndex < files?.length - 1"
        @click.prevent="increaseCurrentIndex"
        data-test="forward-chevron-icon"
      />
      <ArrowWithBackground
        class="absolute -rotate-180 cursor-pointer left-4 top-[45%] z-10"
        v-if="currentIndex > 0"
        @click.prevent="decreaseCurrentIndex"
        data-test="backward-chevron-icon"
      />
      <LegendSlider ref="legend" :current-item="currentIndex" :files="files" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, type PropType, ref } from "vue";
import BaseImage from "@/components/BaseImage.vue";
import ArrowWithBackground from "@/components/ArrowWithBackground.vue";
import LegendSlider from "@/components/LegendSlider.vue";

const props = defineProps({
  files: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
const widthDependingSlideElements = computed(
  (): Record<string, string> => ({
    width: props.files.length * 100 + "%",
  }),
);
const sliderContainer = ref<HTMLElement | null>(null);
const currentIndex = ref<number>(0);
const listPosition = computed(
  (): Record<string, string> => ({
    transform: `translateX(-${currentIndex.value * 100}%)`,
  }),
);

const legend = ref<HTMLElement | undefined>(undefined);
const scrollLeftPixel = ref<number>(0);

const shouldScrollLeft = computed(() => scrollLeftPixel.value > 0);
const shouldScrollRight = computed(() => {
  if (!legend.value) return;

  return (
    legend.value.scrollWidth - legend.value.clientWidth >= scrollLeftPixel.value
  );
});

const scrollToLeft = () => {
  if (legend.value && shouldScrollLeft.value) {
    legend.value.scrollLeft -= getScrollWidth();
    scrollLeftPixel.value -= getScrollWidth();
  }
};

const getScrollWidth = () =>
  legend.value?.children[0]?.getBoundingClientRect().width ?? 0;

const scrollToRight = () => {
  if (legend.value && shouldScrollRight.value) {
    legend.value.scrollLeft += getScrollWidth();
    scrollLeftPixel.value += getScrollWidth();
  }
};

const increaseCurrentIndex = (): void => {
  if (currentIndex.value < props.files.length - 1) {
    currentIndex.value += 1;
    scrollToLeft();
    return;
  }
  currentIndex.value = 0;
};

const decreaseCurrentIndex = (): void => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
    scrollToRight();
    return;
  }
  currentIndex.value = props.files.length - 1;
};

const startXPoint = ref<number>(0);
const endXPoint = ref<number>(0);
const touchstart = (event: TouchEvent): void => {
  startXPoint.value = event.touches[0].clientX;
  endXPoint.value = 0;
};
const touchmove = (event: TouchEvent): void => {
  endXPoint.value = event.touches[0].clientX;
};
const touchend = (): void => {
  if (!endXPoint.value || Math.abs(endXPoint.value - startXPoint.value) < 20) {
    return;
  }
  if (endXPoint.value < startXPoint.value) {
    increaseCurrentIndex();
    return;
  }
  decreaseCurrentIndex();
};

onMounted(() => {
  sliderContainer.value?.addEventListener("touchstart", (event) =>
    touchstart(event),
  );
  sliderContainer.value?.addEventListener("touchend", touchend);
  sliderContainer.value?.addEventListener("touchmove", (event) =>
    touchmove(event),
  );
});
</script>
