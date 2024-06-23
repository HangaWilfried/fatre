export function LocaleState() {
  return {
    setUserId(id: string): void {
      localStorage.setItem("user-id", id);
    },

    getUserId(): string {
      return localStorage.getItem("user-id") ?? "";
    },

    setToken(token: string) {
      localStorage.setItem("apiAccessToken", token);
    },

    getToken(): string {
      return localStorage.getItem("apiAccessToken") ?? "";
    },
  };
}

export const uuid = (): string => {
  const heap = Date.now().toString(36);
  const tail = Math.random().toString(36).substring(2);

  return heap + tail;
};
