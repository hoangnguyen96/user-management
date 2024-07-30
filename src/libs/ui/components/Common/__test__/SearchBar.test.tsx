import { fireEvent, render } from "@testing-library/react";

// Component
import { SearchBar } from "../SearchBar";

describe("SearchBar component", () => {
  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render snapshot correctly", () => {
    expect(
      render(<SearchBar value="" onChange={mockOnChange} />)
    ).toMatchSnapshot();
  });

  it("should call onChange when typing in the input with empty value", () => {
    const { getByPlaceholderText, rerender } = render(
      <SearchBar value="" onChange={mockOnChange} />
    );
    const inputElement = getByPlaceholderText(/search/i);
    fireEvent.change(inputElement, { target: { value: "test" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    rerender(<SearchBar value="test" onChange={mockOnChange} />);
    expect(inputElement).toHaveValue("test");
  });

  it("should call onChange when typing in the input with non-empty value", () => {
    const { getByPlaceholderText, rerender } = render(
      <SearchBar value="test" onChange={mockOnChange} />
    );
    const inputElement = getByPlaceholderText(/search/i);
    fireEvent.change(inputElement, { target: { value: "new value" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    rerender(<SearchBar value="new value" onChange={mockOnChange} />);
    expect(inputElement).toHaveValue("new value");
  });
});
