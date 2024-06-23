import { reactive } from "vue";
import { defineStore } from "pinia";
import { ImageService } from "@/services/main";
import { type ApiResponse, ErrorHandler } from "@/stores/api";

export const UseMediaStore = defineStore("media", () => {
  const cachedBlobs = reactive<Record<string, Blob>>({});

  const createOne = async (blob: Blob): Promise<ApiResponse<string>> => {
    try {
      const { id } = await ImageService.uploadImage({
        formData: {
          file: blob,
        },
      });
      return { data: id };
    } catch (error) {
      return ErrorHandler(error);
    }
  };

  const getOne = async (imageId: string): Promise<ApiResponse<Blob>> => {
    try {
      if (cachedBlobs[imageId]) {
        return { data: cachedBlobs[imageId] };
      }
      const blob = await ImageService.getImageById({
        imageId,
      });
      cachedBlobs[imageId] = blob;
      return { data: blob };
    } catch (error) {
      return ErrorHandler(error);
    }
  };

  return { createOne, getOne };
});
