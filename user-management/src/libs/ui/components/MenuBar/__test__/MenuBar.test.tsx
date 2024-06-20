import { renderWithQueryClient } from "@app/ui/test-utils";

// Component
import MenuBar from "..";

describe("MenuBar component", () => {
  const props = {
    open: true,
    options: ["Edit", "Delete"],
    anchorEl: null,
    onClose: () => {},
    onClick: () => {},
    onClickOption: () => {},
  };

  it("Should render snapshot correctly", () => {
    expect(renderWithQueryClient(<MenuBar {...props} />)).toMatchSnapshot();
  });
});
