import { Product, UserResponse } from "@app/models";

export const dividePaginationCustomers = (list: UserResponse[]) => {
  return list.reduce((acc: UserResponse[][], _, i, self) => {
    if (!(i % 8)) {
      return [...acc, self.slice(i, i + 8)];
    }
    return acc;
  }, []);
};

export const dividePaginationProduct = (list: Product[]) => {
  return list.reduce((acc: Product[][], _, i, self) => {
    if (!(i % 8)) {
      return [...acc, self.slice(i, i + 8)];
    }
    return acc;
  }, []);
};

export const filterListCustomersByName = (
  list: UserResponse[],
  valueSearch: string
) => {
  return list.filter((customer) =>
    customer.fullName.toLowerCase().includes(valueSearch.toLowerCase())
  );
};

export const filterListProductByName = (
  list: Product[],
  valueSearch: string
) => {
  return list.filter((product) =>
    product.name.toLowerCase().includes(valueSearch.toLowerCase())
  );
};
