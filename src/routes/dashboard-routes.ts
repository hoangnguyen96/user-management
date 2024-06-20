import { lazy } from "react";

// Constants
import { ROUTES } from "@app/constants";

// Main
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Product = lazy(() => import("../pages/Product"));
const Customers = lazy(() => import("../pages/Customers"));
const Income = lazy(() => import("../pages/Income"));
const Promote = lazy(() => import("../pages/Promote"));
const Help = lazy(() => import("../pages/Help"));

export const DASHBOARD_ROUTE = [
  { path: ROUTES.DASHBOARD, Component: Dashboard },
  { path: ROUTES.PRODUCT, Component: Product },
  { path: ROUTES.CUSTOMERS, Component: Customers },
  { path: ROUTES.INCOME, Component: Income },
  { path: ROUTES.PROMOTE, Component: Promote },
  { path: ROUTES.HELP, Component: Help },
];
