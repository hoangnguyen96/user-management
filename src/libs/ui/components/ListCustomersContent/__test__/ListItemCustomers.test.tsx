import { render } from "@app/ui/test-utils";
import { fireEvent, waitFor } from "@testing-library/react";

// Api
import * as api from "@app/api";

// Models
import { UserResponse } from "@app/models";

// Services
import { HttpClient } from "@app/services";

// Component
import ListItemCustomers from "../ListItemCustomers";

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

  it("Should handle opening and closing Update Modal", async () => {
    const { getByText, queryByText, getByTestId } = render(
      <ListItemCustomers {...props} />
    );

    // Click open menu
    fireEvent.click(getByTestId("button-more-menu"));
    fireEvent.click(getByText("Edit"));

    await waitFor(() => {
      expect(getByText(/Update Customer/i)).toBeInTheDocument();
    });

    // Close modal
    fireEvent.click(getByTestId("close-modal-button"));

    await waitFor(() => {
      expect(queryByText(/Update Customer/i)).not.toBeInTheDocument();
    });
  });

  it("Should handle opening and closing Delete Modal", async () => {
    const { getByText, queryByText, getByTestId } = render(
      <ListItemCustomers {...props} />
    );

    // Click open menu
    fireEvent.click(getByTestId("button-more-menu"));
    fireEvent.click(getByText("Delete"));

    await waitFor(() => {
      expect(
        getByText("Are you sure you want to delete it?")
      ).toBeInTheDocument();
    });

    // Close modal
    fireEvent.click(getByTestId("close-modal-button"));

    await waitFor(() => {
      expect(
        queryByText("Are you sure you want to delete it?")
      ).not.toBeInTheDocument();
    });
  });

  it("Should handle opening and closing Active Modal", async () => {
    const { getByText, queryByText, getByTestId } = render(
      <ListItemCustomers {...props} />
    );

    // Click toggle button
    fireEvent.click(getByTestId("button-toggle"));

    await waitFor(() => {
      expect(
        getByText("You have inactive successfully, please wait a moment!")
      ).toBeInTheDocument();
    });

    // Close modal
    fireEvent.click(getByTestId("close-modal-button"));

    await waitFor(() => {
      expect(
        queryByText("You have inactive successfully, please wait a moment!")
      ).not.toBeInTheDocument();
    });
  });

  it("Should handle submit update customer successful", () => {
    const mockUpdateSuccess = jest
      .fn()
      .mockImplementation((_, { onSuccess }) => {
        onSuccess({
          fullName: "Test User",
          company: "Test Company",
          phoneNumber: "1243567890",
          email: "test@gmail.com",
          country: "Test country",
        });
      });
    (api.useUpdateCustomer as jest.Mock).mockReturnValue({
      isisPending: false,
      mutate: mockUpdateSuccess,
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

  it("Should handle submit update customer failed", async () => {
    const mockUpdateFailed = jest.fn().mockImplementation((_, { onError }) => {
      onError();
    });
    (api.useUpdateCustomer as jest.Mock).mockReturnValue({
      isPending: false,
      mutate: mockUpdateFailed,
    });
    spyPut.mockImplementationOnce((): Promise<unknown> => Promise.reject());

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

  it("Should handle submit delete customer successful", () => {
    const mockMutationDeleteSuccess = jest
      .fn()
      .mockImplementation((_, { onSuccess }) => {
        onSuccess({
          id: "1",
        });
      });
    (api.useDeleteCustomer as jest.Mock).mockReturnValue({
      isPending: false,
      mutate: mockMutationDeleteSuccess,
    });
    const { getByText, getByTestId } = render(<ListItemCustomers {...props} />);

    fireEvent.click(getByTestId("button-more-menu"));
    fireEvent.click(getByText("Delete"));
    fireEvent.click(getByText("Yes"));

    expect(getByText("Yes")).toBeInTheDocument();
  });

  it("Should handle submit delete customer failed", () => {
    const mockMutationDeleteFailed = jest
      .fn()
      .mockImplementation((_, { onError }) => {
        onError();
      });
    (api.useDeleteCustomer as jest.Mock).mockReturnValue({
      isPending: false,
      mutate: mockMutationDeleteFailed,
    });
    const { getByText, getByTestId } = render(<ListItemCustomers {...props} />);

    fireEvent.click(getByTestId("button-more-menu"));
    fireEvent.click(getByText("Delete"));
    fireEvent.click(getByText("Yes"));

    expect(getByText("Yes")).toBeInTheDocument();
  });

  it("Should handle change Active customer successful", () => {
    const mockUpdateSuccess = jest
      .fn()
      .mockImplementation((_, { onSuccess }) => {
        onSuccess({
          id: "1",
          status: false,
        });
      });

    (api.useUpdateCustomer as jest.Mock).mockReturnValue({
      isisPending: false,
      mutate: mockUpdateSuccess,
    });

    const { getByText, getByTestId } = render(<ListItemCustomers {...props} />);

    fireEvent.click(getByTestId("button-toggle"));

    expect(
      getByText("You have inactive successfully, please wait a moment!")
    ).toBeInTheDocument();
  });

  it("Should handle change Active customer failed", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    const mockUpdateFailed = jest.fn().mockImplementation((_, { onError }) => {
      onError();
    });

    (api.useUpdateCustomer as jest.Mock).mockReturnValue({
      isisPending: false,
      mutate: mockUpdateFailed,
    });

    const { getByTestId } = render(<ListItemCustomers {...props} />);

    fireEvent.click(getByTestId("button-toggle"));

    expect(window.alert).toHaveBeenCalledWith("Active failed");
  });
});
