// Constants
import { USER_ROLE } from "../../constants";

// Utils
import {
  dividePaginationCustomers,
  dividePaginationProduct,
  filterListCustomersByName,
  filterListProductByName,
} from "../filter";

// Mock data
import { mockProducts, mockUsers } from "./__mocks__/mock-data";

describe("Pagination and Filter Functions", () => {
  // Test dividePaginationCustomers
  describe("dividePaginationCustomers", () => {
    it("should divide users into pages of 8", () => {
      const result = dividePaginationCustomers(mockUsers);
      expect(result.length).toBe(Math.ceil(mockUsers.length / 8));
    });
  });

  // Test dividePaginationProduct
  describe("dividePaginationProduct", () => {
    it("should divide products into pages of 8", () => {
      const result = dividePaginationProduct(mockProducts);
      expect(result.length).toBe(Math.ceil(mockProducts.length / 8));
    });
  });

  // Test filterListCustomersByName
  describe("filterListCustomersByName", () => {
    it("should filter users by name", () => {
      const result = filterListCustomersByName(mockUsers, "Jane");
      expect(result).toEqual([
        {
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
        },
      ]);
    });

    it("should return empty array if no user matches", () => {
      const result = filterListCustomersByName(mockUsers, "NotExist");
      expect(result).toEqual([]);
    });
  });

  // Test filterListProductByName
  describe("filterListProductByName", () => {
    it("should filter products by name", () => {
      const result = filterListProductByName(mockProducts, "Hamburger");
      expect(result).toEqual([
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
      ]);
    });

    it("should return empty array if no product matches", () => {
      const result = filterListProductByName(mockProducts, "NotExist");
      expect(result).toEqual([]);
    });
  });
});
