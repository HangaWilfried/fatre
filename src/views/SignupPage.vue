<template>
  <section>
    <h1 class="text-2xl font-bold p-4">Fatre</h1>
    <div class="flex flex-col p-4 gap-y-5">
      <h2 class="text-xl font-bold">Signup</h2>
      <div class="flex flex-col gap-0.5">
        <span
          v-for="error in v$.$errors"
          :key="error.$uid"
          class="text-rose-600 font-bold text-sm"
        >
          {{ error.$message }}
        </span>
      </div>
      <TextField
        :label="t('lastname')"
        v-model="user.lastname"
        :errors="v$.lastname.$errors"
        :placeholder="t('placeholder.lastname')"
      />
      <TextField
        :label="t('firstname')"
        v-model="user.firstname"
        :placeholder="t('placeholder.firstname')"
      />
      <EmailField
        :label="t('email')"
        v-model="user.email"
        :errors="v$.email.$errors"
        :placeholder="t('placeholder.email')"
      />
      <PasswordField
        :errors="v$.password.$errors"
        v-model="user.password"
        :label="t('password')"
        :placeholder="t('placeholder.password')"
      />
      <PasswordField
        :errors="v$.confirmPassword.$errors"
        v-model="user.confirmPassword"
        :label="t('confirm-password')"
        :placeholder="t('placeholder.confirm-password')"
      />
      <ButtonWrapper
        @click="tryCreateAccount"
        class="border bg-gray-700 text-white rounded-md font-bold"
        :is-loading="isLoading"
        :label="t('create-account')"
      />
    </div>
    <div class="flex flex-col gap-1 items-center mb-6">
      <span>{{ t("has-account") }}</span>
      <RouterLink :to="{ name: 'loginPage' }">
        <span class="text-blue-600 font-bold text-sm">
          {{ t("login") }}
        </span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useTranslation } from "@/utils/i18n";
import type { UserData } from "@/domain/user";

import useVuelidate from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";

import TextField from "@/components/TextField.vue";
import EmailField from "@/components/EmailField.vue";
import ButtonWrapper from "@/components/ButtonWrapper.vue";
import PasswordField from "@/components/PasswordField.vue";

const store = useUserStore();
const t = useTranslation();

const router = useRouter();
const isLoading = ref<boolean>(false);

type State = { confirmPassword: string } & UserData;
const user = reactive<State>({
  email: "",
  lastname: "",
  password: "",
  firstname: "",
  confirmPassword: "",
});

const $externalResults = { email: "" };

const rules = {
  email: {
    required,
    email,
  },
  password: {
    required,
  },
  lastname: {
    required,
  },
  confirmPassword: {
    sameAs: sameAs(user.password),
  },
};

const v$ = useVuelidate(rules, user, { $externalResults });

const tryCreateAccount = async (): Promise<void> => {
  isLoading.value = true;
  const isValid = await v$.value.$validate();
  if (isValid) {
    const { error } = await store.createOne(user);
    if (error) $externalResults.email = t(error);
    else await router.push({ name: "loginPage" });
  }
  isLoading.value = false;
};
</script>
