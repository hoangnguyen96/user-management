import { renderWithQueryClient } from "@app/ui/test-utils";
import { fireEvent } from "@testing-library/react";

// Stores
import * as stores from "@app/stores";

// Hooks
import * as hooks from "@app/hooks";

// Component
import Footer from "../index";

const mockUser = {
  fullName: "John Doe",
  company: "Example Inc.",
};

jest.mock("@app/stores", () => ({
  useAuthStore: jest.fn(),
}));

jest.mock("@app/hooks", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@mui/material/useMediaQuery", () => jest.fn());

describe("Footer component", () => {
  const useMediaQuery = require("@mui/material/useMediaQuery");

  beforeEach(() => {
    (hooks.useAuth as unknown as jest.Mock).mockReturnValue({
      handleLogout: jest.fn(),
    });
    (stores.useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: mockUser,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render snapshot correctly", () => {
    expect(renderWithQueryClient(<Footer />)).toMatchSnapshot();
  });

  it("Should does not render upgrade message on small screens", () => {
    useMediaQuery.mockImplementation(() => true);
    const { queryByText } = renderWithQueryClient(<Footer />);

    expect(
      queryByText(/Upgrade to PRO to get access all Features!/i)
    ).toBeInTheDocument();
    expect(queryByText(/Get Pro Now!/i)).toBeInTheDocument();
  });

  it("Should handle opens and closes menu", () => {
    useMediaQuery.mockImplementation(() => true);
    const { getByTestId, getByText } = renderWithQueryClient(<Footer />);

    fireEvent.click(getByTestId("logout-account"));

    expect(getByText("Logout")).toBeInTheDocument();

    fireEvent.click(getByText("Logout"));
  });

  it("Should calls handleLogoutApp on logout", () => {
    useMediaQuery.mockImplementation(() => true);
    const { getByRole, getByText } = renderWithQueryClient(<Footer />);

    fireEvent.click(getByRole("img"));

    expect(getByText(/Logout/i)).toBeInTheDocument();

    fireEvent.click(getByText(/Logout/i));

    const handleLogout = hooks.useAuth().handleLogout;
    expect(handleLogout).toHaveBeenCalled();
  });
});
