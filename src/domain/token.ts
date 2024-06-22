import { ROLE } from "@/utils/enum";
import { jwtDecode } from "jwt-decode";
import { LocaleState } from "@/utils/method";
import type { TokenDTO } from "@/services/main";

const { getToken } = LocaleState();

export class Token {
  isNull: boolean;
  constructor(private token: TokenDTO) {
    this.isNull = false;
  }

  get decode(): Payload {
    const token = getToken();
    return jwtDecode<Payload>(this.token.value || token);
  }

  get accessToken(): string {
    return this.token.value || "";
  }

  set accessToken(token: string) {
    this.token.value = token;
  }

  get isLoggedIn(): boolean {
    return !this.isNull || !!getToken();
  }

  get role(): ROLE {
    return ROLE[this.decode.scopes.toUpperCase() as keyof typeof ROLE];
  }
}

export type Payload = { sub: string; iat: number; exp: number; scopes: string };

export const EmptyToken = (): Token => {
  const token = new Token({});
  token.isNull = true;
  return token;
};
