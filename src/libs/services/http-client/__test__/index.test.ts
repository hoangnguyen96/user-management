import { HttpClient } from "../";
import { ERROR_MESSAGES } from "@app/constants";

// Mock the fetch API
global.fetch = jest.fn();

describe("HttpService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("get", () => {
    it("should make a GET request and return data", async () => {
      const mockData = { data: "test" };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await HttpClient.get("/test-url");
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/test-url"),
        expect.objectContaining({
          method: "GET",
        })
      );
    });

    it("should throw GET_ERROR on network error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(HttpClient.get("/test-url")).rejects.toThrow(
        ERROR_MESSAGES.GET_ERROR
      );
    });
  });

  describe("post", () => {
    it("should make a POST request and return data", async () => {
      const mockData = { data: "test" };
      const postData = { key: "value" };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await HttpClient.post("/test-url", postData);
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/test-url"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(postData),
        })
      );
    });

    it("should throw POST_ERROR on network error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(
        HttpClient.post("/test-url", { key: "value" })
      ).rejects.toThrow(ERROR_MESSAGES.POST_ERROR);
    });
  });

  describe("put", () => {
    it("should make a PUT request and return data", async () => {
      const mockData = { data: "test" };
      const putData = { key: "value" };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await HttpClient.put("/test-url", putData);
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/test-url"),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify(putData),
        })
      );
    });

    it("should throw UPDATE_ERROR on network error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(
        HttpClient.put("/test-url", { key: "value" })
      ).rejects.toThrow(ERROR_MESSAGES.UPDATE_ERROR);
    });
  });

  describe("delete", () => {
    it("should make a DELETE request and return data", async () => {
      const mockData = { data: "test" };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await HttpClient.delete("/test-url");
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/test-url"),
        expect.objectContaining({
          method: "DELETE",
        })
      );
    });

    it("should throw DELETE_ERROR on network error", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(HttpClient.delete("/test-url")).rejects.toThrow(
        ERROR_MESSAGES.DELETE_ERROR
      );
    });
  });
});
