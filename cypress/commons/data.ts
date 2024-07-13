import { CurrencyDTO } from "../../src/services/main/models/CurrencyDTO";
import { PublicationStatusDTO } from "../../src/services/main/models/PublicationStatusDTO";
import { type PublicationDTO } from "./../../src/services/main/models/PublicationDTO";

export const imagesId = [
  "c74b4d57-4ea4-4c56-9d1a-b08f2b5e7636",
  "d4824f2d-fbc1-4dbf-8367-822e70f449cf",
  "4def6023-d36c-42c5-a01c-ae284d98e812",
  "e102f82b-6ee9-4e3e-8b33-1dbd25aed928",
];

export const filesSources = [
  "cypress/fixtures/images/file-2.jpg",
  "cypress/fixtures/images/file-4.jpg",
  "cypress/fixtures/images/file-3.jpg",
  "cypress/fixtures/images/file-1.jpg",
];

export const publications: PublicationDTO[] = [
  {
    id: "844060bb-fb75-408d-9cd0-f0eb601be906",
    title: "First publication",
    description: "This is the first publication",
    price: {
      amount: 100000,
      currency: CurrencyDTO.XAF,
    },
    allImageIds: imagesId,
    status: PublicationStatusDTO.DRAFT,
  },
  {
    id: "448b5945-567b-4f90-a7bb-ef1a7c348411",
    title: "Second publication",
    description: "This is the second publication",
    price: {
      amount: 140000,
      currency: CurrencyDTO.XAF,
    },
    allImageIds: imagesId,
    status: PublicationStatusDTO.DRAFT,
  },
];
