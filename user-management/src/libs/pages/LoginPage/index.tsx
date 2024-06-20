import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Divider,
  FormControl,
  FormLabel,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

// Constants
import { ROUTES, USER_ROLE } from "@app/constants";

// Apis
import { useAuthLogin } from "@app/api";

// Models
import { LoginCredentials, UserResponse } from "@app/models";

// Stores
import { useAuthStore } from "@app/stores";

// Utils
import {
  clearErrorOnChange,
  isEnableSubmitButton,
  validateRequired,
} from "@app/utils";

// Components
import { Button, Input } from "@app/ui/components";

const ValidationRuleLogin = {
  username: {
    required: validateRequired,
  },
  password: {
    required: validateRequired,
  },
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const { isPending: isLoadingLogin, mutate: mutation } = useAuthLogin();

  // Auth
  const [setUser, setIsAdmin, setAuthenticated] = useAuthStore((state) => [
    state.setUser,
    state.setIsAdmin,
    state.setAuthenticated,
  ]);

  const REQUIRED_FIELDS = ["username", "password"];

  const {
    control,
    clearErrors,
    handleSubmit: submitLogin,
    formState: { errors = {}, isValid, dirtyFields = {} },
  } = useForm<LoginCredentials>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Checking to disable/enable submit button
  const dirtyItems = Object.keys(dirtyFields);
  const shouldEnable = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors]
  );
  const isDisableSubmit = !(shouldEnable || isValid);

  const handleLoginSuccess = useCallback(
    (data: UserResponse) => {
      const { id, username, password, fullName, company, role } = data;
      setUser({
        id: id || "",
        username: username || "",
        password: password || "",
        fullName: fullName || "",
        company: company || "",
      });
      setAuthenticated(true);
      setIsAdmin(role === USER_ROLE.ADMIN);
      navigate(ROUTES.CUSTOMERS);
    },
    [setAuthenticated, setIsAdmin, setUser]
  );

  const handleLoginFail = useCallback(() => {
    setOpen(true);
  }, []);

  const handleSubmit = useCallback((data: LoginCredentials) => {
    mutation(
      { username: data.username, password: data.password },
      {
        onSuccess: (data: UserResponse) => {
          if (data) {
            return handleLoginSuccess(data);
          }
          handleLoginFail();
        },
        onError: () => {
          return handleLoginFail();
        },
      }
    );
  }, []);

  const handleClose = useCallback(
    (_event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }

      setOpen(false);
    },
    [setOpen]
  );

  const handleNavigateHome = useCallback(() => {
    navigate(ROUTES.LANDING_PAGE);
  }, []);

  return (
    <>
      <Stack justifyContent="center" alignItems="center">
        <Box
          sx={{
            width: "500px",
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Typography
            variant="h1"
            lineHeight="60px"
            textTransform="uppercase"
            textAlign="center"
            fontSize={{ xs: "30px", sm: "45px" }}
            my="10px"
          >
            Login!
          </Typography>
          <Divider orientation="horizontal" flexItem />

          {/* Form controller */}
          <FormControl
            onSubmit={submitLogin(handleSubmit)}
            sx={{
              width: "100%",
              backgroundColor: "transparent",
              flexDirection: "column",
            }}
          >
            <Stack
              sx={{
                width: "100%",
                maxWidth: "300px",
                m: "32px auto",
                gap: "12px",
              }}
            >
              <Controller
                name="username"
                control={control}
                rules={{
                  validate: ValidationRuleLogin.username,
                }}
                render={({
                  field: { onChange, ...rest },
                  fieldState: { error },
                }) => (
                  <Stack
                    flexDirection="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                  >
                    <FormLabel sx={{ mt: "12px" }}>Username:</FormLabel>
                    <Input
                      placeholder="username"
                      isInvalid={!!error?.message}
                      errorMessage={errors.username?.message}
                      onChange={(e) => {
                        onChange(e);
                        clearErrorOnChange("username", errors, clearErrors);
                      }}
                      {...rest}
                    />
                  </Stack>
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{
                  validate: ValidationRuleLogin.password,
                }}
                render={({
                  field: { onChange, ...rest },
                  fieldState: { error },
                }) => (
                  <Stack
                    flexDirection="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                  >
                    <FormLabel sx={{ mt: "12px" }}>Password:</FormLabel>
                    <Input
                      placeholder="password"
                      type="password"
                      isInvalid={!!error?.message}
                      errorMessage={errors.password?.message}
                      onChange={(e) => {
                        onChange(e.target.value);
                        clearErrorOnChange("password", errors, clearErrors);
                      }}
                      {...rest}
                    />
                  </Stack>
                )}
              />
            </Stack>

            {/* Submit form */}
            <Stack flexDirection="row" justifyContent="center" gap="32px">
              <Button
                onClick={handleNavigateHome}
                variant="outlined"
                label="Home"
              />
              <Button
                variant="contained"
                label="Log in"
                isLoading={isLoadingLogin}
                disabled={isDisableSubmit}
                onClick={submitLogin(handleSubmit)}
              />
            </Stack>
          </FormControl>
        </Box>
      </Stack>

      {/* Login failed */}
      <Snackbar
        color="red"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          severity="error"
          variant="outlined"
          color="error"
          sx={{
            width: "100%",
            backgroundColor: "#ffc5c5",
            color: "#df0404",
            alignItems: "center",
          }}
          onClose={handleClose}
        >
          Login failed. Please check again!
        </Alert>
      </Snackbar>
    </>
  );
};
export default LoginPage;
