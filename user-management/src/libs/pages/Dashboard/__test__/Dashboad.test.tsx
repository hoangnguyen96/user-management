import { render } from "@app/ui/test-utils";

// Component
import Dashboard from "..";

describe("Dashboard component", () => {
  it("Should render snapshot correctly", () => {
    expect(render(<Dashboard />)).toMatchSnapshot();
  });
});
