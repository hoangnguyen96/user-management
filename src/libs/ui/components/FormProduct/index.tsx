import {
  KeyboardEventHandler,
  memo,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { FormControl, FormLabel, Stack } from "@mui/material";

// Models
import { Product, UserResponse } from "@app/models";

// Utils
import {
  clearErrorOnChange,
  isEnableSubmitButton,
  validatePrice,
  validateQuantity,
  validateRequired,
} from "@app/utils";

// Components
import { Button, Input, Select } from "../Common";

interface FormControllerProps {
  isOpen?: boolean;
  isLoading?: boolean;
  isAdmin?: boolean;
  listUser?: UserResponse[];
  itemUpdate: Partial<Product>;
  onSubmit: (product: Partial<Product>) => void;
  onNavigate?: (path: string) => void;
}

const rules = {
  name: {
    required: validateRequired,
  },

  price: {
    required: (value: number | null | undefined) =>
      validateRequired(value?.toString() || null),
    priceFormat: (value: number) => validatePrice(value),
  },
  quantity: {
    required: (value: number | null | undefined) =>
      validateRequired(value?.toString() || null),
    quantityFormat: (value: number) => validateQuantity(value),
  },
  userId: {
    required: validateRequired,
  },
};

const FormController = ({
  isOpen,
  isLoading,
  isAdmin = false,
  itemUpdate,
  listUser,
  onSubmit,
}: FormControllerProps) => {
  const { name, price, quantity, userId } = itemUpdate;

  const REQUIRED_FIELDS = isAdmin
    ? ["name", "price", "quantity", "useId"]
    : ["name", "quantity", "useId"];

  const formInitData: Partial<Product> = useMemo(
    () =>
      isAdmin
        ? {
            name: name || "",
            price: price || 0,
            quantity: quantity || 0,
            userId: userId || "",
          }
        : {
            name: name || "",
            quantity: quantity || 0,
            userId: userId || "",
          },
    [name, price, quantity, userId]
  );

  const {
    control,
    clearErrors,
    handleSubmit: submitLogin,
    formState: { errors, isValid, dirtyFields },
    reset,
  } = useForm<Product>({
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
      if (currentValue.length > 10 && key !== "Backspace" && key !== "Delete") {
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
        {/* Name */}
        <Controller
          name="name"
          control={control}
          rules={{
            validate: rules.name,
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
              <FormLabel sx={{ mt: "12px" }}>Name:</FormLabel>
              <Input
                data-testid="name-product"
                placeholder="name"
                value={value}
                isInvalid={!!error?.message}
                errorMessage={errors.name?.message}
                onChange={(e) => {
                  onChange(e);
                  clearErrorOnChange("name", errors, clearErrors);
                }}
                {...rest}
              />
            </Stack>
          )}
        />

        {/* Price */}
        {isAdmin && (
          <Controller
            name="price"
            control={control}
            rules={{
              validate: {
                ...rules.price,
                priceFormat: (value) => rules.price.priceFormat(value),
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
                <FormLabel sx={{ mt: "12px" }}>Price:</FormLabel>
                <Input
                  data-testid="price-product"
                  placeholder="100"
                  inputProps={{
                    inputMode: "numeric",
                  }}
                  value={value}
                  isInvalid={!!error?.message}
                  errorMessage={errors.price?.message}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    onChange(e.target.value);
                    clearErrorOnChange("price", errors, clearErrors);
                  }}
                  {...rest}
                />
              </Stack>
            )}
          />
        )}

        {/* Quantity */}
        <Controller
          name="quantity"
          control={control}
          rules={{
            validate: {
              ...rules.quantity,
              quantityFormat: (value) => rules.quantity.quantityFormat(value),
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
              <FormLabel sx={{ mt: "12px" }}>Quantity:</FormLabel>
              <Input
                data-testid="quantity-product"
                placeholder="1000"
                inputProps={{
                  inputMode: "numeric",
                }}
                value={value}
                isInvalid={!!error?.message}
                errorMessage={errors.quantity?.message}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  onChange(e.target.value);
                  clearErrorOnChange("quantity", errors, clearErrors);
                }}
                {...rest}
              />
            </Stack>
          )}
        />
        {/* UserId */}
        {isAdmin && (listUser?.length ?? 0) > 0 && (
          <Controller
            name="userId"
            control={control}
            rules={{
              validate: {
                ...rules.userId,
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
                <FormLabel sx={{ mt: "12px" }}>User:</FormLabel>
                <Select
                  data-testid="select-user"
                  value={value}
                  isInvalid={!!error?.message}
                  errorMessage={errors.userId?.message}
                  listUser={listUser}
                  onChange={(e) => {
                    onChange(e.target.value);
                    clearErrorOnChange("userId", errors, clearErrors);
                  }}
                  {...rest}
                />
              </Stack>
            )}
          />
        )}
      </Stack>

      <Button
        data-testid="button-product"
        variant="contained"
        label={(listUser?.length ?? 0) > 0 ? "Add" : "Update"}
        isLoading={isLoading}
        disabled={isDisableSubmit}
        onClick={submitLogin(onSubmit)}
      />
    </FormControl>
  );
};

export default memo(FormController);
