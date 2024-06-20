import { Product, UserResponse } from "@app/models";

export const sortCustomersList = (data: UserResponse[], sortBy: string) => {
  switch (sortBy) {
    case "name":
      return [...data].sort((a, b) => a.fullName.localeCompare(b.fullName));
    case "company":
      return [...data].sort((a, b) => a.company.localeCompare(b.company));
    case "phone":
      return [...data].sort((a, b) =>
        a.phoneNumber.localeCompare(b.phoneNumber)
      );
    case "email":
      return [...data].sort((a, b) => a.email.localeCompare(b.email));
    case "country":
      return [...data].sort((a, b) => a.country.localeCompare(b.country));
    default:
      return data;
  }
};

export const sortProductList = (data: Product[], sortBy: string) => {
  switch (sortBy) {
    case "name":
      return [...data].sort((a, b) => a.name.localeCompare(b.name));
    case "price":
      return [...data].sort((a, b) => a.price - b.price);
    case "quantity":
      return [...data].sort((a, b) => a.quantity - b.quantity);
    default:
      return data;
  }
};
