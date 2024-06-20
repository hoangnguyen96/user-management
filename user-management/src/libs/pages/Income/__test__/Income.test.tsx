import { render } from "@app/ui/test-utils";

// Component
import Income from "..";

describe("Income component", () => {
  it("Should render snapshot correctly", () => {
    expect(render(<Income />)).toMatchSnapshot();
  });
});
