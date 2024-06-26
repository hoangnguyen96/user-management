import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { persist } from "zustand/middleware";

// Constants
import { LOCAL_STORAGE } from "@app/constants";

// Models
import { AuthState, AuthStore } from "@app/models";

const INITIAL_AUTH_STATE: AuthState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {
    id: "",
    username: "",
    password: "",
    fullName: "",
    company: "",
  },
};

export const useAuthStore = createWithEqualityFn<AuthStore>()(
  persist(
    (set) => ({
      ...INITIAL_AUTH_STATE,
      setAuthenticated: (isAuthenticated) => {
        set({ isAuthenticated });
      },

      setIsAdmin: (isAdmin) => {
        set({ isAdmin });
      },

      setUser: (user) => {
        set({ user });
      },

      clearAuth: () => {
        set({
          ...INITIAL_AUTH_STATE,
        });
      },
    }),
    { name: LOCAL_STORAGE.AUTH }
  ),
  shallow
);
