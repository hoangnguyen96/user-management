import { Dispatch, SetStateAction } from "react";
import { render } from "@app/ui/test-utils";
import { fireEvent, waitFor } from "@testing-library/react";

// Constants
import { SORT_DATA_CUSTOMERS } from "@app/constants";

// Component
import { Selection } from "..";

describe("Selection component", () => {
  const setSelectionValue = jest.fn() as Dispatch<SetStateAction<string>>;

  it("Should render snapshot correctly", () => {
    expect(
      render(
        <Selection
          list={SORT_DATA_CUSTOMERS}
          setSelectionValue={setSelectionValue}
        />
      )
    ).toMatchSnapshot();
  });

  it("Should handle onChange value selection", async () => {
    const { getByRole, getByText, getByLabelText } = render(
      <Selection
        list={SORT_DATA_CUSTOMERS}
        setSelectionValue={setSelectionValue}
      />
    );

    fireEvent.mouseDown(getByLabelText(/short by:/i));

    await waitFor(() => getByRole("listbox"));

    const newOption = getByText("Phone");
    fireEvent.click(newOption);

    expect(setSelectionValue).toHaveBeenCalledWith("phoneNumber");
  });
});
