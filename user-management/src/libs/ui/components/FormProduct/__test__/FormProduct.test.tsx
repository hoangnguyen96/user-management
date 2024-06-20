import { renderWithQueryClient } from "@app/ui/test-utils";

// Component
import FormController from "..";
import { fireEvent } from "@testing-library/react";

// Mock utils
jest.mock("@app/utils", () => ({
  clearErrorOnChange: jest.fn(),
  isEnableSubmitButton: jest.fn().mockReturnValue(true),
  validatePrice: jest.fn().mockReturnValue(true),
  validateQuantity: jest.fn().mockReturnValue(true),
  validateRequired: jest.fn().mockReturnValue(true),
}));

describe("FormProduct component", () => {
  const mockOnSubmit = jest.fn();
  const mockOnNavigate = jest.fn();

  const props = {
    isOpen: true,
    isLoading: false,
    itemUpdate: { name: "kim" },
    onSubmit: mockOnSubmit,
    onNavigate: mockOnNavigate,
  };

  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(<FormController {...props} />)
    ).toMatchSnapshot();
  });

  it("Should render snapshot correctly when isAdmin is true", () => {
    expect(
      renderWithQueryClient(<FormController {...props} isAdmin={true} />)
    ).toMatchSnapshot();
  });

  it("Should prevents non-numeric characters from being entered in price and quantity fields", () => {
    const { getByPlaceholderText } = renderWithQueryClient(
      <FormController {...props} isAdmin={true} />
    );

    const priceInput = getByPlaceholderText("100");
    const quantityInput = getByPlaceholderText("1000");

    const nonNumericEvent = new KeyboardEvent("keydown", {
      key: "a",
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = jest.spyOn(nonNumericEvent, "preventDefault");

    fireEvent(priceInput, nonNumericEvent);
    fireEvent(quantityInput, nonNumericEvent);

    expect(preventDefaultSpy).toHaveBeenCalledTimes(2);
  });

  it("Should prevents input if length exceeds 10 characters except for Backspace and Delete", () => {
    const { getByPlaceholderText } = renderWithQueryClient(
      <FormController {...props} isAdmin={true} itemUpdate={{}} />
    );

    const priceInput = getByPlaceholderText("100");

    // Simulate typing 10 characters
    fireEvent.change(priceInput, { target: { value: "12345678901" } });
    expect(priceInput).toHaveValue("12345678901");

    // Simulate typing another character, which should be prevented
    const longInputEvent = new KeyboardEvent("keydown", {
      key: "1",
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = jest.spyOn(longInputEvent, "preventDefault");
    fireEvent(priceInput, longInputEvent);

    // Simulate pressing Backspace, which should not be prevented
    const backspaceEvent = new KeyboardEvent("keydown", {
      key: "Backspace",
      bubbles: true,
      cancelable: true,
    });
    preventDefaultSpy.mockClear();
    fireEvent(priceInput, backspaceEvent);
    expect(preventDefaultSpy).not.toHaveBeenCalled();

    // Simulate pressing Delete, which should not be prevented
    const deleteEvent = new KeyboardEvent("keydown", {
      key: "Delete",
      bubbles: true,
      cancelable: true,
    });
    preventDefaultSpy.mockClear();
    fireEvent(priceInput, deleteEvent);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
});
