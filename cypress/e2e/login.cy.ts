import { useCommon } from "../commons";

const { login, fetchMyProducts, fetchProductImages } = useCommon();

describe("Authentication", () => {
  it("Should succeed to sign in", () => {
    fetchMyProducts();
    fetchProductImages();
    login();
  });
});
