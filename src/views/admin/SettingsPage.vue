<template>
  <div>
    <EditUserModal
      :user="user"
      @close-form="closeModal"
      @complete="[closeModal, fetchUserDetails]"
    />
    <ShowLoader v-if="isLoading" />
    <template v-else>
      <div
        class="border-b border-gray-100 pb-2 flex justify-between items-center"
      >
        <h1 class="font-semibold">Settings</h1>
        <div
          @click="showModal = true"
          class="text-gray-900 flex gap-1 items-center underline underline-offset-4 cursor-pointer"
        >
          <EditIcon class="w-3 h-3" />
          <span>Edit</span>
        </div>
      </div>

      <div class="py-10 space-y-4">
        <div
          class="w-44 h-44 m-auto rounded-full relative flex items-center justify-center bg-gray-200"
        >
          <BaseImage
            v-if="user.hasProfile"
            class="absolute w-full h-full rounded-full inset-0"
            :path="user.profile"
          />
          <span v-else>{{ user.avatar }}</span>
        </div>
        <div class="flex gap-2 items-center">
          <h2>Gender</h2>
          <span>{{ user.civility }}</span>
        </div>
        <div class="flex gap-2 items-center">
          <h2>Lastname</h2>
          <span>{{ user.lastname }}</span>
        </div>
        <div class="flex gap-2 items-center">
          <h2>Firstname</h2>
          <span>{{ user.firstname }}</span>
        </div>
        <div class="flex gap-2 items-center">
          <h2>Date of birth</h2>
          <span>{{ user.dateOfBirth }}</span>
        </div>
        <div class="flex gap-2 items-center">
          <h2>Contact</h2>
          <span>{{ user.contact.toString }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, type Ref } from "vue";

import { EmptyUser, User } from "@/domain/user";
import { useSessionStore } from "@/stores/session";

import BaseImage from "@/components/BaseImage.vue";
import ShowLoader from "@/components/ShowLoader.vue";
import EditUserModal from "@/components/EditUserModal.vue";

const store = useSessionStore();

const user = ref<User>(EmptyUser()) as Ref<User>;
const isLoading = ref<boolean>(false);

const fetchUserDetails = async (): Promise<void> => {
  isLoading.value = true;
  const { data } = await store.getUserData();
  if (data) user.value = data;
  isLoading.value = false;
};

onBeforeMount(async () => {
  await fetchUserDetails();
});

const showModal = ref<boolean>(false);
const closeModal = (): void => {
  showModal.value = false;
};
</script>
