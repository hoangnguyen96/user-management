export const API_NAME = "user_management";

export enum ENDPOINTS {
  USER = "user",
  PRODUCT = "product",
}

export enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const OPTIONS = ["Edit", "Delete"];

export const STALE_TIME_API = 1000 * 60 * 5;
export const DELAY_TIME_API = 2;
