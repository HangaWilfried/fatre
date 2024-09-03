import {
  type CreatePublicationDTO,
  CurrencyDTO,
  type PublicationDTO,
} from "@/services/main";
import { EmptyMoney, Money } from "./money";

export type PostData = {
  amount: string;
  fileIds: string[];
  title: string;
  description: string;
};

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

  get amount(): Money {
    if (this.post.price) {
      return new Money(this.post.price);
    }
    return EmptyMoney();
  }

  get isDraft(): boolean {
    return this.status === Status.DRAFT;
  }

  get isPosted(): boolean {
    return this.status === Status.POST;
  }

  static builder(post: PostData): CreatePublicationDTO {
    return {
      price: {
        amount: Number(post.amount),
        currency: CurrencyDTO.XAF,
      },
      allImageIds: post.fileIds,
      title: post.title,
      description: post.description,
    };
  }
}

export const EmptyPost = () => {
  const post = new Post({});
  post.isNull = true;
  return post;
};

export enum Status {
  DRAFT = "draft",
  POST = "post",
}
