import { renderWithQueryClient } from "@app/ui/test-utils";
import { fireEvent, waitFor } from "@testing-library/react";

// Api
import * as api from "@app/api";

// Models
import { Product } from "@app/models";

// Services
import { HttpClient } from "@app/services";

// Utils
import * as utils from "@app/utils";

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

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"),
  isEnableSubmitButton: jest.fn(),
}));

const props = {
  isLoading: false,
  isPending: false,
  isAdmin: true,
  error: "",
  listCurrent: mockProductList,
  listPage: [[]],
  pagination: 1,
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

  it("Should handle opening and closing Update Modal", async () => {
    const { getByText, getByTestId, queryByText } = renderWithQueryClient(
      <ListItemProduct {...props} />
    );

    // Click open menu
    fireEvent.click(getByTestId("button-more-menu"));
    fireEvent.click(getByText("Edit"));

    await waitFor(() => {
      expect(getByText(/Update Product/i)).toBeInTheDocument();
    });

    // Close modal
    fireEvent.click(getByTestId("close-modal-button"));

    await waitFor(() => {
      expect(queryByText(/Update Product/i)).not.toBeInTheDocument();
    });
  });

  it("Should handle opening and closing Delete Modal", async () => {
    const { getByText, getByTestId, queryByText } = renderWithQueryClient(
      <ListItemProduct {...props} />
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

  it("Should handle submit update product successful", () => {
    jest.spyOn(utils, "isEnableSubmitButton").mockReturnValue(true);
    const mutationUpdate = jest.fn().mockImplementation((_, { onSuccess }) => {
      onSuccess({
        id: "1",
        userId: "1",
        payload: {
          name: "Test Product",
          price: 10,
          quantity: 10,
        },
      });
    });
    (api.useUpdateProduct as jest.Mock).mockReturnValue({
      isisPending: false,
      mutate: mutationUpdate,
    });

    spyPut.mockImplementationOnce((): Promise<unknown> => Promise.resolve());

    const { getByText, getByTestId } = renderWithQueryClient(
      <ListItemProduct {...props} />
    );

    fireEvent.click(getByTestId("button-more-menu"));
    fireEvent.click(getByText("Edit"));

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

    fireEvent.click(getByTestId("button-product"));

    expect(getByText("Update")).toBeInTheDocument();
  });

  it("Should handle submit update product failed", () => {
    jest.spyOn(utils, "isEnableSubmitButton").mockReturnValue(true);
    const mockUpdateFailed = jest.fn().mockImplementation((_, { onError }) => {
      onError();
    });
    (api.useUpdateProduct as jest.Mock).mockReturnValue({
      isisPending: false,
      mutate: mockUpdateFailed,
    });

    spyPut.mockImplementationOnce((): Promise<unknown> => Promise.reject());

    const { getByText, getByTestId } = renderWithQueryClient(
      <ListItemProduct {...props} />
    );

    fireEvent.click(getByTestId("button-more-menu"));
    fireEvent.click(getByText("Edit"));

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

    fireEvent.click(getByTestId("button-product"));

    expect(getByText("Update")).toBeInTheDocument();
  });

  it("Should handle submit delete Product successful", () => {
    const mockMutationDeleteSuccess = jest
      .fn()
      .mockImplementation((_, { onSuccess }) => {
        onSuccess({
          id: "1",
          userId: "1",
        });
      });
    (api.useDeleteProduct as jest.Mock).mockReturnValue({
      isPending: false,
      mutate: mockMutationDeleteSuccess,
    });
    const { getByText, getByTestId } = renderWithQueryClient(
      <ListItemProduct {...props} />
    );

    fireEvent.click(getByTestId("button-more-menu"));
    fireEvent.click(getByText("Delete"));
    fireEvent.click(getByText("Yes"));

    expect(getByText("Yes")).toBeInTheDocument();
  });

  it("Should handle submit delete Product failed", () => {
    const mockMutationDeleteFailed = jest
      .fn()
      .mockImplementation((_, { onError }) => {
        onError();
      });
    (api.useDeleteProduct as jest.Mock).mockReturnValue({
      isPending: false,
      mutate: mockMutationDeleteFailed,
    });
    const { getByText, getByTestId } = renderWithQueryClient(
      <ListItemProduct {...props} />
    );

    fireEvent.click(getByTestId("button-more-menu"));
    fireEvent.click(getByText("Delete"));
    fireEvent.click(getByText("Yes"));

    expect(getByText("Yes")).toBeInTheDocument();
  });
});
