import { defineStore } from "pinia";

import { LocaleState } from "@/utils/method";
import { AuthService } from "@/services/main";
import { type ApiResponse, ErrorHandler } from "./api";

import { EmptyToken, Token } from "@/domain/token";
import { EmptyUser, User, type Credential, type UserData } from "@/domain/user";

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
    createOne: async (user: UserData): Promise<ApiResponse<undefined>> => {
      try {
        await AuthService.createUser({
          requestBody: User.builder(user),
        });
        return {};
      } catch (error) {
        return ErrorHandler(error);
      }
    },
    getUserData: async (): Promise<ApiResponse<User>> => {
      try {
        const user = await AuthService.getCurrentUser({
          extractCode: "extractCode_1",
        });
        return {
          data: new User(user),
        };
      } catch (error) {
        return ErrorHandler(error, EmptyUser());
      }
    },
    editUser: async (
      user: Partial<UserData>,
    ): Promise<ApiResponse<undefined>> => {
      try {
        await AuthService.updateUser({
          requestBody: User.builder(user),
        });
        return {};
      } catch (error) {
        return ErrorHandler(error);
      }
    },
  },
});
