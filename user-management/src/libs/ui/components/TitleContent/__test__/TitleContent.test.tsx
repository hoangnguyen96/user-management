import { render } from "@app/ui/test-utils";

// Component
import TitleContent from "..";

describe("TitleContent component", () => {
  it("Should render snapshot correctly", () => {
    expect(render(<TitleContent name="TitleContent" />)).toMatchSnapshot();
  });
});
