import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { persist } from "zustand/middleware";

// Constants
import { LOCAL_STORAGE } from "@app/constants";

// Models
import { AuthUser } from "@app/models";

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: AuthUser;
}

interface AuthStore extends AuthState {
  setAuthenticated: (isAuthenticated: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setUser: (user: AuthUser) => void;
  clearAuth: () => void;
}

const INITIAL_AUTH_STATE: AuthState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {
    id: "",
    fullName: "",
    company: "",
    token: "",
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
