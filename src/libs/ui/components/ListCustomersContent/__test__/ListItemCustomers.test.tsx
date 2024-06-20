import { render } from "@app/ui/test-utils";

// Api
import * as api from "@app/api";

// Models
import { UserResponse } from "@app/models";

// Component
import ListItemCustomers from "../ListItemCustomers";
import { fireEvent } from "@testing-library/react";
import { HttpClient } from "@app/services";

// Mock the API hooks
jest.mock("@app/api", () => ({
  useDeleteCustomer: jest.fn(() => ({
    isPending: false,
    mutate: jest.fn(),
  })),
  useGetCustomerById: jest.fn(() => ({
    refetch: jest.fn(),
    data: {
      id: "1",
      fullName: "John Doe",
      company: "Company A",
      phoneNumber: "1234567890",
      email: "john@example.com",
      country: "USA",
      status: true,
    } as UserResponse,
  })),
  useUpdateCustomer: jest.fn(() => ({
    isPending: false,
    mutate: jest.fn(),
  })),
}));

const spyPut = jest.spyOn(HttpClient, "put");

describe("ListItemCustomers component", () => {
  const mockRefetchList = jest.fn();

  const props = {
    isLoading: false,
    isPending: false,
    isAdmin: true,
    error: "",
    listCurrent: [
      {
        id: "1",
        fullName: "John Doe",
        company: "Company A",
        phoneNumber: "1234567890",
        email: "john@example.com",
        country: "USA",
        status: true,
      },
    ] as UserResponse[],
    listPage: [[]],
    pagination: 1,
    paginationList: [
      {
        id: "1",
        username: "john_doe",
        fullName: "John Doe",
        password: "password",
        company: "Company A",
        phoneNumber: "1234567890",
        email: "john@example.com",
        country: "USA",
        status: true,
      },
    ] as UserResponse[],
    refetchList: mockRefetchList,
    onChangePagination: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render snapshot correctly", () => {
    expect(render(<ListItemCustomers {...props} />)).toMatchSnapshot();
  });

  it("Should handle click menu correctly", () => {
    const { getByTestId } = render(<ListItemCustomers {...props} />);

    fireEvent.click(getByTestId("button-toggle"));
    fireEvent.click(getByTestId("button-more-menu"));
  });

  it("Should open edit modal when edit option is clicked", () => {
    const { getByText, getByTestId } = render(<ListItemCustomers {...props} />);

    fireEvent.click(getByTestId("button-more-menu"));

    fireEvent.click(getByText("Edit"));
    fireEvent.click(getByText("Delete"));

    expect(getByText("Edit")).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();
  });

  it("Should handle submit update customer", () => {
    const mutationUpdate = jest.fn();
    (api.useUpdateCustomer as jest.Mock).mockReturnValue({
      mutate: mutationUpdate,
    });

    spyPut.mockImplementationOnce((): Promise<unknown> => Promise.resolve());

    const { getByText, getByTestId } = render(<ListItemCustomers {...props} />);

    fireEvent.click(getByTestId("button-more-menu"));
    fireEvent.click(getByText("Edit"));

    const inputFullName = getByTestId("full-name").querySelector(
      "input"
    ) as HTMLInputElement;
    const inputCompany = getByTestId("company-customer").querySelector(
      "input"
    ) as HTMLInputElement;
    const inputPhoneNumber = getByTestId("phone-number").querySelector(
      "input"
    ) as HTMLInputElement;
    const inputEmail = getByTestId("email").querySelector(
      "input"
    ) as HTMLInputElement;
    const inputCountry = getByTestId("country-customer").querySelector(
      "input"
    ) as HTMLInputElement;

    expect(inputFullName).toHaveProperty("value");
    expect(inputCompany).toHaveProperty("value");
    expect(inputPhoneNumber).toHaveProperty("value");
    expect(inputEmail).toHaveProperty("value");
    expect(inputCountry).toHaveProperty("value");

    fireEvent.change(inputFullName, {
      target: { value: "hung" },
    });
    fireEvent.change(inputCompany, {
      target: { value: "Ki On" },
    });
    fireEvent.change(inputPhoneNumber, {
      target: { value: "0123999777" },
    });
    fireEvent.change(inputEmail, {
      target: { value: "hungki@gmail.com" },
    });
    fireEvent.change(inputCountry, {
      target: { value: "Mexico" },
    });

    fireEvent.click(getByTestId("button-update"));

    expect(getByText("Update")).toBeInTheDocument();
  });

  it("Should handle submit delete customer", () => {
    const mutationDelete = jest.fn();
    (api.useDeleteCustomer as jest.Mock).mockReturnValue({
      mutate: mutationDelete,
    });
    const { getByText, getByTestId } = render(<ListItemCustomers {...props} />);

    fireEvent.click(getByTestId("button-more-menu"));
    fireEvent.click(getByText("Delete"));
    fireEvent.click(getByText("Yes"));

    expect(getByText("Yes")).toBeInTheDocument();
  });
});
