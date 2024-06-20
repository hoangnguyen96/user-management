import { WrapperRouter, renderWithQueryClient } from "@app/ui/test-utils";

// Component
import DashboardLayout from "..";

// Mock the logo import
jest.mock("/src/assets/images/user-manage.svg", () => "logo.svg");

describe("DashboardLayout component", () => {
  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(
        <WrapperRouter>
          <DashboardLayout>children</DashboardLayout>
        </WrapperRouter>
      )
    ).toMatchSnapshot();
  });
});
