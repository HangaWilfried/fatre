<template>
  <teleport to="body">
    <section class="modal-wrapper">
      <transition>
        <section
          v-if="show"
          class="bg-white min-w-[200px] w-[96%] min-h-72 rounded-lg"
        >
          <div
            v-if="closable"
            class="flex justify-end cursor-pointer pt-4 px-4"
          >
            <CloseIcon @click="$emit('close')" />
          </div>
          <slot />
        </section>
      </transition>
    </section>
  </teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import CloseIcon from "@/icons/CloseIcon.vue";

defineEmits(["close"]);
defineProps({
  closable: {
    type: Boolean,
    default: true,
  },
});
const show = ref<boolean>(true);
onMounted(() => {
  document.querySelector("body")?.classList.remove("overflow-hidden");
  document.querySelector("body")?.classList.add("overflow-hidden");
});

onBeforeUnmount(() => {
  document.querySelector("body")?.classList.remove("overflow-hidden");
  document.querySelector("body")?.classList.add("overflow-auto");
});
</script>
