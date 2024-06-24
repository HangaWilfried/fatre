<template>
  <section>
    <header class="flex flex-col">
      <div class="flex justify-between border-b border-gray-200/60 p-4">
        <h1>Fatre</h1>
        <div class="flex gap-4 items-center">
          <div class="rounded-lg p-2 bg-gray-300 text-gray-800">WR</div>
          <span>Logout</span>
        </div>
      </div>
      <nav class="flex gap-4 justify-center p-4 border-b border-gray-200/60">
        <RouterLink to="/admin/products">
          <span>shops</span>
        </RouterLink>
        <RouterLink to="/admin/settings">
          <span>settings</span>
        </RouterLink>
      </nav>
    </header>
    <section>
        <RouterView />
    </section>
  </section>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
</script>
