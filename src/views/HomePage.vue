<template>
  <section>list of publications</section>
</template>

<script setup lang="ts">
import { userStore } from "@/stores/user";
import { onBeforeMount } from "vue";

const store = userStore();

onBeforeMount(async () => {
  await store.getUserData();
})
</script>
