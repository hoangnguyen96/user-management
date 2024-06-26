export interface Product {
  id: string;
  userId: string;
  name: string;
  price: number;
  quantity: number;
  status: boolean;
  image: string;
  code: string;
}

export type ProductInit = Omit<Product, "price" | "quantity"> & {
  price?: string;
  quantity: string;
};

export interface ProductPayload {
  id?: string;
  userId: string;
  payload: Omit<Partial<Product>, "id">;
}
