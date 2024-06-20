import { useMutation } from "@tanstack/react-query";

// Constants
import {
  ENDPOINTS,
  ERROR_MESSAGES,
  METHOD,
  MUTATION_KEY,
} from "@app/constants";

// Models
import { ApiResponse, LoginCredentials, UserResponse } from "@app/models";

const baseApi = process.env.VITE_APP_BASE_API || "";
const endpoint = ENDPOINTS.USER;

// Login with password
export const useAuthLogin = () => {
  const { error, ...rest } = useMutation<UserResponse, Error, LoginCredentials>(
    {
      mutationFn: async ({ username, password }: LoginCredentials) => {
        const response = await fetch(`${baseApi}/${endpoint}`, {
          method: METHOD.GET,
          headers: { "content-type": "application/json" },
        });

        const data = await response.json();
        const user = data.find(
          (user: { username: string; password: string }) =>
            user.username === username && user.password === password
        );

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

export const useAuthLogout = () => {
  const { error, ...rest } = useMutation<ApiResponse, Error>({
    mutationKey: MUTATION_KEY.LOGOUT,
    mutationFn: async () => {
      // Clear local storage or any other storage
      await localStorage.removeItem("auth");

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
