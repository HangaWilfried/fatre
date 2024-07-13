import { defineStore } from "pinia";
import { ImageService } from "@/services/main";
import { type ApiResponse, ErrorHandler } from "@/stores/api";
import { LocaleState } from "@/utils/method";

const cachedBlobs: Record<string, Response> = {};
export const useMediaStore = defineStore("media", () => {
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

  const getOne = async (imageId: string): Promise<ApiResponse<Response>> => {
    const url = `${import.meta.env.VITE_REST_API_BASE_URL}/image/${imageId}`;
    if (cachedBlobs[url]) return { data: cachedBlobs[url] };
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${LocaleState().getToken()}`);
    const response = await fetch(url, {
      headers,
    });
    if (response.ok) {
      cachedBlobs[url] = response;
      return { data: response };
    }
    return ErrorHandler(response.statusText);
  };

  return {
    createOne,
    getOne,
  };
});
