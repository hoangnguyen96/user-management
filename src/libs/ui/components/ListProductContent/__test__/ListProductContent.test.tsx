import { WrapperRouter, renderWithQueryClient } from "@app/ui/test-utils";
import { fireEvent, waitFor } from "@testing-library/react";
import { useMatch } from "react-router-dom";

// Api
import * as api from "@app/api";

// Utils
import * as utils from "@app/utils";

// Services
import { HttpClient } from "@app/services";

// Component
import ListProductContent from "..";
import {
  LIST_CONTENT_PRODUCT,
  LIST_CONTENT_PRODUCT_PAGE1,
  LIST_CONTENT_PRODUCT_PAGE2,
} from "../__mocks__/mock-data";

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

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"),
  isEnableSubmitButton: jest.fn(),
  dividePaginationProduct: jest.fn(() => [
    LIST_CONTENT_PRODUCT_PAGE1,
    LIST_CONTENT_PRODUCT_PAGE2,
  ]),
}));

jest.mock("@app/api", () => ({
  useGetListProduct: jest.fn(() => ({
    isLoading: false,
    refetch: jest.fn(),
    data: LIST_CONTENT_PRODUCT,
    errorMessage: "",
  })),
  useGetListProductOfUser: jest.fn(() => ({
    isLoading: false,
    data: productListData,
    refetch: jest.fn(),
    errorMessage: "",
  })),
  useGetListCustomers: jest.fn(() => ({
    data: mockCustomer,
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

const spyPost = jest.spyOn(HttpClient, "post");

describe("ListProductContent component", () => {
  const mockUseMatch = useMatch as jest.MockedFunction<typeof useMatch>;

  afterEach(() => {
    jest.clearAllMocks();
  });

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

  it("Should handle change pagination correctly", () => {
    const { getByRole } = renderWithQueryClient(
      <WrapperRouter>
        <ListProductContent isAdmin={true} id="1" />
      </WrapperRouter>
    );
    const paginationButton = getByRole("button", { name: "Go to page 2" });
    fireEvent.click(paginationButton);

    expect(paginationButton).toBeInTheDocument();
  });

  it("Should handle close modal add product", async () => {
    mockUseMatch.mockReturnValue({
      params: {},
      pathname: "/product",
      pathnameBase: "/product",
      pattern: { path: "/product" },
    });
    const { getByTestId, getByText } = renderWithQueryClient(
      <WrapperRouter>
        <ListProductContent isAdmin={false} id="1" />
      </WrapperRouter>
    );

    fireEvent.click(getByTestId("modal-add-product"));

    await waitFor(() => {
      expect(getByText(/ADD PRODUCT/i)).toBeInTheDocument();
    });

    // Close modal
    fireEvent.click(getByTestId("close-modal-button"));
  });

  it("Should handle sorted for selection list", async () => {
    const { getByRole } = renderWithQueryClient(
      <WrapperRouter>
        <ListProductContent isAdmin={false} id="1" />
      </WrapperRouter>
    );

    const combobox = getByRole("combobox", {
      name: /short by:/i,
    });
    fireEvent.mouseDown(combobox);

    const newOption = getByRole("option", {
      name: /price/i,
    });
    fireEvent.click(newOption);

    expect(newOption).toBeInTheDocument();
  });

  it("Should handle create product successful", async () => {
    jest.spyOn(utils, "isEnableSubmitButton").mockReturnValue(true);
    const mockCreateProductSuccess = jest
      .fn()
      .mockImplementation((_, { onSuccess }) => {
        onSuccess({
          code: "POD013",
          name: "Test Name",
          quantity: 12,
          image: "https://i.ibb.co/vkbZPGr/img10.jpg",
          price: 3,
          userId: "6",
        });
      });
    (api.useCreateProduct as jest.Mock).mockReturnValue({
      isisPending: false,
      mutate: mockCreateProductSuccess,
    });
    spyPost.mockImplementationOnce((): Promise<unknown> => Promise.resolve());
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

    fireEvent.click(getByTestId("modal-add-product"));

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

    // Ensure the select element is rendered
    await waitFor(() => {
      expect(getByTestId("select-user")).toBeInTheDocument();
    });

    // Use getByTestId directly to get the select element
    const selectName = getByRole("combobox", {
      name: /without label/i,
    });

    expect(selectName).not.toBeNull();

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

    // Open the dropdown
    fireEvent.mouseDown(selectName);
    const newOption = getByRole("option", {
      name: /floyd miles/i,
    });
    fireEvent.click(newOption);

    // Submit the form
    fireEvent.click(getByTestId("button-product"));

    await waitFor(() => {
      expect(getByText(/ADD PRODUCT/i)).toBeInTheDocument();
    });
  });
});
