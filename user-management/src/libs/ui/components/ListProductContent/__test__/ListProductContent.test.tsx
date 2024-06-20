import { WrapperRouter, renderWithQueryClient } from "@app/ui/test-utils";
import { fireEvent, waitFor } from "@testing-library/react";
import { useMatch } from "react-router-dom";

// Component
import ListProductContent from "..";

const mockCustomer = [
  {
    fullName: "Jane Cooper",
    role: "admin",
    company: "Microsoft",
    phoneNumber: "2255550118",
    email: "jane@microsoft.com",
    country: "United States",
    status: false,
    username: "admin",
    password: "123456",
    id: "1",
  },
  {
    fullName: "Floyd Miles",
    role: "consumer",
    company: "Yahoo",
    phoneNumber: "2055550100",
    email: "floyd@yahoo.com",
    country: "Kiribati",
    status: true,
    username: "consumer1",
    password: "123456",
    id: "2",
  },
];

const productListData = [
  {
    name: "Hamburger",
    price: 32,
    quantity: 69,
    status: false,
    image: "/src/libs/ui/images/img2.jpg",
    code: "POD2",
    id: "2",
    userId: "2",
  },
];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useMatch: jest.fn(),
}));

jest.mock("@app/api", () => ({
  useGetListProduct: jest.fn(() => ({
    isLoading: false,
    refetch: jest.fn(),
    data: productListData,
    errorMessage: "error",
  })),
  useGetListCustomers: jest.fn(() => ({
    data: [mockCustomer],
  })),
  useCreateProduct: jest.fn(() => ({
    isPending: false,
    mutate: jest.fn(),
  })),
  useGetProductById: jest.fn(() => ({
    refetch: jest.fn(),
    data: {},
    errorMessage: null,
  })),
  useUpdateProduct: jest.fn(() => ({
    isPending: false,
    mutate: jest.fn(),
  })),
  useDeleteProduct: jest.fn(() => ({
    isPending: false,
    mutate: jest.fn(),
  })),
}));

describe("ListProductContent component", () => {
  const mockUseMatch = useMatch as jest.MockedFunction<typeof useMatch>;

  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(
        <WrapperRouter>
          <ListProductContent isAdmin={true} id="1" />
        </WrapperRouter>
      )
    ).toMatchSnapshot();
  });

  it("Should handle text input change correctly", async () => {
    const { getByPlaceholderText } = renderWithQueryClient(
      <WrapperRouter>
        <ListProductContent isAdmin={true} id="1" />
      </WrapperRouter>
    );

    const input = getByPlaceholderText("Search…") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "John" } });

    await waitFor(() => {
      expect(input.value).toBe("John");
    });
  });

  it("Should handle create product", async () => {
    mockUseMatch.mockReturnValue({
      params: {},
      pathname: "/product",
      pathnameBase: "/product",
      pattern: { path: "/product" },
    });
    const { getByTestId, getByText, getByRole } = renderWithQueryClient(
      <WrapperRouter>
        <ListProductContent isAdmin={true} id="1" />
      </WrapperRouter>
    );

    fireEvent.click(getByTestId("add-product"));

    await waitFor(() => {
      expect(getByText(/ADD PRODUCT/i)).toBeInTheDocument();
    });

    const inputNameProduct = getByTestId("name-product").querySelector(
      "input"
    ) as HTMLInputElement;
    const inputPriceProduct = getByTestId("price-product").querySelector(
      "input"
    ) as HTMLInputElement;
    const inputQuantityProduct = getByTestId("quantity-product").querySelector(
      "input"
    ) as HTMLInputElement;

    expect(inputNameProduct).toHaveProperty("value");
    expect(inputPriceProduct).toHaveProperty("value");
    expect(inputQuantityProduct).toHaveProperty("value");

    fireEvent.change(inputNameProduct, {
      target: { value: "Banana" },
    });
    fireEvent.change(inputPriceProduct, {
      target: { value: 1 },
    });
    fireEvent.change(inputQuantityProduct, {
      target: { value: 2 },
    });

    fireEvent.mouseDown(getByRole("combobox"));
    await waitFor(() => getByRole("listbox"));

    fireEvent.click(getByTestId("button-product"));
  });
});
