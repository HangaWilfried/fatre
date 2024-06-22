import { defineStore } from "pinia";
import { AuthService } from "@/services/main";
import { type Credential, EmptyUser, User, type UserData } from "@/domain/user";
import { type ApiResponse, ErrorHandler } from "@/stores/api";
import { LocaleState } from "@/utils/method";

const { setToken, setUserId } = LocaleState();

export const UserStore = defineStore("user", {
  actions: {
    login: async (credential: Credential): Promise<ApiResponse<undefined>> => {
      try {
        const { value } = await AuthService.authenticate({
          requestBody: {
            email: credential.email,
            password: credential.password,
          },
        });
        setToken(value!);
        return {};
      } catch (error) {
        return ErrorHandler(error);
      }
    },
    createOne: async (user: UserData): Promise<ApiResponse<undefined>> => {
      try {
        const { id, accessToken } = await AuthService.createUser({
          requestBody: User.builder(user),
        });
        setToken(accessToken?.value!);
        setUserId(id!);
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
    editUser: async (user: UserData): Promise<ApiResponse<undefined>> => {
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
