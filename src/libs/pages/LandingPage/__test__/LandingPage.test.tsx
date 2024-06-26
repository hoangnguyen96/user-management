import { render } from "@app/ui/test-utils";
import { fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

// Constants
import { ROUTES } from "@app/constants";

// Component
import LandingPageBase from "..";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("LandingPageBase component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render snapshot correctly", () => {
    expect(render(<LandingPageBase />)).toMatchSnapshot();
  });

  it("Should handle click login", () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    const { getByText } = render(<LandingPageBase />);

    fireEvent.click(getByText("Login"));

    expect(getByText("Login")).toBeInTheDocument();
    expect(navigate).toHaveBeenCalledWith(ROUTES.LOGIN);
  });

  it("Should handle click sign up", () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    const { getByText } = render(<LandingPageBase />);

    fireEvent.click(getByText("SignUp"));

    expect(getByText("SignUp")).toBeInTheDocument();
    expect(navigate).toHaveBeenCalledWith(ROUTES.SIGNUP);
  });
});
