<template>
  <section>
    <header class="flex flex-col bg-blue-200/20">
      <div class="flex justify-between border-b border-gray-200/60 p-4">
        <div class="flex flex-row">
          <div @click="isOpen = !isOpen">
            <CloseIcon v-if="isOpen" class="w-[45px] h-[45px]" />
            <MenuIcon v-else class="w-[45px] h-[45px]" />
          </div>
          <h1 class="flex items-center font-bold text-xl">
            <span class="text-center">Fatre</span>
          </h1>
        </div>
        <div class="flex gap-4 items-center">
          <div class="rounded-lg p-2 bg-gray-300 text-gray-800">WR</div>
          <button class="p-2 border rounded-md bg-red-500/80 text-white">
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div>
        <nav :class="isOpen ? 'dropdown-nav-open' : 'dropdown-nav'">
          <RouterLink to="/admin/products">
            <span>shops</span>
          </RouterLink>
          <RouterLink to="/admin/settings">
            <span>settings</span>
          </RouterLink>
        </nav>
      </div>
    </header>
    <section class="p-5">
      <RouterView />
    </section>
  </section>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import MenuIcon from "@/icons/MenuIcon.vue";
import CloseIcon from "@/icons/CloseIcon.vue";
import { ref } from "vue";

const isOpen = ref<boolean>(false);
</script>

<style>
nav.dropdown-nav {
  height: 0;
  opacity: 0;
  transition: all 0.5s ease;
}
.dropdown-nav-open {
  @apply flex flex-col h-full gap-4 justify-center py-2 pl-5 border-b border-gray-200/60 shadow-md;
  opacity: 1;
  transform: translateY(0);
}
</style>
