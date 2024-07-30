import { render } from "@app/ui/test-utils";
import { fireEvent, waitFor } from "@testing-library/react";

// Constants
import { SORT_DATA_CUSTOMERS } from "../../../../constants";

// Component
import HeadingSearch from "..";

describe("HeadingSearch component", () => {
  const props = {
    title: "All Customers",
    subTitle: "Active Members",
    textSearch: "search term",
    list: SORT_DATA_CUSTOMERS,
    setSelectionValue: jest.fn(),
    handleOnChangeText: jest.fn(),
    onOpenModalProduct: jest.fn(),
  };

  it("Should render snapshot correctly", () => {
    expect(render(<HeadingSearch {...props} />)).toMatchSnapshot();
  });

  it("Should renders SearchBar component with correct value and onChange handler", () => {
    const { getByRole } = render(<HeadingSearch {...props} />);
    const searchBar = getByRole("textbox") as HTMLInputElement;
    expect(searchBar).toBeInTheDocument();
    expect(searchBar.value).toBe("search term");

    fireEvent.change(searchBar, { target: { value: "new search term" } });
    expect(props.handleOnChangeText).toHaveBeenCalledTimes(1);
  });

  it("Should renders Add button and calls onOpenModalProduct on click", () => {
    const { getByTestId } = render(
      <HeadingSearch {...props} isProduct={true} />
    );
    const addButton = getByTestId("modal-add-product");
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);
    expect(props.onOpenModalProduct).toHaveBeenCalledTimes(1);
  });

  it("Should renders Selection component with correct list and onChange handler", async () => {
    const { getByTestId, getByRole, getByLabelText, getByText } = render(
      <HeadingSearch {...props} />
    );
    const selection = getByTestId("change-selection");
    expect(selection).toBeInTheDocument();

    fireEvent.mouseDown(getByLabelText(/short by:/i));

    await waitFor(() => getByRole("listbox"));

    const newOption = getByText("Phone");
    fireEvent.click(newOption);

    expect(props.setSelectionValue).toHaveBeenCalledWith("phoneNumber");
  });
});
