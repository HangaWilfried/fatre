import { defineStore } from "pinia";
import { AuthService } from "@/services/main";
import { type ApiResponse, ErrorHandler } from "@/stores/api";
import { EmptyUser, User, type UserData } from "@/domain/user";

export const useUserStore = defineStore("user", {
  actions: {
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
