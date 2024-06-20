import { renderWithQueryClient } from "@app/ui/test-utils";

// Component
import ModalActive from "../ModalActive";

describe("ModalActive component", () => {
  const props = {
    isOpen: true,
    status: true,
    onClose: () => {},
  };

  it("Should render snapshot correctly", () => {
    expect(renderWithQueryClient(<ModalActive {...props} />)).toMatchSnapshot();
  });
});
