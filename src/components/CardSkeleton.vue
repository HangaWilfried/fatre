<template>
  <section
    v-for="index in 8"
    :key="index"
    class="animate-pulse shadow bg-white rounded-lg space-y-2"
  >
    <div class="h-32 w-full rounded-lg"></div>
    <div class="flex flex-col gap-2">
      <span class="w-10 h-3 rounded-lg"></span>
      <span class="w-20 h-3 rounded-lg"></span>
      <span class="w-52 h-3 rounded-lg"></span>
    </div>
  </section>
</template>
