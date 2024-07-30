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

// Constants
import { REGEX_PATTERN } from "@app/constants";

// Models
import { UserResponse } from "@app/models";

// Utils
import {
  clearErrorOnChange,
  validatePhoneNumber,
  validateRegExpFormat,
  validateRequired,
} from "@app/utils";

// Components
import { Button, Input } from "@app/ui/components";

const SignUpPage = () => {
  const rules = {
    fullName: {
      required: validateRequired,
    },
    company: {
      required: validateRequired,
    },
    phoneNumber: {
      required: validateRequired,
      phoneFormat: (value: string) => validatePhoneNumber(value),
    },
    email: {
      required: validateRequired,
      emailFormat: (value: string) =>
        validateRegExpFormat(value, REGEX_PATTERN.EMAIL, "Email"),
    },
    country: {
      required: validateRequired,
    },
  };

  const {
    control,
    clearErrors,
    formState: { errors },
  } = useForm<UserResponse>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {},
  });

  return (
    <Container sx={{ width: "969px" }}>
      <Stack justifyContent="center" alignItems="center">
        <Box
          sx={{
            width: "500px",
            position: "absolute",
            top: "25%",
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
            Sign Up!
          </Typography>
          <Divider orientation="horizontal" flexItem />

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
                maxWidth: "350px",
                m: "32px auto",
                gap: "12px",
              }}
            >
              {/* FullName */}
              <Controller
                name="fullName"
                control={control}
                rules={{
                  validate: rules.fullName,
                }}
                render={({
                  field: { value, onChange, ...rest },
                  fieldState: { error },
                }) => (
                  <Stack
                    flexDirection="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    gap="12px"
                  >
                    <FormLabel sx={{ mt: "12px" }}>FullName:</FormLabel>
                    <Input
                      placeholder="fullName"
                      data-testid="full-name"
                      value={value}
                      isInvalid={!!error?.message}
                      errorMessage={errors.fullName?.message}
                      onChange={(e) => {
                        onChange(e);
                        clearErrorOnChange("fullName", errors, clearErrors);
                      }}
                      {...rest}
                    />
                  </Stack>
                )}
              />

              {/* Company */}
              <Controller
                name="company"
                control={control}
                rules={{
                  validate: rules.company,
                }}
                render={({
                  field: { value, onChange, ...rest },
                  fieldState: { error },
                }) => (
                  <Stack
                    flexDirection="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    gap="12px"
                  >
                    <FormLabel sx={{ mt: "12px" }}>Company:</FormLabel>
                    <Input
                      placeholder="company"
                      data-testid="company-customer"
                      value={value}
                      isInvalid={!!error?.message}
                      errorMessage={errors.company?.message}
                      onChange={(e) => {
                        onChange(e.target.value);
                        clearErrorOnChange("company", errors, clearErrors);
                      }}
                      {...rest}
                    />
                  </Stack>
                )}
              />

              {/* PhoneNumber */}
              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  validate: {
                    ...rules.phoneNumber,
                    phoneFormat: (value) =>
                      rules.phoneNumber.phoneFormat(value),
                  },
                }}
                render={({
                  field: { value, onChange, ...rest },
                  fieldState: { error },
                }) => (
                  <Stack
                    flexDirection="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    gap="12px"
                  >
                    <FormLabel sx={{ mt: "12px" }}>PhoneNumber:</FormLabel>
                    <Input
                      data-testid="phone-number"
                      placeholder="2051234444"
                      inputProps={{
                        inputMode: "numeric",
                      }}
                      value={value}
                      isInvalid={!!error?.message}
                      errorMessage={errors.phoneNumber?.message}
                      onChange={(e) => {
                        onChange(e.target.value);
                        clearErrorOnChange("phoneNumber", errors, clearErrors);
                      }}
                      {...rest}
                    />
                  </Stack>
                )}
              />

              {/* email */}
              <Controller
                name="email"
                control={control}
                rules={{
                  validate: rules.email,
                }}
                render={({
                  field: { value, onChange, ...rest },
                  fieldState: { error },
                }) => (
                  <Stack
                    flexDirection="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    gap="12px"
                  >
                    <FormLabel sx={{ mt: "12px" }}>Email:</FormLabel>
                    <Input
                      data-testid="email"
                      placeholder="abc@gmail.com"
                      value={value}
                      isInvalid={!!error?.message}
                      errorMessage={errors.email?.message}
                      onChange={(e) => {
                        onChange(e.target.value);
                        clearErrorOnChange("email", errors, clearErrors);
                      }}
                      {...rest}
                    />
                  </Stack>
                )}
              />

              {/* country */}
              <Controller
                name="country"
                control={control}
                rules={{
                  validate: rules.country,
                }}
                render={({
                  field: { value, onChange, ...rest },
                  fieldState: { error },
                }) => (
                  <Stack
                    flexDirection="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    gap="12px"
                  >
                    <FormLabel sx={{ mt: "12px" }}>Country:</FormLabel>
                    <Input
                      data-testid="country-customer"
                      placeholder="country"
                      value={value}
                      isInvalid={!!error?.message}
                      errorMessage={errors.country?.message}
                      onChange={(e) => {
                        onChange(e.target.value);
                        clearErrorOnChange("country", errors, clearErrors);
                      }}
                      {...rest}
                    />
                  </Stack>
                )}
              />
            </Stack>

            <Stack
              flexDirection="row"
              mt="40px"
              justifyContent="center"
              gap="32px"
            >
              <Button onClick={() => {}} variant="outlined" label="Home" />
              <Button
                data-testid="button-sign-up"
                variant="contained"
                label="Sign up"
                onClick={() => {}}
              />
            </Stack>
          </FormControl>
        </Box>
      </Stack>
    </Container>
  );
};
const meta: Meta<typeof SignUpPage> = {
  component: SignUpPage,
};

export default meta;
type Story = StoryObj<typeof SignUpPage>;

export const SignUpPageBase: Story = {
  args: {},
};
