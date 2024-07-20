<template>
  <section>
    <h1 class="text-2xl font-bold p-4">Fatre</h1>
    <div class="flex flex-col p-4 gap-y-5">
      <h2 class="text-xl font-bold">Log in to continue</h2>
      <div class="flex flex-col gap-0.5">
        <span
          v-for="error in v$.$errors"
          :key="error.$uid"
          class="text-rose-600 font-bold text-sm"
        >
          {{ error.$message }}
        </span>
      </div>
      <EmailField
        v-model="user.email"
        :label="t('email')"
        :errors="v$.email.$errors"
        :placeholder="t('placeholder.email')"
      />
      <PasswordField
        v-model="user.password"
        :label="t('password')"
        :errors="v$.password.$errors"
        :placeholder="t('placeholder.password')"
      />
      <ButtonWrapper
        @click="tryLogin"
        class="border bg-gray-700 text-white rounded-md font-bold"
        :is-loading="isLoading"
        :label="t('continue')"
      />
    </div>
    <div class="flex flex-col gap-1 items-center">
      <span>{{ t("do-not-have-account") }}</span>
      <RouterLink :to="{ name: 'signupPage' }">
        <span class="text-blue-600 font-bold text-sm">
          {{ t("create-account") }}
        </span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useSessionStore } from "@/stores/session";
import { useTranslation } from "@/utils/i18n";
import type { Credential } from "@/domain/user";

import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

import EmailField from "@/components/EmailField.vue";
import ButtonWrapper from "@/components/ButtonWrapper.vue";
import PasswordField from "@/components/PasswordField.vue";

const store = useSessionStore();
const t = useTranslation();

const router = useRouter();
const isLoading = ref<boolean>(false);

const user = reactive<Credential>({
  email: "",
  password: "",
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
};

const v$ = useVuelidate(rules, user, { $externalResults });

const tryLogin = async (): Promise<void> => {
  isLoading.value = true;
  const isValid = await v$.value.$validate();
  if (isValid) {
    const { error } = await store.login(user);
    if (error) $externalResults.email = t(error);
    else await router.push({ name: "productsListPage" });
  }
  isLoading.value = false;
};
</script>
