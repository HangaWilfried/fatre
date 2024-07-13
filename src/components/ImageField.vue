<template>
  <section>
    <ModalWrapper v-if="cantShowModal" @close="cantShowModal = false">
      <div class="flex flex-col space-y-4 py-4">
        <div class="flex p-4 space-y-3">
          <img
            class="w-[85%] h-[80%] mx-auto"
            :src="files.sources[imageIndex]"
            alt="image"
          />
        </div>
        <button
          @click="deleteImage"
          class="w-[79%] mx-auto py-2 border rounded-md bg-red-500/80 text-white"
        >
          Delete
        </button>
      </div>
    </ModalWrapper>
    <div
      class="flex flex-col gap-4 items-center justify-center rounded-lg border border-dashed border-gray-900/25 h-[200px] px-6 py-4"
      :style="{
        'background-image': `url(${lastUploaded})`,
        'background-size': '100%',
      }"
    >
      <div class="mb-6" v-if="images.length === 0">
        <PhotoIcon />
      </div>
      <div class="flex">
        <input
          class="w-[80%] mx-auto bg-blue-200/20"
          id="input-file"
          type="file"
          name="input-file"
          data-test="input-file"
          accept="image/*"
          multiple
          @change="handleImage"
        />
      </div>
    </div>
    <div
      v-if="files.sources.length > 0"
      id="scroll-section"
      class="flex flex-row overflow-scroll snap-x"
    >
      <div
        class="snap-center shrink-0 p-2"
        v-for="(image, index) in files.sources"
        :key="index"
        @click="handleModalDisplay(index)"
      >
        <img class="w-[80px] h-[80px] object-cover" :src="image" alt="image" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, reactive, defineAsyncComponent } from "vue";
import { useMediaStore } from "@/stores/media";
import { convertToBlob } from "@/utils/images";

const PhotoIcon = defineAsyncComponent(() => import("@/icons/PhotoIcon.vue"));
const ModalWrapper = defineAsyncComponent(
  () => import("@/components/ModalWrapper.vue"),
);

const mediaStore = useMediaStore();

defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const cantShowModal = ref<boolean>(false);
const imageIndex = ref<number>(0);

const handleModalDisplay = (index: number) => {
  cantShowModal.value = true;
  imageIndex.value = index;
};

const deleteImage = () => {
  cantShowModal.value = false;
};

const images = ref<string[]>([]);
const lastUploaded = computed(() => files.sources.slice(-1));

const files = reactive<{
  ids: string[];
  sources: string[];
}>({
  ids: [],
  sources: [],
});

const saveFile = async (file: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    const { data } = await mediaStore.createOne(convertToBlob(file));
    if (data) {
      files.sources.push(reader.result as string);
      files.ids.push(data);
    }
  };
};

const handleImage = async (event: {
  target: { files: File[] };
}): Promise<void> => {
  await Promise.all([...event.target.files].map(saveFile));
  emit("update:modelValue", files.ids);
};
</script>

<style scoped>
input[type="file"]::file-selector-button {
  border: 1px solid #cddbe9;
  padding: 0.2em 0.4em;
  border-radius: 0.2em;
  transition: 1s;
  @apply bg-gray-300 text-white hover:bg-blue-200/20 hover:text-black;
}

#scroll-section::-webkit-scrollbar {
  display: none;
}
</style>
