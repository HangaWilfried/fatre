import { useCommon } from "../commons";
import { filesSources, imagesId } from "../commons/data";
const {
  login,
  createImage,
  createProduct,
  fetchProductById,
  fetchImageById
} = useCommon();

describe("Product Creation", () => {
  it("Should create a product", () => {
    login();
    cy.visit("/products/new");
    cy.get("[data-test='input-amount'").type("100");
    cy.get("[data-test='input-product name']").type("post 1");
    cy.get("[data-test='input-description']").type("description 1");
    imagesId.forEach((id, index) => {
      cy.get("input[type=file]").selectFile(filesSources[index]);
      createImage(id);
    });
    createProduct();
    fetchProductById("844060bb-fb75-408d-9cd0-f0eb601be906");
    imagesId.forEach((id, index) => {
      fetchImageById(id, filesSources[index]);
    });
    cy.get("[data-test='submit-btn']").click();
    cy.wait("@createProduct").should(({ request }) => {
      expect(request.body).to.deep.equal({
        price: {
          amount: 100,
          currency: "XAF"
        },
        allImageIds: imagesId,
        title: "post 1",
        description: "description 1"
      });
    });
  });
});
