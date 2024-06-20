import { render } from "@app/ui/test-utils";

// Constants
import { SORT_DATA_CUSTOMERS } from "../../../../constants";

// Component
import HeadingSearch from "..";

describe("HeadingSearch component", () => {
  const props = {
    title: "All Customers",
    subTitle: "Active Members",
    textSearch: "a",
    list: SORT_DATA_CUSTOMERS,
    setSelectionValue: () => {},
    setTextSearch: () => {},
  };

  it("Should render snapshot correctly", () => {
    expect(render(<HeadingSearch {...props} />)).toMatchSnapshot();
  });
});
