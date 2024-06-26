import { useMutation, useQuery } from "@tanstack/react-query";

// Constants
import { ENDPOINTS, MUTATION_KEY, QUERY_KEY } from "@app/constants";

// Models
import { UserPayload, UserResponse } from "@app/models";

// Services
import { HttpClient } from "@app/services";

export const useGetListCustomers = (enabled = true) => {
  const { data, error, ...rest } = useQuery<UserResponse[], Error>({
    enabled,
    queryKey: [QUERY_KEY.CUSTOMERS_LIST],
    queryFn: async () =>
      await HttpClient.get<UserResponse[]>(`/${ENDPOINTS.USER}`),
  });

  return {
    ...rest,
    data: data || [],
    errorMessage: error?.message || "",
  };
};

export const useGetCustomerById = (id: string) => {
  const { data, error, ...rest } = useQuery<UserResponse, Error>({
    queryKey: [QUERY_KEY.CUSTOMERS_LIST_BY_ID, id],
    queryFn: async () =>
      await HttpClient.get<UserResponse>(`/${ENDPOINTS.USER}/${id}`),
  });

  return {
    ...rest,
    data: (data as UserResponse) || {},
    errorMessage: error?.message || "",
  };
};

export const useCreateCustomer = () => {
  const { error, ...rest } = useMutation<
    UserResponse[],
    Error,
    Partial<UserResponse>
  >({
    mutationKey: [MUTATION_KEY.CREATE_CUSTOMER],
    mutationFn: async (payload: Partial<UserResponse>) =>
      await HttpClient.post<UserResponse[]>(`/${ENDPOINTS.USER}`, payload),
  });

  return {
    ...rest,
    errorMessage: error?.message || "",
  };
};

export const useUpdateCustomer = () => {
  const { error, ...rest } = useMutation<UserResponse, Error, UserPayload>({
    mutationFn: async ({ id, payload }: UserPayload) =>
      await HttpClient.put<UserResponse>(`/${ENDPOINTS.USER}/${id}`, payload),
  });

  return {
    ...rest,
    errorMessage: error?.message || "",
  };
};

export const useDeleteCustomer = () => {
  const { error, ...rest } = useMutation<
    UserResponse,
    Error,
    Partial<UserResponse>
  >({
    mutationFn: async ({ id }: Partial<UserResponse>) =>
      await HttpClient.delete<UserResponse>(`/${ENDPOINTS.USER}/${id}`),
  });

  return {
    ...rest,
    errorMessage: error?.message || "",
  };
};
