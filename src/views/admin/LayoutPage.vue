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
          ref="menu"
          class="flex gap-3 p-2 items-center shadow-3xl border bg-white border-white cursor-pointer rounded-full"
        >
          <div @click="isMenuOpen = !isMenuOpen">
            <MenuIcon class="w-[30px] h-[30px]" />
          </div>
          <div class="rounded-full p-2 bg-gray-700 text-white">WR</div>
        </div>
      </div>
      <Transition>
        <nav v-if="isMenuOpen">
          <RouterLink
            v-for="link in links"
            :key="link.name"
            exactActiveClass="bg-blue-100/30"
            class="px-4 py-2"
            :to="{ name: link.name }"
          >
            {{ link.text }}
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
import { useDetectOutsideClick } from "@/utils/outsideClick";

const isMenuOpen = ref<boolean>(false);
const menu = ref<HTMLElement | undefined>();

useDetectOutsideClick(menu, () => {
  isMenuOpen.value = false;
});

const links = [
  {
    name: "productsListPage",
    text: "shops",
  },
  {
    name: "settingsPage",
    text: "settings",
  },
];
</script>

<style scoped>
nav {
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

nav {
  @apply flex flex-col w-[40%] absolute top-[80px] left-[230px]
    z-20 rounded box-border bg-white;
}
</style>
