import { render } from "@app/ui/test-utils";

// Component
import ItemCustomer from "../ItemCustomer";

describe("ItemCustomer component", () => {
  const props = {
    id: "1",
    fullName: "name",
    company: "Akida",
    phoneNumber: "1234567890",
    email: "aki@gmail.com",
    country: "Newzilen",
    status: true,
    isAdmin: true,
    isOpenMenu: true,
    anchorEl: document.createElement("div"),
    onClose: jest.fn(),
    onToggleActive: jest.fn(),
    onClickOption: jest.fn(),
    onClickMenu: jest.fn(),
  };
  it("Should render snapshot correctly", () => {
    expect(render(<ItemCustomer {...props} />)).toMatchSnapshot();
  });
});
