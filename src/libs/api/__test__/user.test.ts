import { wrapper } from "@app/ui/test-utils";
import { act, renderHook, waitFor } from "@testing-library/react";

// Constants
import { USER_ROLE } from "@app/constants";

// Api
import {
  useCreateCustomer,
  useDeleteCustomer,
  useGetCustomerById,
  useGetListCustomers,
  useUpdateCustomer,
} from "../user";

// Services
import { HttpClient } from "@app/services";

//

const user = {
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

const spyGet = jest.spyOn(HttpClient, "get");
const spyPost = jest.spyOn(HttpClient, "post");
const spyPut = jest.spyOn(HttpClient, "put");
const spyDelete = jest.spyOn(HttpClient, "delete");

describe("User", () => {
  it("Should handle useGetListCustomers fetch customers list successfully", () => {
    const customers = [user];

    // Mock API return
    spyGet.mockImplementationOnce(
      (): Promise<unknown> => Promise.resolve(customers)
    );

    const { result } = renderHook(() => useGetListCustomers(), {
      wrapper,
    });

    waitFor(async () => {
      const { isError, isSuccess, data } = result.current;

      expect(isSuccess).toBe(true);
      expect(isError).toBe(false);
      expect(data).toEqual(customers);
    });
  });

  it("Should return error Customers when calling API failed", () => {
    const errorTest = { message: "Calling API failed" };

    // Mock API return
    spyGet.mockImplementationOnce(
      (): Promise<unknown> => Promise.reject(errorTest)
    );

    const { result } = renderHook(() => useGetListCustomers(), {
      wrapper,
    });

    waitFor(async () => {
      const { isError, isSuccess, errorMessage } = result.current;

      expect(isSuccess).toBe(true);
      expect(isError).toBe(false);
      expect(errorMessage).toEqual(errorTest.message);
    });
  });

  it("Should handle useGetCustomerById fetch customer by ID successfully", () => {
    const customers = [user];
    const userId = "1";

    // Mock API return
    spyGet.mockImplementationOnce(
      (): Promise<unknown> => Promise.resolve(customers)
    );

    const { result } = renderHook(() => useGetCustomerById(userId), {
      wrapper,
    });

    waitFor(async () => {
      const { isError, isSuccess, data } = result.current;

      expect(isSuccess).toBe(true);
      expect(isError).toBe(false);
      expect(data).toEqual(customers);
    });
  });

  it("Should return error useGetCustomerById when calling API failed", () => {
    const errorTest = { message: "Calling API failed" };
    const userId = "1";

    // Mock API return
    spyGet.mockImplementationOnce(
      (): Promise<unknown> => Promise.reject(errorTest)
    );

    const { result } = renderHook(() => useGetCustomerById(userId), {
      wrapper,
    });

    waitFor(async () => {
      const { isError, isSuccess, errorMessage } = result.current;

      expect(isSuccess).toBe(true);
      expect(isError).toBe(false);
      expect(errorMessage).toEqual(errorTest.message);
    });
  });

  it("Should handle useCreateCustomer create a new customer successfully", async () => {
    const newCustomer = {
      id: "2",
      fullName: "Jane Cooper",
      role: USER_ROLE.CONSUMER,
      company: "Microsoft",
      phoneNumber: "(225) 555-0118",
      email: "jane@microsoft.com",
      country: "United States",
      status: true,
      username: "consumer2",
      password: "123456",
    };

    // Mock API return
    spyPost.mockImplementationOnce((): Promise<unknown> => Promise.resolve());

    const { result } = renderHook(() => useCreateCustomer(), { wrapper });

    act(() => {
      result.current.mutate(newCustomer);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });

  it("Should return error useCreateCustomer when calling API failed", () => {
    const errorTest = { message: "Calling API failed" };

    // Mock API return
    spyPost.mockImplementationOnce(
      (): Promise<unknown> => Promise.reject(errorTest)
    );

    const { result } = renderHook(() => useCreateCustomer(), {
      wrapper,
    });

    waitFor(async () => {
      const { isError, isSuccess, errorMessage } = result.current;

      expect(isSuccess).toBe(true);
      expect(isError).toBe(false);
      expect(errorMessage).toEqual(errorTest.message);
    });
  });

  it("Should handle useUpdateCustomer update a customer successfully", async () => {
    const updatedCustomer = { id: "2", username: "kim" };

    // Mock API return
    spyPut.mockImplementationOnce((): Promise<unknown> => Promise.resolve());

    const { result } = renderHook(() => useUpdateCustomer(), { wrapper });

    act(() => {
      result.current.mutate({ id: "2", payload: updatedCustomer });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });

  it("Should return error useUpdateCustomer when calling API failed", () => {
    const errorTest = { message: "Calling API failed" };

    // Mock API return
    spyPut.mockImplementationOnce(
      (): Promise<unknown> => Promise.reject(errorTest)
    );

    const { result } = renderHook(() => useUpdateCustomer(), {
      wrapper,
    });

    waitFor(async () => {
      const { isError, isSuccess, errorMessage } = result.current;

      expect(isSuccess).toBe(true);
      expect(isError).toBe(false);
      expect(errorMessage).toEqual(errorTest.message);
    });
  });

  it("Should handle useDeleteCustomer delete a customer successfully", async () => {
    // Mock API return
    spyDelete.mockImplementationOnce((): Promise<unknown> => Promise.resolve());

    const { result } = renderHook(() => useDeleteCustomer(), { wrapper });

    act(() => {
      result.current.mutate({ id: "2" });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  });

  it("Should return error useDeleteCustomer when calling API failed", () => {
    const errorTest = { message: "Calling API failed" };

    // Mock API return
    spyDelete.mockImplementationOnce(
      (): Promise<unknown> => Promise.reject(errorTest)
    );

    const { result } = renderHook(() => useDeleteCustomer(), {
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
