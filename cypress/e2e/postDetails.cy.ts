import { useCommon } from "../commons";
const { login, fetchProductById, fetchMyProducts, fetchProductImages } =
  useCommon();

describe("PostDetails", () => {

  it("should display the post details", () => {
    fetchMyProducts();
    fetchProductImages();
    login();
    fetchProductById("844060bb-fb75-408d-9cd0-f0eb601be906");
    cy.get("[data-test=product-844060bb-fb75-408d-9cd0-f0eb601be906]").click();
  });
});
