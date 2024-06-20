import { renderWithQueryClient } from "@app/ui/test-utils";

// Component
import ModalBase from "../ModalBase";

describe("ModalBase component", () => {
  const props = {
    title: "Title",
    isOpen: true,
    children: <>Children</>,
    onClose: () => {},
  };

  it("Should render snapshot correctly", () => {
    expect(renderWithQueryClient(<ModalBase {...props} />)).toMatchSnapshot();
  });
});
