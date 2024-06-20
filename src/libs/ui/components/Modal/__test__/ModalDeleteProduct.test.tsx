import { renderWithQueryClient } from "@app/ui/test-utils";

// Component
import ModalDeleteProduct from "../ModalDeleteProduct";

describe("ModalDeleteProduct component", () => {
  const props = {
    id: "4",
    userId: "4",
    isOpen: true,
    isLoading: false,
    onClose: () => {},
    onSubmit: () => {},
  };

  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(<ModalDeleteProduct {...props} />)
    ).toMatchSnapshot();
  });
});
