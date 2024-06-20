import { render } from "@app/ui/test-utils";

// Component
import Promote from "..";

describe("Promote component", () => {
  it("Should render snapshot correctly", () => {
    expect(render(<Promote />)).toMatchSnapshot();
  });
});
