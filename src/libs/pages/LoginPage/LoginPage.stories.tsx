import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

// Utils
import { clearErrorOnChange, validateRequired } from "@app/utils";

// Components
import { Button, Input } from "@app/ui/components";
import { LoginCredentials } from "@app/models";

const LoginPage = () => {
  const ValidationRuleLogin = {
    username: {
      required: validateRequired,
    },
    password: {
      required: validateRequired,
    },
  };

  const {
    control,
    clearErrors,
    formState: { errors = {} },
  } = useForm<LoginCredentials>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Container sx={{ width: "969px" }}>
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
            onSubmit={() => {}}
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
              <Button onClick={() => {}} variant="outlined" label="Home" />
              <Button variant="contained" label="Log in" onClick={() => {}} />
            </Stack>
          </FormControl>
        </Box>
      </Stack>
    </Container>
  );
};
const meta: Meta<typeof LoginPage> = {
  component: LoginPage,
};

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const LoginPageBase: Story = {
  args: {},
};
