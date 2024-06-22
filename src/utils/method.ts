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
