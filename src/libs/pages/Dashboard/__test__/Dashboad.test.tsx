import { renderWithQueryClient } from "@app/ui/test-utils";

// Component
import Dashboard from "..";

describe("Dashboard component", () => {
  it("Should render snapshot correctly", () => {
    expect(renderWithQueryClient(<Dashboard />)).toMatchSnapshot();
  });
});
