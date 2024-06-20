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
  username: string;
  password: string;
  fullName: string;
  company: string;
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
