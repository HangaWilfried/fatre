import type { PublicationDTO } from "@/services/main";
import { emptyMoney, Money } from "./money";

export class Post {
  public isNull: boolean;

  constructor(private post: PublicationDTO) {
    this.isNull = false;
  }

  get id(): string {
    return this.post.id ?? "";
  }

  get title(): string {
    return this.post.title ?? "";
  }

  get description(): string {
    return this.post.description ?? "";
  }

  get files(): string[] {
    return this.post.allImageIds ?? [];
  }

  get status(): string {
    if (this.post.status) {
      return Status[this.post.status];
    }
    return Status.DRAFT;
  }

  get price(): Money {
    if (this.post.price) {
      return new Money(this.post.price);
    }
    return emptyMoney();
  }

  get isDraft(): boolean {
    return this.status === Status.DRAFT;
  }
}

export const emptyPost = () => {
  const post = new Post({});
  post.isNull = true;
  return post;
};

export enum Status {
  DRAFT = "DRAFT",
  POST = "POST",
}
