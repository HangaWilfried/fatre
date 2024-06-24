// https://on.cypress.io/api

describe("Authentication", () => {
  it("Should succeed to sign in", () => {
    login();
  });
});

const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbnlAZ21haWwuY29tIiwiaWF0IjoxNzE5MDY2OTM3LCJleHAiOjE3MTkxMDA4MDB9.gqkRPHu9Kf6CNR_chyKWHeN6ehKfMTUejW1d8mdXfmw";

const login = (credential: {
  email: string; 
  password: string
} = { 
  email: "demo@email.com",
  password: "demo.password" 
}): void => {
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
