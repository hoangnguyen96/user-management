import { WrapperRouter, renderWithQueryClient } from "@app/ui/test-utils";

// Component
import BaseLayout from "..";

// Mock the logo import
jest.mock("/src/assets/images/user-manage.svg", () => "logo.svg");

describe("BaseLayout component", () => {
  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(
        <WrapperRouter>
          <BaseLayout />
        </WrapperRouter>
      )
    ).toMatchSnapshot();
  });
});
