import { render } from "@app/ui/test-utils";

// Component
import LazyFallbackContent from "..";

describe("LazyFallbackContent component", () => {
  it("Should render snapshot correctly", () => {
    expect(render(<LazyFallbackContent />)).toMatchSnapshot();
  });
});
