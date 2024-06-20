import { lazy } from "react";
import { ROUTES } from "@app/constants";

const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/SignUp"));
const NotFound = lazy(() => import("../pages/NotFound"));

export const PUBLIC_ROUTE = [
  { path: ROUTES.LOGIN, Component: Login },
  { path: ROUTES.SIGNUP, Component: SignUp },
  { path: "*", Component: NotFound },
];
