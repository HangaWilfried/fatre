import { Civility } from "@/domain/civility";
import {
  GenderDTO,
  type UserDTO,
  type RegistrationRequestDTO,
} from "@/services/main";
import { Contact, EmptyContact } from "@/domain/contact";

export type Credential = {
  email: string;
  password: string;
};

export type UserData = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: {
    number: string;
    countryCode: string;
  };
  profileImageId: string;
};

export class User {
  public isNull: boolean;
  constructor(private user: UserDTO) {
    this.isNull = false;
  }

  get id(): string {
    return this.user.id ?? "";
  }

  get email(): string {
    return this.user.email ?? "";
  }

  get firstname(): string {
    return this.user.firstname ?? "";
  }

  get lastname(): string {
    return this.user.lastname ?? "";
  }

  get dateOfBirth(): string {
    return this.user.dateOfBirth ?? "";
  }

  get profile(): string {
    return this.user.profileImageId ?? "";
  }

  get hasProfile(): boolean {
    return this.profile !== "";
  }

  get avatar(): string {
    return `${this.lastname[0]}${this.firstname[0]}`;
  }

  get civility(): string {
    return this.user.gender ? Civility[this.user.gender] : "";
  }

  get contact(): Contact {
    return this.user.phoneNumber
      ? new Contact(this.user.phoneNumber)
      : EmptyContact();
  }

  static builder(user: UserData): RegistrationRequestDTO {
    return {
      email: user.email,
      lastname: user.lastname,
      password: user.password,
      firstname: user.firstname,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      profileImageId: user.profileImageId,
      gender: GenderDTO[user.gender as keyof typeof GenderDTO],
    };
  }
}

export const EmptyUser = (): User => {
  const user = new User({});
  user.isNull = true;
  return user;
};
