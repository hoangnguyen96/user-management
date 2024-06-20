import { WrapperRouter, renderWithQueryClient } from "@app/ui/test-utils";

// Component
import NavigationBar from "..";

describe("NavigationBar component", () => {
  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(
        <WrapperRouter>
          <NavigationBar />
        </WrapperRouter>
      )
    ).toMatchSnapshot();
  });
});
