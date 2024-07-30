import { useNavigate } from "react-router-dom";
import { Divider, Stack, Typography } from "@mui/material";

// Routes
import { ROUTES } from "@app/constants";

// Components
import { Button, ErrorBoundary } from "@app/ui/components";
import { useCallback } from "react";

const LandingPageBase = () => {
  const navigate = useNavigate();

  const handleReturnLogin = useCallback(() => {
    navigate(ROUTES.LOGIN);
  }, []);

  const handleReturnSignUp = useCallback(() => {
    navigate(ROUTES.SIGNUP);
  }, []);

  return (
    <ErrorBoundary
      fallback={
        <Typography>Oops! An error occurred in Landing page.</Typography>
      }
    >
      <Stack justifyContent="center" alignItems="center" height="90vh">
        <Typography
          variant="h1"
          lineHeight="70px"
          textTransform="uppercase"
          fontSize={{ xs: "60px", sm: "75px" }}
        >
          Welcome!
        </Typography>
        <Typography
          fontSize="12px"
          mb="16px"
          letterSpacing={{ xs: "2px", sm: "4px" }}
        >
          This user management application
        </Typography>
        <Divider
          orientation="horizontal"
          flexItem
          sx={{ width: "30%", margin: "0 auto" }}
        />
        <Stack flexDirection="row" mt="20px" gap="16px">
          <Button
            onClick={handleReturnLogin}
            variant="outlined"
            label="Login"
          />
          <Button
            onClick={handleReturnSignUp}
            variant="outlined"
            label="SignUp"
          />
        </Stack>
      </Stack>
    </ErrorBoundary>
  );
};
export default LandingPageBase;
