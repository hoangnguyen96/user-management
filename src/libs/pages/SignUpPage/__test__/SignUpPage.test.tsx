import { WrapperRouter, renderWithQueryClient } from "@app/ui/test-utils";
import { fireEvent, waitFor } from "@testing-library/react";

// Constants
import { USER_ROLE } from "@app/constants";

// Api
import { useCreateCustomer } from "@app/api";

// Utils
import * as utils from "@app/utils"; // { customUsername, isEnableSubmitButton }

// Component
import SignUpPage from "..";

jest.mock("@app/api", () => ({
  useCreateCustomer: jest.fn(),
}));

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"), // Import the actual implementations
  customUsername: jest.fn(),
  isEnableSubmitButton: jest.fn(),
}));

describe("SignUpPage component", () => {
  const mockCreateCustomer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCreateCustomer as jest.Mock).mockReturnValue({
      isPending: false,
      mutate: mockCreateCustomer,
    });
    jest.spyOn(utils, "customUsername").mockReturnValue("custom_username");
    jest.spyOn(utils, "isEnableSubmitButton").mockReturnValue(true);
  });

  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(
        <WrapperRouter>
          <SignUpPage />
        </WrapperRouter>
      )
    ).toMatchSnapshot();
  });

  it("Should handle create user successfully", async () => {
    const { getByPlaceholderText, getByTestId } = renderWithQueryClient(
      <WrapperRouter>
        <SignUpPage />
      </WrapperRouter>
    );

    fireEvent.change(getByPlaceholderText(/fullname/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(getByPlaceholderText(/2051234444/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(getByPlaceholderText(/abc@gmail.com/i), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(getByPlaceholderText(/company/i), {
      target: { value: "Test Company" },
    });
    fireEvent.change(getByPlaceholderText(/country/i), {
      target: { value: "Test Country" },
    });

    fireEvent.click(getByTestId("button-sign-up"));

    await waitFor(() => {
      expect(mockCreateCustomer).toHaveBeenCalledWith(
        {
          fullName: "Test User",
          phoneNumber: "1234567890",
          email: "testuser@example.com",
          company: "Test Company",
          country: "Test Country",
          username: "custom_username",
          password: "123456",
          role: USER_ROLE.CONSUMER,
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        })
      );

      const [_, { onSuccess }] = mockCreateCustomer.mock.calls[0];
      onSuccess();

      const closeButton = getByTestId("close-modal");
      fireEvent.click(closeButton);
    });
  });

  it("Should handle create user failure", async () => {
    window.alert = jest.fn();

    const { getByPlaceholderText, getByTestId } = renderWithQueryClient(
      <WrapperRouter>
        <SignUpPage />
      </WrapperRouter>
    );

    fireEvent.change(getByPlaceholderText(/fullname/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(getByPlaceholderText(/2051234444/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(getByPlaceholderText(/abc@gmail.com/i), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(getByPlaceholderText(/company/i), {
      target: { value: "Test Company" },
    });
    fireEvent.change(getByPlaceholderText(/country/i), {
      target: { value: "Test Country" },
    });

    fireEvent.click(getByTestId("button-sign-up"));

    await waitFor(() => {
      expect(mockCreateCustomer).toHaveBeenCalledWith(
        {
          fullName: "Test User",
          phoneNumber: "1234567890",
          email: "testuser@example.com",
          company: "Test Company",
          country: "Test Country",
          username: "custom_username",
          password: "123456",
          role: USER_ROLE.CONSUMER,
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
          onError: expect.any(Function),
        })
      );

      const [_, { onError }] = mockCreateCustomer.mock.calls[0];
      onError();

      expect(window.alert).toHaveBeenCalledWith("Create User failed!");
    });
  });
});
