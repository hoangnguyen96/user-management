import { AuthUser } from "./user";

export interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: AuthUser;
}

export interface AuthStore extends AuthState {
  setAuthenticated: (isAuthenticated: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setUser: (user: AuthUser) => void;
  clearAuth: () => void;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
