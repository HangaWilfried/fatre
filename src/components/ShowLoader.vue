<template>
  <ModalWrapper :closable="false" @close="$emit('closeModal')">
    <div
      class="h-10 w-10 animate-spin border-2 border-gray-500 border-r-blue-500"
    />
  </ModalWrapper>
</template>

<script setup lang="ts">
import ModalWrapper from "@/components/ModalWrapper.vue";
</script>
