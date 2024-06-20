import { renderWithQueryClient } from "@app/ui/test-utils";

// Component
import ModalUpdateProduct from "../ModalUpdateProduct";

describe("ModalUpdateProduct component", () => {
  const props = {
    isOpen: true,
    isLoading: false,
    itemUpdate: { name: "abc" },
    onClose: () => {},
    onSubmit: () => {},
  };

  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(<ModalUpdateProduct {...props} />)
    ).toMatchSnapshot();
  });
});
