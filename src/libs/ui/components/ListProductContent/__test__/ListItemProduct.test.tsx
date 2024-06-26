import { renderWithQueryClient } from "@app/ui/test-utils";
import { fireEvent } from "@testing-library/react";

// Api
import * as api from "@app/api";

// Models
import { Product } from "@app/models";

// Services
import { HttpClient } from "@app/services";

// Components
import ListItemProduct from "../ListItemProduct";

// Mock data
const mockProduct: Product = {
  id: "1",
  userId: "1",
  code: "P001",
  name: "Product 1",
  price: 100,
  quantity: 10,
  image: "https://via.placeholder.com/150",
  status: true,
};

const mockProductList = [mockProduct];

jest.mock("@app/api", () => ({
  useDeleteProduct: jest.fn(() => ({
    isPending: false,
    mutate: jest.fn(),
  })),
  useUpdateProduct: jest.fn(() => ({
    isPending: false,
    mutate: jest.fn(),
  })),
  useGetProductById: jest.fn(() => ({
    data: mockProduct,
    refetch: jest.fn(),
  })),
}));

const props = {
  isLoading: false,
  isPending: false,
  isAdmin: true,
  error: "",
  listCurrent: mockProductList,
  listPage: [mockProductList],
  pagination: 0,
  paginationList: mockProductList,
  refetchList: jest.fn(),
  onChangePagination: jest.fn(),
};

const spyPut = jest.spyOn(HttpClient, "put");

describe("ListItemProduct component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(<ListItemProduct {...props} />)
    ).toMatchSnapshot();
  });

  it("Should open edit modal when edit option is clicked", () => {
    const { getByText, getByTestId } = renderWithQueryClient(
      <ListItemProduct {...props} />
    );

    fireEvent.click(getByTestId("button-more-menu"));

    fireEvent.click(getByText("Edit"));
    fireEvent.click(getByText("Delete"));

    expect(getByText("Edit")).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();
  });

  it("Should handle submit update product", () => {
    const mutationUpdate = jest.fn();
    (api.useUpdateProduct as jest.Mock).mockReturnValue({
      mutate: mutationUpdate,
    });

    spyPut.mockImplementationOnce((): Promise<unknown> => Promise.resolve());

    const { getByText, getByTestId } = renderWithQueryClient(
      <ListItemProduct {...props} />
    );

    fireEvent.click(getByTestId("button-more-menu"));
    fireEvent.click(getByText("Edit"));

    const inputName = getByTestId("name-product").querySelector(
      "input"
    ) as HTMLInputElement;
    const inputPrice = getByTestId("price-product").querySelector(
      "input"
    ) as HTMLInputElement;
    const inputQuantity = getByTestId("quantity-product").querySelector(
      "input"
    ) as HTMLInputElement;

    expect(inputName).toHaveProperty("value");
    expect(inputPrice).toHaveProperty("value");
    expect(inputQuantity).toHaveProperty("value");

    fireEvent.change(inputName, {
      target: { value: "Coffee" },
    });
    fireEvent.change(inputPrice, {
      target: { value: 20 },
    });
    fireEvent.change(inputQuantity, {
      target: { value: 2 },
    });

    fireEvent.click(getByTestId("button-product"));
  });
});
