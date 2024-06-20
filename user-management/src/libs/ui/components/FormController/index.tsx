import {
  KeyboardEventHandler,
  memo,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { FormControl, FormLabel, Stack } from "@mui/material";

// Constants
import { REGEX_PATTERN, ROUTES } from "@app/constants";

// Models
import { UserResponse } from "@app/models";

// Utils
import {
  clearErrorOnChange,
  isEnableSubmitButton,
  validatePhoneNumber,
  validateRegExpFormat,
  validateRequired,
} from "@app/utils";

// Components
import { Button, Input } from "../Common";

interface FormControllerProps {
  isOpen?: boolean;
  isLoading?: boolean;
  itemUpdate: Partial<UserResponse>;
  onSubmit: (user: Partial<UserResponse>) => void;
  onNavigate?: (path: string) => void;
}

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

const FormController = ({
  isOpen,
  isLoading,
  itemUpdate,
  onSubmit,
  onNavigate,
}: FormControllerProps) => {
  const { fullName, company, phoneNumber, email, country } = itemUpdate;

  const REQUIRED_FIELDS = [
    "fullName",
    "company",
    "phoneNumber",
    "email",
    "country",
  ];

  const formInitData: Partial<UserResponse> = useMemo(
    () => ({
      fullName: fullName || "",
      company: company || "",
      phoneNumber: phoneNumber || "",
      email: email || "",
      country: country || "",
    }),
    [company, country, email, fullName, phoneNumber]
  );

  const {
    control,
    clearErrors,
    handleSubmit: submitLogin,
    formState: { errors, isValid, dirtyFields },
    reset,
  } = useForm<UserResponse>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: formInitData,
  });

  // Reset Form
  useEffect(() => {
    reset(formInitData);
  }, [formInitData, reset, isOpen]);

  // Checking to disable/enable submit button
  const dirtyItems = Object.keys(dirtyFields);

  const shouldEnable = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors]
  );

  const isDisableSubmit = !(shouldEnable || isValid);

  const handleReturnHome = useCallback(() => {
    onNavigate?.(ROUTES.LANDING_PAGE);
  }, []);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const { key, target } = event;
      const currentValue: string = (target as HTMLInputElement).value;

      // Allow only numeric characters and some special keys like backspace, delete, arrow keys, etc.
      if (
        !(
          (key >= "0" && key <= "9") ||
          key === "Backspace" ||
          key === "Delete" ||
          key === "ArrowLeft" ||
          key === "ArrowRight" ||
          key === "Home" ||
          key === "End"
        )
      ) {
        event.preventDefault();
      }

      // Check if the length of the current value is between 8 and 14 characters
      if (
        currentValue.length >= 10 &&
        key !== "Backspace" &&
        key !== "Delete"
      ) {
        event.preventDefault();
      }
    },
    []
  );

  return (
    <FormControl
      onSubmit={submitLogin(onSubmit)}
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
              phoneFormat: (value) => rules.phoneNumber.phoneFormat(value),
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
                onKeyDown={handleKeyDown}
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

      {Object.keys(itemUpdate).length > 0 ? (
        <Button
          data-testid="button-update"
          variant="contained"
          label="Update"
          isLoading={isLoading}
          disabled={isDisableSubmit}
          onClick={submitLogin(onSubmit)}
        />
      ) : (
        <Stack flexDirection="row" mt="40px" justifyContent="center" gap="32px">
          <Button onClick={handleReturnHome} variant="outlined" label="Home" />
          <Button
            data-testid="button-sign-up"
            variant="contained"
            label="Sign up"
            isLoading={isLoading}
            disabled={isDisableSubmit}
            onClick={submitLogin(onSubmit)}
          />
        </Stack>
      )}
    </FormControl>
  );
};

export default memo(FormController);
