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
      <Stack
        position="absolute"
        top="50%"
        left="50%"
        alignItems="center"
        width={{ xs: "100%", lg: "500px" }}
        sx={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          variant="h1"
          maxWidth="400px"
          lineHeight="65px"
          width="365px"
          textAlign="center"
          textTransform="uppercase"
          fontSize={{ xs: "50px", sm: "64px" }}
        >
          Welcome!
        </Typography>
        <Typography
          fontSize="12px"
          mb="16px"
          maxWidth="340px"
          letterSpacing={{ xs: "2px", sm: "4px" }}
        >
          This user management application
        </Typography>
        <Divider
          orientation="horizontal"
          flexItem
          sx={{ width: "30%", margin: "0 auto" }}
        />
        <Stack flexDirection="row" mt="20px" maxWidth="170px" gap="16px">
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
