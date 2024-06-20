import { render } from "@app/ui/test-utils";

// Component
import LoadingIndicator from "..";

describe("LoadingIndicator component", () => {
  it("Should render snapshot correctly", () => {
    expect(render(<LoadingIndicator />)).toMatchSnapshot();
  });
});
