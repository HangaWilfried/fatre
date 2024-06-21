import { AuthService } from "@/services/main";
import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  actions: {
    login: async () => {
      try {
        await AuthService.authenticate({
          requestBody: {},
        });
      } catch (error) {
        console.log(error);
      }
    },
    createOne: async () => {
      try {
        await AuthService.createUser({
          requestBody: {},
        });
      } catch (error) {
        console.log(error);
      }
    },
    getUserData: async () => {
      try {
        await AuthService.getCurrentUser({
          extractCode: "",
        });
      } catch (error) {
        console.log(error);
      }
    },
    editUser: async () => {
      try {
        await AuthService.updateUser({
          requestBody: {},
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
