import { Navigate, Outlet, useLocation } from "react-router-dom";

// Stores
import { useAuthStore } from "@app/stores";
import { ROUTES } from "@app/constants";

const RouteAuthenticated = () => {
  const location = useLocation();

  // Auth
  const [isAuthenticated] = useAuthStore((state) => [state.isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RouteAuthenticated;
