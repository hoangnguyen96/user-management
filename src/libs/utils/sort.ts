import { Product, UserResponse } from "@app/models";

export const sortCustomersList = (
  data: UserResponse[],
  sortBy: keyof Omit<UserResponse, "status" | "id">
) => {
  const validKeys = ["fullName", "company", "phoneNumber", "email", "country"];

  if (validKeys.includes(sortBy)) {
    return [...data].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  } else {
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
