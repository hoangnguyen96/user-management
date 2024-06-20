import { renderWithQueryClient } from "@app/ui/test-utils";

// Component
import ModalCreateProduct from "../ModalCreateProduct";
import { LIST_CONTENT } from "../../ListCustomersContent/__mocks__/mock-data";

describe("ModalCreateProduct component", () => {
  const props = {
    isOpen: true,
    isLoading: false,
    itemUpdate: { name: "abc", quantity: 4 },
    listUser: LIST_CONTENT,
    onClose: () => {},
    onSubmit: () => {},
  };

  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(<ModalCreateProduct {...props} />)
    ).toMatchSnapshot();
  });
});
