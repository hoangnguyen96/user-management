import { renderWithQueryClient } from "@app/ui/test-utils";

// Component
import ModalUpdateCustomers from "../ModalUpdateCustomers";

describe("ModalUpdateCustomers component", () => {
  const props = {
    isOpen: true,
    isLoading: false,
    itemUpdate: { fullName: "abc" },
    onClose: () => {},
    onSubmit: () => {},
  };

  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(<ModalUpdateCustomers {...props} />)
    ).toMatchSnapshot();
  });
});
