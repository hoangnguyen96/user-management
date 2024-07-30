import { wrapper } from "@app/ui/test-utils";
import { act, renderHook, waitFor } from "@testing-library/react";

// Constants
import { ERROR_MESSAGES, USER_ROLE } from "@app/constants";

// Api
import { useAuthLogin, useAuthLogout } from "../auth";

// Models
import { ApiResponse } from "@app/models";

// Utils
import * as utils from "../../utils";

// Services
import { HttpClient } from "@app/services";

const user = {
  id: "1",
  fullName: "Jane Cooper",
  role: USER_ROLE.ADMIN,
  company: "Microsoft",
  phoneNumber: "(225) 555-0118",
  email: "jane@microsoft.com",
  country: "United States",
  status: true,
  username: "admin",
  password: "123456",
};

// Mock the entire utils module
jest.mock("../../utils", () => ({
  findUser: jest.fn(),
}));

const spyPost = jest.spyOn(HttpClient, "post");

// Mock fetch
global.fetch = jest.fn();

describe("Auth", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should return user data on successful login ", () => {
    // Mock fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [user],
    });

    jest.spyOn(utils, "findUser").mockReturnValue(user);

    // Mock API return
    spyPost.mockImplementationOnce((): Promise<unknown> => Promise.resolve());

    const { result } = renderHook(() => useAuthLogin(), {
      wrapper,
    });

    // Call API
    act(() => {
      result.current.mutate({ username: "admin", password: "123456" });
    });

    waitFor(async () => {
      const { isError, isSuccess, data } = result.current;

      expect(isSuccess).toBe(true);
      expect(isError).toBe(false);
      expect(data).toEqual(user);
    });
  });

  it("Should return an error message on failed", async () => {
    // Mock API return
    spyPost.mockRejectedValue(
      (): Promise<unknown> => Promise.reject(ERROR_MESSAGES.GET_ERROR)
    );

    const { result } = renderHook(() => useAuthLogin(), {
      wrapper,
    });

    // Call API
    act(() => {
      result.current.mutate({ username: "ad", password: "55" });
    });

    await waitFor(() => {
      const { isError, isSuccess, errorMessage } = result.current;

      expect(isSuccess).toBe(false);
      expect(isError).toBe(true);
      expect(errorMessage).toBe(ERROR_MESSAGES.GET_ERROR);
    });
  });

  it("Should call the callback and return success message", async () => {
    const callback = jest.fn();

    const { result } = renderHook(() => useAuthLogout(callback), { wrapper });

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(callback).toHaveBeenCalled();
      expect(result.current.data).toEqual({
        message: "Logged out successfully",
      } as ApiResponse);
    });
  });

  it("Should return an error message on failure", async () => {
    const callback = jest.fn(() => {
      throw new Error("Logout failed");
    });

    const { result } = renderHook(() => useAuthLogout(callback), { wrapper });

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(callback).toHaveBeenCalled();
      expect(result.current.data).toBeUndefined();
      expect(result.current.errorMessage).toEqual("Logout failed");
    });
  });
});
