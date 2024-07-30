import { act, renderHook } from "@testing-library/react";
import { useQueryClient } from "@tanstack/react-query";

// Api
import { useAuthLogout } from "@app/api";

// Stores
import { useAuthStore } from "@app/stores";

// Hooks
import { useAuth } from "../useAuth";

// Mock necessary parts
jest.mock("@tanstack/react-query", () => ({
  useQueryClient: jest.fn(),
}));

jest.mock("@app/stores", () => ({
  useAuthStore: jest.fn(),
}));

jest.mock("@app/api", () => ({
  useAuthLogout: jest.fn(),
}));

describe("useAuth", () => {
  const queryClient = {
    clear: jest.fn(),
  };

  const clearAuth = jest.fn();
  const mutate = jest.fn();

  beforeEach(() => {
    (useQueryClient as jest.Mock).mockReturnValue(queryClient);
    (useAuthStore as unknown as jest.Mock).mockReturnValue(clearAuth);
    (useAuthLogout as jest.Mock).mockReturnValue({ mutate });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should log out and clear query client", () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.handleLogout();
    });

    expect(queryClient.clear).toHaveBeenCalled();
  });
});
