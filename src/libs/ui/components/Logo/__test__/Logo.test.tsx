import { WrapperRouter, render } from "../../../test-utils";
import { fireEvent } from "@testing-library/react";

// Stores
import * as stores from "@app/stores";

// Component
import Logo from "..";

// Mock the logo import
jest.mock("/src/assets/images/user-manage.svg", () => "logo.svg");

jest.mock("@app/stores", () => ({
  useAuthStore: jest.fn(),
}));

describe("Logo component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render snapshot correctly", () => {
    jest.spyOn(stores, "useAuthStore").mockReturnValue({
      isAuthenticated: true,
    });
    expect(
      render(
        <WrapperRouter>
          <Logo />
        </WrapperRouter>
      )
    ).toMatchSnapshot();
  });

  it("Should navigates to DASHBOARD when authenticated", () => {
    jest.spyOn(stores, "useAuthStore").mockReturnValue({
      isAuthenticated: true,
    });
    const { getByTestId } = render(
      <WrapperRouter>
        <Logo />
      </WrapperRouter>
    );

    fireEvent.click(getByTestId("click-logo"));

    expect(window.location.pathname).toBe("/dashboard");
  });
});
