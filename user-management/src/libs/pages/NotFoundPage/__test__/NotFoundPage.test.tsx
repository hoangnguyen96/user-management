import { render } from "@app/ui/test-utils";

// Component
import NotFoundPage from "..";

describe("NotFoundPage component", () => {
  it("Should render snapshot correctly", () => {
    expect(render(<NotFoundPage />)).toMatchSnapshot();
  });
});
