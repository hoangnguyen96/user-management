import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

// Constants
import { LOCAL_STORAGE } from "@app/constants";

// Stores
import { useAuthStore } from "@app/stores";

// Api
import { useAuthLogout } from "@app/api";

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Auth
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const removeAuthLocal = useCallback(
    () => localStorage.removeItem(LOCAL_STORAGE.AUTH),
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
