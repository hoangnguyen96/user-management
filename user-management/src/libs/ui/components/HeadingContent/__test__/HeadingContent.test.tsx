import { render } from "@app/ui/test-utils";

// Component
import HeadingContent from "..";

describe("HeadingContent component", () => {
  it("Should render snapshot correctly", () => {
    expect(render(<HeadingContent />)).toMatchSnapshot();
  });
});
