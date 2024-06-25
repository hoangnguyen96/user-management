import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Link, Typography, useMediaQuery } from "@mui/material";

// Routes
import { ROUTES } from "@app/constants";

// Stores
import { useAuthStore } from "@app/stores";

// Logo
import logo from "/images/user-manage.svg";
import { themeDefault } from "../../themes";

const Logo = () => {
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery(themeDefault.breakpoints.up("lg"));

  // Auth
  const isAuthenticated = useAuthStore((state) => [state.isAuthenticated]);

  const handleClickLogo = useCallback(() => {
    navigate(isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LANDING_PAGE);
  }, [navigate, isAuthenticated]);

  return (
    <Link
      data-testid="click-logo"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      gap="8px"
      onClick={handleClickLogo}
    >
      <Avatar
        src={logo}
        alt="logo-brand"
        sx={{ width: "37px", height: "37px" }}
      />
      {isLargeScreen && (
        <Typography variant="h1" display="flex" alignItems="flex-end" gap="4px">
          Dashboard{" "}
          <Typography variant="body2" lineHeight="28px">
            v.01
          </Typography>
        </Typography>
      )}
    </Link>
  );
};

export default memo(Logo);
