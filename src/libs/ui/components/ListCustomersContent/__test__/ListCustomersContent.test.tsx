import { renderWithQueryClient } from "@app/ui/test-utils";

// Models
import { UserResponse } from "@app/models";

// Component
import ListCustomersContent from "..";
import { USER_ROLE } from "@app/constants";
import { fireEvent, waitFor } from "@testing-library/react";
import { LIST_CONTENT } from "../__mocks__/mock-data";

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

describe("ListCustomersContent component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(<ListCustomersContent id="1" />)
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

  it("Should handle change pagination correctly", () => {
    const { getByRole } = renderWithQueryClient(
      <ListCustomersContent isAdmin={true} id="1" />
    );
    const paginationButton = getByRole("button", { name: "Go to page 2" });
    fireEvent.click(paginationButton);

    expect(paginationButton).toBeInTheDocument();
  });

  it("Should handle filters customer list", () => {
    const { getByPlaceholderText, getByText } = renderWithQueryClient(
      <ListCustomersContent isAdmin={true} id="1" />
    );
    const input = getByPlaceholderText("Search…");
    fireEvent.change(input, { target: { value: "Jane" } });
    expect(getByText("Jane Cooper")).toBeInTheDocument();
  });

  it("Should handle sorted for selection list", async () => {
    const { getByLabelText, getByText, getByRole } = renderWithQueryClient(
      <ListCustomersContent isAdmin={true} id="1" />
    );

    fireEvent.mouseDown(getByLabelText(/short by:/i));

    await waitFor(() => getByRole("listbox"));

    const newOption = getByText("Phone");
    fireEvent.click(newOption);

    expect(newOption).toBeInTheDocument();
  });
});
