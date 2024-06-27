import { WrapperRouter, renderWithQueryClient } from "@app/ui/test-utils";

// Component
import Product from "..";

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

jest.mock("@app/api", () => ({
  useGetListProduct: jest.fn(() => ({
    isLoading: false,
    refetch: jest.fn(),
    data: productListData,
    errorMessage: "error",
  })),
  useGetListProductOfUser: jest.fn(() => ({
    isLoading: false,
    data: productListData,
    refetch: jest.fn(),
    errorMessage: "errorOfUser",
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

describe("Product component", () => {
  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(
        <WrapperRouter>
          <Product />
        </WrapperRouter>
      )
    ).toMatchSnapshot();
  });
});
