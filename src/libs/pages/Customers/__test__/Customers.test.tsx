import { renderWithQueryClient } from "@app/ui/test-utils";

// Constants
import { USER_ROLE } from "@app/constants";

// Models
import { UserResponse } from "@app/models";

// Component
import Customers from "..";
import { LIST_CONTENT } from "@app/ui/components/ListCustomersContent/__mocks__/mock-data";

const mockCustomer: UserResponse = {
  fullName: "Jane Cooper",
  role: USER_ROLE.ADMIN,
  company: "Microsoft",
  phoneNumber: "(225) 555-0118",
  email: "jane@microsoft.com",
  country: "United States",
  status: true,
  username: "admin",
  password: "123456",
  id: "1",
};

jest.mock("@app/api", () => ({
  useGetCustomerById: jest.fn(() => ({
    isLoading: false,
    refetch: jest.fn(),
    data: mockCustomer,
  })),
  useGetListCustomers: jest.fn(() => ({
    isLoading: false,
    refetch: jest.fn(),
    data: LIST_CONTENT,
    errorMessage: "",
  })),
  useUpdateCustomer: jest.fn(() => ({
    isPending: false,
    mutate: jest.fn(),
  })),
  useDeleteCustomer: jest.fn(() => ({
    isPending: false,
    mutate: jest.fn(),
  })),
}));

describe("Customers component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render snapshot correctly", () => {
    expect(renderWithQueryClient(<Customers />)).toMatchSnapshot();
  });
});
