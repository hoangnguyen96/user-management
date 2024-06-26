import { renderWithQueryClient } from "@app/ui/test-utils";

// Models
import { UserResponse } from "@app/models";

// Component
import ListCustomersContent from "..";
import { USER_ROLE } from "@app/constants";
import { fireEvent, waitFor } from "@testing-library/react";

const mockCustomer: UserResponse = {
  id: "1",
  fullName: "John Doe",
  company: "Company A",
  phoneNumber: "1234567890",
  email: "john@example.com",
  country: "USA",
  status: true,
  role: USER_ROLE.ADMIN,
  username: "admin",
  password: "123456",
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
    data: [mockCustomer],
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

describe("ListCustomersContent component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(<ListCustomersContent isAdmin={true} id="1" />)
    ).toMatchSnapshot();
  });

  it("Should handle text input change correctly", async () => {
    const { getByPlaceholderText } = renderWithQueryClient(
      <ListCustomersContent isAdmin={true} id="1" />
    );

    const input = getByPlaceholderText("Search…") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "John" } });

    await waitFor(() => {
      expect(input.value).toBe("John");
    });
  });
});
