import { Product } from "@app/models";
import { UserResponse } from "../models/user";

export const customUsername = (): string =>
  `consumer${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;

export const findUser = (
  data: UserResponse[],
  username: string,
  password: string
): UserResponse => {
  const user = data.find(
    (user: { username: string; password: string }) =>
      user.username === username && user.password === password
  );

  return user as UserResponse;
};

export const filterCompany = (list: UserResponse[], name: string): number =>
  list.filter((item) => item.company.includes(name)).length;

export const totalQuantity = (list: Product[], name: string): number =>
  list
    .filter((product) => product.name === name)
    .reduce((total, product) => total + product.quantity, 0);
