<template>
  <ModalWrapper @close="$emit('closeForm')">
    <form @submit.prevent="performSaveEdit">
      <TextField
        :label="t('lastname')"
        v-model="state.lastname"
        :errors="v$.lastname.$errors"
        :placeholder="t('placeholder.lastname')"
      />
      <TextField
        :label="t('firstname')"
        v-model="state.firstname"
        :placeholder="t('placeholder.firstname')"
      />
      <EmailField
        :label="t('email')"
        v-model="state.email"
        :errors="v$.email.$errors"
        :placeholder="t('placeholder.email')"
      />
      <TextField
        :label="t('dateOfBirth')"
        v-model="state.dateOfBirth"
        :placeholder="t('placeholder.dateOfBirth')"
      />
      <TextField
        :label="t('gender')"
        v-model="state.gender"
        :placeholder="t('placeholder.gender')"
      />
      <TextField
        :label="t('phoneNumber')"
        v-model="state.phoneNumber"
        :placeholder="t('placeholder.phoneNumber')"
      />
      <div class="pt-7 grid grid-cols-1">
        <ButtonWrapper
          type="submit"
          class="py-4"
          label="Save"
          :theme="Theme.DARK"
          data-test="submit-btn"
          :is-loading="isLoading"
        />
      </div>
    </form>
  </ModalWrapper>
</template>

<script setup lang="ts">
import { ref } from "vue";

import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

import { Theme } from "@/utils/enum";
import { useTranslation } from "@/utils/i18n";
import { useSessionStore } from "@/stores/session";
import type { User, UserData } from "@/domain/user";

import TextField from "./TextField.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import ButtonWrapper from "@/components/ButtonWrapper.vue";

const emit = defineEmits(["closeForm", "complete"]);
const props = defineProps<{
  user: User;
}>();

const t = useTranslation();
const store = useSessionStore();

const isLoading = ref<boolean>(false);

const state = ref<Omit<UserData, "password">>({
  email: props.user.email,
  firstname: props.user.firstname,
  lastname: props.user.lastname,
  phoneNumber: props.user.contact.DTO,
  gender: props.user.civility,
  dateOfBirth: props.user.dateOfBirth,
});

const rules = {
  email: {
    required,
    email,
  },
  firstname: { required },
  lastname: { required },
};

const $externalResults = { email: "" };
const v$ = useVuelidate(rules, state, { $externalResults });

const performSaveEdit = async (): Promise<void> => {
  isLoading.value = true;
  const { error } = await store.editUser(state.value);
  if (error) $externalResults.email = t(error);
  emit("complete");
  isLoading.value = false;
};
</script>
