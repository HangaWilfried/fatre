<template>
  <section>list of publications</section>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/user";
import { onBeforeMount } from "vue";

const store = UserStore();

onBeforeMount(async () => {
  await store.getUserData();
});
</script>
