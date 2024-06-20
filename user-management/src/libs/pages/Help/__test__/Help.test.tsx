import { render } from "@app/ui/test-utils";

// Component
import Help from "..";

describe("Help component", () => {
  it("Should render snapshot correctly", () => {
    expect(render(<Help />)).toMatchSnapshot();
  });
});
