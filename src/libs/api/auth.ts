import { useMutation } from "@tanstack/react-query";

// Constants
import { ENDPOINTS, ERROR_MESSAGES, MUTATION_KEY } from "@app/constants";

// Models
import { ApiResponse, LoginCredentials, UserResponse } from "@app/models";

// Utils
import { findUser } from "../utils/feature";

const baseApi = process.env.VITE_APP_BASE_API || "";

// Login with password
export const useAuthLogin = () => {
  const { error, ...rest } = useMutation<UserResponse, Error, LoginCredentials>(
    {
      mutationFn: async ({ username, password }: LoginCredentials) => {
        const response = await fetch(`${baseApi}/${ENDPOINTS.USER}`, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });

        const data = await response.json();
        const user = findUser(data, username, password);

        if (response.ok) {
          return user;
        }

        throw new Error("Invalid credentials");
      },
    }
  );

  return {
    ...rest,
    errorMessage: error ? ERROR_MESSAGES.GET_ERROR : "",
  };
};

export const useAuthLogout = (callback: () => void) => {
  const { error, ...rest } = useMutation<ApiResponse, Error>({
    mutationKey: [MUTATION_KEY.LOGOUT],
    mutationFn: async () => {
      await callback();

      return {
        message: "Logged out successfully",
      } as ApiResponse;
    },
  });

  return {
    ...rest,
    errorMessage: error ? error.message : "",
  };
};
