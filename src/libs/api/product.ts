import { useMutation, useQuery } from "@tanstack/react-query";

// Constants
import { ENDPOINTS, MUTATION_KEY, QUERY_KEY } from "@app/constants";

// Models
import { Product, ProductPayload } from "../models";

// Services
import { HttpClient } from "@app/services";

const endpointUser = ENDPOINTS.USER;
const endpointProduct = ENDPOINTS.PRODUCT;

export const useGetListProduct = (isAdmin: boolean, userId?: string) => {
  const { data, error, ...rest } = useQuery<Product[], Error>({
    enabled: true,
    queryKey: QUERY_KEY.PRODUCT_LIST,
    queryFn: async () => {
      const path = isAdmin
        ? `/${endpointProduct}`
        : `/${endpointUser}/${userId}/${endpointProduct}`;
      return await HttpClient.get<Product[]>(path);
    },
  });

  return {
    ...rest,
    data: data || [],
    errorMessage: error?.message || "",
  };
};

export const useGetProductById = (userId: string, id: string) => {
  const { data, error, ...rest } = useQuery<Product, Error>({
    queryKey: QUERY_KEY.CUSTOMERS_LIST_BY_ID(id),
    queryFn: async () =>
      await HttpClient.get<Product>(
        `/${endpointUser}/${userId}/${endpointProduct}/${id}`
      ),
  });

  return {
    ...rest,
    data: (data as Product) || {},
    errorMessage: error?.message || "",
  };
};

export const useCreateProduct = () => {
  const { error, ...rest } = useMutation<Product[], Error, Partial<Product>>({
    mutationKey: MUTATION_KEY.CREATE_PRODUCT,
    mutationFn: async (payload) =>
      await HttpClient.post<Product[]>(
        `/${endpointUser}/${payload.userId}/${endpointProduct}`,
        payload
      ),
  });

  return {
    ...rest,
    errorMessage: error?.message || "",
  };
};

export const useUpdateProduct = () => {
  const { error, ...rest } = useMutation<Product, Error, ProductPayload>({
    mutationFn: async ({ id, userId, payload }: ProductPayload) =>
      await HttpClient.put<Product>(
        `/${endpointUser}/${userId}/${endpointProduct}/${id}`,
        payload
      ),
  });

  return {
    ...rest,
    errorMessage: error?.message || "",
  };
};

export const useDeleteProduct = () => {
  const { error, ...rest } = useMutation<Product, Error, Partial<Product>>({
    mutationFn: async ({ id, userId }: Partial<Product>) =>
      await HttpClient.delete<Product>(
        `/${endpointUser}/${userId}/${endpointProduct}/${id}`
      ),
  });

  return {
    ...rest,
    errorMessage: error?.message || "",
  };
};
