import { OpenAPI } from "@/services/main";
import { LocaleState } from "@/utils/method";

const { getToken } = LocaleState();

export const prepareApis = () => {
  OpenAPI.HEADERS = customHeaders;
  OpenAPI.TOKEN = getPublicAccessToken;
  OpenAPI.BASE = import.meta.env.API_BASE_URL;
};

const getPublicAccessToken = async (): Promise<string> => {
  return getToken();
};

export const customHeaders = async (): Promise<Record<string, string>> => {
  const publicAccessToken: string = getToken();

  if (publicAccessToken) {
    return {
      Authorization: "Bearer " + publicAccessToken,
      "tenant-id": localStorage.getItem("tenant-id") as string,
    };
  }

  return {
    "tenant-id": localStorage.getItem("tenant-id") as string,
  };
};
