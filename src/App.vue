<template>
  <header>
    <h1>Fatre</h1>
    <div>
      <RouterLink to="">sign in</RouterLink>
      <RouterLink to="">Sign up</RouterLink>
    </div>
    <h2>
      welcome <span>{{ 1 }}</span>
    </h2>
  </header>
  <RouterView />
  <footer></footer>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>
