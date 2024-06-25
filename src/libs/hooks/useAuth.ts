import { useQueryClient } from "@tanstack/react-query";

// Stores
import { useAuthStore } from "@app/stores";

// Api
import { useAuthLogout } from "@app/api";
import { useCallback } from "react";

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Auth
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const removeAuthLocal = useCallback(
    () => localStorage.removeItem("auth"),
    []
  );

  // Logout
  const { mutate: logOut } = useAuthLogout(removeAuthLocal);

  const handleLogout = () => {
    clearAuth();
    logOut();
    queryClient.clear();
  };

  return { handleLogout };
};
