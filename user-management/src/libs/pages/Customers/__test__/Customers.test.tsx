import { renderWithQueryClient } from "@app/ui/test-utils";

// Component
import Customers from "..";

describe("Customers component", () => {
  it("Should render snapshot correctly", () => {
    expect(renderWithQueryClient(<Customers />)).toMatchSnapshot();
  });
});
