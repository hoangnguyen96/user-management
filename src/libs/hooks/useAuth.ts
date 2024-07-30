import { useQueryClient } from "@tanstack/react-query";

// Stores
import { useAuthStore } from "@app/stores";

// Api
import { useAuthLogout } from "@app/api";

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Auth
  const clearAuth = useAuthStore((state) => state.clearAuth);

  // Logout
  const { mutate: logOut } = useAuthLogout(clearAuth);

  const handleLogout = () => {
    logOut();
    queryClient.clear();
  };

  return { handleLogout };
};
