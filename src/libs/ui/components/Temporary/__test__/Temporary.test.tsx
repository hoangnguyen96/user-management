import { render } from "@app/ui/test-utils";

// Component
import Temporary from "..";

describe("Temporary component", () => {
  it("Should render snapshot correctly", () => {
    expect(render(<Temporary title="Page Temporary" />)).toMatchSnapshot();
  });
});
