/// <reference types="cypress" />

import { filesSources, imagesId } from "./data";
import { CurrencyDTO, PublicationStatusDTO } from "../../src/services/main";

export const useCommon = () => {
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbnlAZ21haWwuY29tIiwiaWF0IjoxNzE5MDY2OTM3LCJleHAiOjE3MTkxMDA4MDB9.gqkRPHu9Kf6CNR_chyKWHeN6ehKfMTUejW1d8mdXfmw";

  const login = (credential: {
  email: string;
  password: string
} = {
    email: "demo@email.com",
    password: "demo.password"
  }): void => {
    cy.viewport("iphone-xr");
    cy.visit("/login");
    cy.get("[data-test='input-email']").type(credential.email);
    cy.get("[data-test='input-password']").type(credential.password);

    cy.intercept({
      url: "http://localhost:8080/sign-in",
      method: "POST"
    }, {
      statusCode: 200,
      body: {
        value: token,
      }
    });
    cy.get("[data-test='continue-btn']").click();
  };

  const createImage = (imageId: string) => {
    cy.intercept(
      {
        url: "http://localhost:8080/image/upload",
        method: "POST",
      },
      {
        statusCode: 200,
        body: { id: imageId }
      }
    ).as("save-image");
  };

  const createProduct = (): void => {
    cy.intercept(
      {
        url: "http://localhost:8080/publication",
        method: "POST",
      },
      {
        statusCode: 200,
        body: "844060bb-fb75-408d-9cd0-f0eb601be906",
      }
    ).as("createProduct");
  };

  const fetchImageById = (id: string, imageSrc: string): void => {
    cy.intercept(
      {
        url: `http://localhost:8080/image/${id}`,
        method: "GET",
      },
      {
        statusCode: 200,
        fixture: imageSrc.replace("cypress/fixtures/", ""),
      }
    ).as(`image-${id}`);
  };

  const fetchProductById = (id: string): void => {
    cy.intercept(
      {
        url: `http://localhost:8080/publication/${id}`,
        method: "GET",
      },
      {
        statusCode: 200,
        body: {
          title: "Tecno fantom 12",
          allImageIds: imagesId,
          price: {
            amount: 120000,
            currency: "XAF"
          },
          description: "Faites une sélection de tous vos articles préférés en les enregistrant dans Votre sélection, puis revenez à tout moment et reprenez exactement là où vous en étiez.",
          status: "DRAFT",
        },
      }
    );
  };

  const fetchMyProducts = (): void => {
    cy.intercept(
      {
        url: "http://localhost:8080/publication",
        method: "GET",
      },
      {
        statusCode: 200,
        body: [
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
        ],
      }
    );
  };

  const fetchProductImages = (): void => {
    imagesId.forEach((id, index) => {
      fetchImageById(id, filesSources[index]);
    });
  };

  return {
    login,
    createImage,
    createProduct,
    fetchImageById,
    fetchMyProducts,
    fetchProductById,
    fetchProductImages,
  };
};
