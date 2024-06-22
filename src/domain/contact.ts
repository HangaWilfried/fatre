import type { PhoneNumberDTO } from "@/services/main";

export class Contact {
  public isNull: boolean;

  constructor(private contact: PhoneNumberDTO) {
    this.isNull = false;
  }

  get countryCode(): string {
    return this.contact.countryCode ?? "";
  }

  get number(): string {
    return this.contact.number ?? "";
  }

  get toString(): string {
    return this.countryCode + this.number;
  }
}

export const EmptyContact = (): Contact => {
  const contact = new Contact({});
  contact.isNull = true;
  return contact;
};
