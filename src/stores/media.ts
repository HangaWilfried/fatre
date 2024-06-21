import { ImageService } from "@/services/main";
import { defineStore } from "pinia";

export const MediaStore = defineStore("media", {
  actions: {
    createOne: async () => {
      try {
        await ImageService.uploadImage({
          formData: {
            file: new Blob([]),
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    getOne: async () => {
      try {
        await ImageService.getImageById({
          imageId: "",
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
