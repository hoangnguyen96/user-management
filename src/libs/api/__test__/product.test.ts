import { wrapper } from "@app/ui/test-utils";
import { act, renderHook, waitFor } from "@testing-library/react";

// Api
import {
  useCreateProduct,
  useDeleteProduct,
  useGetListProduct,
  useGetListProductOfUser,
  useGetProductById,
  useUpdateProduct,
} from "../product";

// Models
import { Product } from "@app/models";

// Services
import { HttpClient } from "@app/services";

// Mock data
import { LIST_CONTENT_PRODUCT } from "@app/ui/components/ListProductContent/__mocks__/mock-data";

const spyGet = jest.spyOn(HttpClient, "get");
const spyPost = jest.spyOn(HttpClient, "post");
const spyPut = jest.spyOn(HttpClient, "put");
const spyDelete = jest.spyOn(HttpClient, "delete");

describe("Product", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should handle useGetListProduct fetch products list successfully", async () => {
    const products: Product[] = LIST_CONTENT_PRODUCT;

    // Mock API return
    spyGet.mockImplementationOnce(
      (): Promise<unknown> => Promise.resolve(products)
    );

    const { result } = renderHook(() => useGetListProduct(), { wrapper });

    await waitFor(() => {
      const { isError, isSuccess, data } = result.current;

      expect(isSuccess).toBe(true);
      expect(isError).toBe(false);
      expect(data).toEqual(products);
    });
  });

  it("Should return error useGetListProduct when calling API failed", () => {
    const errorTest = { message: "Calling API failed" };

    // Mock API return
    spyGet.mockImplementationOnce(
      (): Promise<unknown> => Promise.reject(errorTest)
    );

    const { result } = renderHook(() => useGetListProduct(), {
      wrapper,
    });

    waitFor(async () => {
      const { isError, isSuccess, errorMessage } = result.current;

      expect(isSuccess).toBe(true);
      expect(isError).toBe(false);
      expect(errorMessage).toEqual(errorTest.message);
    });
  });

  it("Should handle useGetListProductOfUser fetch products list successfully", async () => {
    const products: Product[] = LIST_CONTENT_PRODUCT;
    const userID = "2";

    // Mock API return
    spyGet.mockImplementationOnce(
      (): Promise<unknown> => Promise.resolve(products)
    );

    const { result } = renderHook(() => useGetListProductOfUser(userID), {
      wrapper,
    });

    await waitFor(() => {
      const { isError, isSuccess, data } = result.current;

      expect(isSuccess).toBe(true);
      expect(isError).toBe(false);
      expect(data).toEqual(products);
    });
  });

  it("Should return error useGetListProductOfUser when calling API failed", () => {
    const errorTest = { message: "Calling API failed" };
    const userId = "2";

    // Mock API return
    spyGet.mockImplementationOnce(
      (): Promise<unknown> => Promise.reject(errorTest)
    );

    const { result } = renderHook(() => useGetListProductOfUser(userId), {
      wrapper,
    });

    waitFor(async () => {
      const { isError, isSuccess, errorMessage } = result.current;

      expect(isSuccess).toBe(true);
      expect(isError).toBe(false);
      expect(errorMessage).toEqual(errorTest.message);
    });
  });

  it("Should handle useGetProductById fetch products list successfully", async () => {
    const products: Product[] = LIST_CONTENT_PRODUCT;
    const userId = "2";
    const productId = "3";

    // Mock API return
    spyGet.mockImplementationOnce(
      (): Promise<unknown> => Promise.resolve(products)
    );

    const { result } = renderHook(() => useGetProductById(userId, productId), {
      wrapper,
    });

    await waitFor(() => {
      const { isError, isSuccess, data } = result.current;

      expect(isSuccess).toBe(true);
      expect(isError).toBe(false);
      expect(data).toEqual(products);
    });
  });

  it("Should return error useGetProductById when calling API failed", () => {
    const errorTest = { message: "Calling API failed" };
    const userId = "2";
    const productId = "3";

    // Mock API return
    spyGet.mockImplementationOnce(
      (): Promise<unknown> => Promise.reject(errorTest)
    );

    const { result } = renderHook(() => useGetProductById(userId, productId), {
      wrapper,
    });

    waitFor(async () => {
      const { isError, isSuccess, errorMessage } = result.current;

      expect(isSuccess).toBe(true);
      expect(isError).toBe(false);
      expect(errorMessage).toEqual(errorTest.message);
    });
  });

  it("Should handle useCreateProduct create a new customer successfully", async () => {
    const newProduct = {
      name: "Banana",
      price: 3,
      quantity: 9,
      status: false,
      image: "images/img2.jpg",
      code: "POD002",
      id: "4",
      userId: "2",
    };

    // Mock API return
    spyPost.mockImplementationOnce((): Promise<unknown> => Promise.resolve());

    const { result } = renderHook(() => useCreateProduct(), { wrapper });

    act(() => {
      result.current.mutate(newProduct);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });

  it("Should return error useCreateProduct when calling API failed", () => {
    const errorTest = { message: "Calling API failed" };

    // Mock API return
    spyPost.mockImplementationOnce(
      (): Promise<unknown> => Promise.reject(errorTest)
    );

    const { result } = renderHook(() => useCreateProduct(), {
      wrapper,
    });

    waitFor(async () => {
      const { isError, isSuccess, errorMessage } = result.current;

      expect(isSuccess).toBe(true);
      expect(isError).toBe(false);
      expect(errorMessage).toEqual(errorTest.message);
    });
  });

  it("Should handle useUpdateProduct update a customer successfully", async () => {
    const updatedProduct = {
      name: "Banana2",
      price: 30,
      quantity: 5,
      status: false,
      image: "images/img2.jpg",
    };

    // Mock API return
    spyPut.mockImplementationOnce((): Promise<unknown> => Promise.resolve());

    const { result } = renderHook(() => useUpdateProduct(), { wrapper });

    act(() => {
      result.current.mutate({ id: "4", userId: "2", payload: updatedProduct });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });

  it("Should return error useUpdateProduct when calling API failed", () => {
    const errorTest = { message: "Calling API failed" };

    // Mock API return
    spyPut.mockImplementationOnce(
      (): Promise<unknown> => Promise.reject(errorTest)
    );

    const { result } = renderHook(() => useUpdateProduct(), {
      wrapper,
    });

    waitFor(async () => {
      const { isError, isSuccess, errorMessage } = result.current;

      expect(isSuccess).toBe(true);
      expect(isError).toBe(false);
      expect(errorMessage).toEqual(errorTest.message);
    });
  });

  it("Should handle useDeleteProduct delete a customer successfully", async () => {
    // Mock API return
    spyDelete.mockImplementationOnce((): Promise<unknown> => Promise.resolve());

    const { result } = renderHook(() => useDeleteProduct(), { wrapper });

    act(() => {
      result.current.mutate({ id: "4" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });

  it("Should return error useDeleteProduct when calling API failed", () => {
    const errorTest = { message: "Calling API failed" };

    // Mock API return
    spyDelete.mockImplementationOnce(
      (): Promise<unknown> => Promise.reject(errorTest)
    );

    const { result } = renderHook(() => useDeleteProduct(), {
      wrapper,
    });

    waitFor(async () => {
      const { isError, isSuccess, errorMessage } = result.current;

      expect(isSuccess).toBe(true);
      expect(isError).toBe(false);
      expect(errorMessage).toEqual(errorTest.message);
    });
  });
});
