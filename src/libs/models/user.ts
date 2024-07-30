import { USER_ROLE } from "@app/constants";

export interface User {
  id: string;
  fullName: string;
  company: string;
  phoneNumber: string;
  email: string;
  country: string;
  status: boolean;
  role: USER_ROLE;
}

export interface AuthUser {
  id: string;
  fullName: string;
  company: string;
  token: string;
}

export interface UserResponse extends User {
  username: string;
  password: string;
}

export interface UserPayload {
  id: string;
  payload: Partial<UserResponse>;
}

export interface ApiResponse {
  message: string;
}

export type LoginCredentials = Pick<UserResponse, "username" | "password">;
