import { defineStore } from "pinia";
import { LocaleState } from "@/utils/method";
import { AuthService } from "@/services/main";
import type { Credential } from "@/domain/user";
import { EmptyToken, Token } from "@/domain/token";
import { type ApiResponse, ErrorHandler } from "./api";

const { setToken } = LocaleState();

export const useSessionStore = defineStore("session", {
  state: () => ({
    token: EmptyToken(),
  }),
  actions: {
    async login(credential: Credential): Promise<ApiResponse<undefined>> {
      try {
        const { value } = await AuthService.authenticate({
          requestBody: {
            email: credential.email,
            password: credential.password,
          },
        });
        this.token = new Token({
          value,
        });
        setToken(value!);
        return {};
      } catch (error) {
        return ErrorHandler(error);
      }
    },
  },
});
