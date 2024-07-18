<template>
  <section>
    <header class="flex flex-col bg-blue-200/20">
      <div class="flex justify-between border-b border-gray-200/60 p-4">
        <div class="flex flex-row">
          <h1 class="flex items-center font-bold text-xl">
            <span class="text-center">Fatre</span>
          </h1>
        </div>
        <div
          class="flex gap-3 p-2 items-center shadow-3xl border bg-white border-white cursor-pointer rounded-full"
        >
          <div @click="isOpen = !isOpen">
            <MenuIcon class="w-[30px] h-[30px]" />
          </div>
          <div class="rounded-full p-2 bg-gray-700 text-white">WR</div>
        </div>
      </div>
      <Transition>
        <nav v-if="isOpen">
          <RouterLink class="px-4 py-2" to="/admin/products">
            shops
          </RouterLink>
          <RouterLink class="px-4 py-2" to="/admin/settings">
            settings
          </RouterLink>
          <span class="px-4 py-2">Logout</span>
        </nav>
      </Transition>
    </header>

    <section class="p-5">
      <RouterView />
    </section>
  </section>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import MenuIcon from "@/icons/MenuIcon.vue";
import { ref } from "vue";

const isOpen = ref<boolean>(false);
</script>

<style scoped>
nav{
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-in;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

nav{
  @apply flex flex-col w-[40%] absolute top-[80px] gap-4 left-[230px] z-20 rounded font-bold box-border bg-white;
}

.router-link-exact-active{
  @apply bg-blue-200/20;
}
</style>