import { sortCustomersList, sortProductList } from "../sort";
import {
  mockProducts,
  mockProductsByName,
  mockProductsByPrice,
  mockProductsByQuantity,
  mockUsers,
  mockUsersByCompany,
  mockUsersByCountry,
  mockUsersByNameAndEmail,
  mockUsersByPhone,
} from "./__mocks__/mock-data";

describe("Sort Utils", () => {
  describe("sortCustomersList", () => {
    it("Should sort customers by name", () => {
      const result = sortCustomersList(mockUsers, "name");
      expect(result).toEqual(mockUsersByNameAndEmail);
    });

    it("Should sort customers by company", () => {
      const result = sortCustomersList(mockUsers, "company");
      expect(result).toEqual(mockUsersByCompany);
    });

    it("Should sort customers by phone number", () => {
      const result = sortCustomersList(mockUsers, "phone");
      expect(result).toEqual(mockUsersByPhone);
    });

    it("Should sort customers by email", () => {
      const result = sortCustomersList(mockUsers, "email");
      expect(result).toEqual(mockUsersByNameAndEmail);
    });

    it("Should sort customers by country", () => {
      const result = sortCustomersList(mockUsers, "country");
      expect(result).toEqual(mockUsersByCountry);
    });
  });

  describe("sortProductList", () => {
    it("Should sort products by name", () => {
      const result = sortProductList(mockProducts, "name");
      expect(result).toEqual(mockProductsByName);
    });

    it("Should sort products by price", () => {
      const result = sortProductList(mockProducts, "price");
      expect(result).toEqual(mockProductsByPrice);
    });

    it("Should sort products by quantity", () => {
      const result = sortProductList(mockProducts, "quantity");
      expect(result).toEqual(mockProductsByQuantity);
    });
  });
});
