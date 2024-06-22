import type { MoneyDTO } from "@/services/main";
import { CurrencyDTO } from "@/services/main";

export class Money {
  public isNull: boolean;
  constructor(private money: MoneyDTO) {
    this.isNull = false;
  }

  get currency(): string {
    if (this.money.currency) {
      return Currency[this.money.currency];
    }
    return Currency.XAF;
  }

  get value(): number {
    return this.money.amount ?? 0;
  }
}

export const EmptyMoney = () => {
  const money = new Money({
    amount: 0,
    currency: CurrencyDTO.XAF,
  });
  money.isNull = true;
  return money;
};

export enum Currency {
  XAF = "XAF",
}
