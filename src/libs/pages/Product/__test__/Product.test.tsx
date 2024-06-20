import { WrapperRouter, renderWithQueryClient } from "@app/ui/test-utils";

// Component
import Product from "..";

describe("Product component", () => {
  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(
        <WrapperRouter>
          <Product />
        </WrapperRouter>
      )
    ).toMatchSnapshot();
  });
});
