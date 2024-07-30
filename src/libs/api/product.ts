import { useMutation, useQuery } from "@tanstack/react-query";

// Constants
import { ENDPOINTS, MUTATION_KEY, QUERY_KEY } from "@app/constants";

// Models
import { Product, ProductPayload } from "../models";

// Services
import { HttpClient } from "@app/services";

export const useGetListProduct = () => {
  const { data, error, ...rest } = useQuery<Product[], Error>({
    queryKey: [QUERY_KEY.PRODUCT_LIST],
    queryFn: async () =>
      await HttpClient.get<Product[]>(`/${ENDPOINTS.PRODUCT}`),
  });

  return {
    ...rest,
    data: data || [],
    errorMessage: error?.message || "",
  };
};

export const useGetListProductOfUser = (userId: string) => {
  const { data, error, ...rest } = useQuery<Product[], Error>({
    queryKey: [QUERY_KEY.PRODUCT_LIST_OF_USER],
    queryFn: async () =>
      await HttpClient.get<Product[]>(
        `/${ENDPOINTS.USER}/${userId}/${ENDPOINTS.PRODUCT}`
      ),
  });

  return {
    ...rest,
    data: data || [],
    errorMessage: error?.message || "",
  };
};

export const useGetProductById = (userId: string, id: string) => {
  const { data, error, ...rest } = useQuery<Product, Error>({
    queryKey: [QUERY_KEY.PRODUCT_LIST_OF_USER_BY_ID, id],
    queryFn: async () =>
      await HttpClient.get<Product>(
        `/${ENDPOINTS.USER}/${userId}/${ENDPOINTS.PRODUCT}/${id}`
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
    mutationKey: [MUTATION_KEY.CREATE_PRODUCT],
    mutationFn: async (payload) =>
      await HttpClient.post<Product[]>(
        `/${ENDPOINTS.USER}/${payload.userId}/${ENDPOINTS.PRODUCT}`,
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
        `/${ENDPOINTS.USER}/${userId}/${ENDPOINTS.PRODUCT}/${id}`,
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
        `/${ENDPOINTS.USER}/${userId}/${ENDPOINTS.PRODUCT}/${id}`
      ),
  });

  return {
    ...rest,
    errorMessage: error?.message || "",
  };
};
