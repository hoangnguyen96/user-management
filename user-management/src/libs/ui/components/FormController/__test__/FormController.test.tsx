import { renderWithQueryClient } from "@app/ui/test-utils";
import { fireEvent } from "@testing-library/react";

// Models
import { UserResponse } from "@app/models";

// Component
import FormController from "..";

// Mock utils
jest.mock("@app/utils", () => ({
  clearErrorOnChange: jest.fn(),
  isEnableSubmitButton: jest.fn().mockReturnValue(true),
  validatePhoneNumber: jest.fn().mockReturnValue(true),
  validateRegExpFormat: jest.fn().mockReturnValue(true),
  validateRequired: jest.fn().mockReturnValue(true),
}));

describe("FormProduct component", () => {
  const mockOnSubmit = jest.fn();
  const mockOnNavigate = jest.fn();

  const itemUpdate: Partial<UserResponse> = {
    fullName: "John Doe",
    company: "Test Company",
    phoneNumber: "1234567890",
    email: "john.doe@test.com",
    country: "Test Country",
  };

  const props = {
    isOpen: true,
    isLoading: false,
    itemUpdate: itemUpdate,
    onSubmit: mockOnSubmit,
    onNavigate: mockOnNavigate,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(<FormController {...props} />)
    ).toMatchSnapshot();
  });

  it("Should calls onNavigate when Home button is clicked", async () => {
    const { getByText } = renderWithQueryClient(
      <FormController {...props} itemUpdate={{}} />
    );

    fireEvent.click(getByText("Home"));

    expect(mockOnNavigate).toHaveBeenCalledWith("/");
  });

  it("Should allows numeric characters and control keys", () => {
    const { getByPlaceholderText } = renderWithQueryClient(
      <FormController {...props} itemUpdate={{}} />
    );

    const phoneNumberInput = getByPlaceholderText("2051234444");

    const allowedKeys = [
      "0",
      "9",
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
    ];
    allowedKeys.forEach((key) => {
      const event = new KeyboardEvent("keydown", {
        key,
        bubbles: true,
        cancelable: true,
      });
      const preventDefaultSpy = jest.spyOn(event, "preventDefault");

      fireEvent(phoneNumberInput, event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });
  });

  it("Should prevents entering more than 10 digits", () => {
    const { getByPlaceholderText } = renderWithQueryClient(
      <FormController {...props} itemUpdate={{}} />
    );

    const phoneNumberInput = getByPlaceholderText("2051234444");

    // Set the value to 10 digits
    fireEvent.change(phoneNumberInput, { target: { value: "1234567890" } });

    const event = new KeyboardEvent("keydown", {
      key: "1",
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = jest.spyOn(event, "preventDefault");

    fireEvent(phoneNumberInput, event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
