import { useCommon } from "../commons";
const { login, fetchProductById } =
  useCommon();

describe("PostDetails", () => {

  it("should display the post details", () => {
    fetchProductById("844060bb-fb75-408d-9cd0-f0eb601be906");
    login();
  });
});
