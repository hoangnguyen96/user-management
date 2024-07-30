import { renderWithQueryClient } from "@app/ui/test-utils";
import { fireEvent } from "@testing-library/react";

// Component
import MenuBar from "..";

describe("MenuBar component", () => {
  const props = {
    open: true,
    options: ["Edit", "Delete"],
    anchorEl: null,
    onClose: jest.fn(),
    onClick: jest.fn(),
    onClickOption: jest.fn(),
  };

  it("Should render snapshot correctly", () => {
    expect(renderWithQueryClient(<MenuBar {...props} />)).toMatchSnapshot();
  });

  it("Should open menu when clicked", () => {
    const { getByTestId } = renderWithQueryClient(<MenuBar {...props} />);

    const button = getByTestId("button-more-menu");
    fireEvent.click(button);
    expect(props.onClick).toHaveBeenCalled();
  });

  it("Should calls onClickOption with correct option when menu item is clicked", () => {
    const { getByText } = renderWithQueryClient(<MenuBar {...props} />);
    const menuItem = getByText("Edit");

    fireEvent.click(menuItem);

    expect(props.onClickOption).toHaveBeenCalledWith("Edit");
  });
});
