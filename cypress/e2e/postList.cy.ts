import { useCommon } from "../commons";
const { login, fetchProductImages, fetchMyProducts } = useCommon();

describe("Products list", () => {
  it("Should display products list", () => {
    fetchMyProducts();
    fetchProductImages();
    login();
  });
});
