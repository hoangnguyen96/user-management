import { renderWithQueryClient } from "@app/ui/test-utils";

// Component
import ModalDeleteCustomers from "../ModalDeleteCustomers";

describe("ModalDeleteCustomers component", () => {
  const props = {
    id: "1",
    isOpen: true,
    isLoading: false,
    onClose: () => {},
    onSubmit: () => {},
  };

  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(<ModalDeleteCustomers {...props} />)
    ).toMatchSnapshot();
  });
});
