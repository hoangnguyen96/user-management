import { renderWithQueryClient } from "@app/ui/test-utils";
import { fireEvent, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

// Stores
import { ROUTES, USER_ROLE } from "@app/constants";

// Api
import { useAuthLogin } from "@app/api";

// Stores
import * as stores from "@app/stores";

// Component
import LoginPage from "..";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("@app/stores", () => ({
  ...jest.requireActual("@app/stores"),
  useAuthStore: jest.fn(),
}));

jest.mock("@app/api", () => ({
  useAuthLogin: jest.fn(() => ({
    isPending: false,
    mutate: jest.fn(),
  })),
}));

describe("LoginPage component", () => {
  const setUser = jest.fn();
  const setIsAdmin = jest.fn();
  const setAuthenticated = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (stores.useAuthStore as unknown as jest.Mock).mockReturnValue([
      setUser,
      setIsAdmin,
      setAuthenticated,
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render snapshot correctly", () => {
    expect(renderWithQueryClient(<LoginPage />)).toMatchSnapshot();
  });

  it("should handle successful login", async () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    const mockLogin = jest.fn().mockImplementation((_, { onSuccess }) => {
      onSuccess({
        id: "1",
        username: "testuser",
        password: "password",
        fullName: "Test User",
        company: "Test Company",
        role: USER_ROLE.ADMIN,
      });
    });
    (useAuthLogin as jest.Mock).mockReturnValue({
      isPending: false,
      mutate: mockLogin,
    });

    const { getByPlaceholderText, getByText } = renderWithQueryClient(
      <LoginPage />
    );

    fireEvent.change(getByPlaceholderText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByPlaceholderText(/password/i), {
      target: { value: "password" },
    });

    fireEvent.click(getByText(/log in/i));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
      expect(setUser).toHaveBeenCalledWith({
        id: "1",
        username: "testuser",
        password: "password",
        fullName: "Test User",
        company: "Test Company",
      });
      expect(setIsAdmin).toHaveBeenCalledWith(true);
      expect(setAuthenticated).toHaveBeenCalledWith(true);
      expect(navigate).toHaveBeenCalledWith(ROUTES.CUSTOMERS);
    });
  });

  it("should handle login failure", async () => {
    const mockLoginErr = jest.fn().mockImplementation((_, { onError }) => {
      onError();
    });

    (useAuthLogin as jest.Mock).mockReturnValue({
      isPending: false,
      mutate: mockLoginErr,
    });

    const { getByPlaceholderText, getByText } = renderWithQueryClient(
      <LoginPage />
    );

    fireEvent.change(getByPlaceholderText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByPlaceholderText(/password/i), {
      target: { value: "password" },
    });

    fireEvent.click(getByText(/log in/i));

    await waitFor(() => {
      expect(mockLoginErr).toHaveBeenCalled();
      expect(
        getByText(/login failed. please check again!/i)
      ).toBeInTheDocument();
    });
  });

  it("Should handle return Home", () => {
    const { getByText } = renderWithQueryClient(<LoginPage />);

    fireEvent.click(getByText(/home/i));

    expect(getByText(/home/i)).toBeInTheDocument();
  });

  it("Should handle close notification error", async () => {
    const mockLoginErr = jest.fn().mockImplementation((_, { onError }) => {
      onError();
    });

    (useAuthLogin as jest.Mock).mockReturnValue({
      isPending: false,
      mutate: mockLoginErr,
    });

    const { getByPlaceholderText, getByText, getByTestId } =
      renderWithQueryClient(<LoginPage />);

    fireEvent.change(getByPlaceholderText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByPlaceholderText(/password/i), {
      target: { value: "password" },
    });

    fireEvent.click(getByText(/log in/i));

    await waitFor(() => {
      expect(mockLoginErr).toHaveBeenCalled();
      expect(
        getByText(/login failed. please check again!/i)
      ).toBeInTheDocument();
    });

    fireEvent.click(getByTestId("CloseIcon"));
  });
});
