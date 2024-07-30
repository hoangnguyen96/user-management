import { act, renderHook } from "@testing-library/react";
import { useAuthStore } from "..";

// Mock localStorage
jest.mock("@app/constants", () => ({
  LOCAL_STORAGE: {
    AUTH: "auth-store",
  },
}));

describe("useAuthStore", () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("Should initialize with default values", () => {
    const { result } = renderHook(() => useAuthStore());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.user).toEqual({
      id: "",
      fullName: "",
      company: "",
      token: "",
    });
  });

  it("Should set isAuthenticated", () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setAuthenticated(true);
    });

    expect(result.current.isAuthenticated).toBe(true);
  });

  it("Should set isAdmin", () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setIsAdmin(true);
    });

    expect(result.current.isAdmin).toBe(true);
  });

  it("Should set user", () => {
    const { result } = renderHook(() => useAuthStore());
    const user = {
      id: "1",
      token: "abcd",
      fullName: "Test User",
      company: "Test Company",
    };

    act(() => {
      result.current.setUser(user);
    });

    expect(result.current.user).toEqual(user);
  });

  it("Should clear auth", () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setAuthenticated(true);
      result.current.setIsAdmin(true);
      result.current.setUser({
        id: "1",
        token: "abcd",
        fullName: "Test User",
        company: "Test Company",
      });
      result.current.clearAuth();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.user).toEqual({
      id: "",
      token: "",
      fullName: "",
      company: "",
    });
  });
});
