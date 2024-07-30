import {
  ERROR_MESSAGES,
  LENGTH_PHONE_NUMBER,
  PRICE,
  QUANTITY,
} from "@app/constants";

export const isRequired = (value: string | null | undefined): boolean =>
  !!value;

export const isValidFormat = (value = "", pattern: RegExp): boolean =>
  pattern.test(value);

/**
 * @param requiredFields [] The required fields on form
 * @param dirtyFields [] The fields, which the users touched and fill data on
 * @param errors {} The errors fields
 * NOTE: If the user touched and fill data for the fields, which defined on array requiredFields and without errors message
 *  ==> The button should enable.
 * When the button enable AND user focusing on the last element
 * the UX: hit `enter` on the last field to submit form should work
 */
export const isEnableSubmitButton = (
  requiredFields: string[],
  dirtyFields: string[],
  errors: Record<string, unknown>
): boolean => {
  const isMatchAllRequiredFields: boolean = requiredFields.every((field) =>
    dirtyFields.includes(field)
  );

  return isMatchAllRequiredFields && errors && !Object.keys(errors).length;
};

export const validateRequired = (value: string | null): string | true =>
  isRequired(value?.trim()) || ERROR_MESSAGES.FIELD_REQUIRED;

// validate form fields
export const validateRegExpFormat = (
  value: string,
  pattern: RegExp,
  ariaLabel: string
): string | true =>
  isValidFormat(value.trim(), pattern) || ERROR_MESSAGES.FORMAT(ariaLabel);

// validate phone number
export const validatePhoneNumber = (number: string) =>
  number.length === LENGTH_PHONE_NUMBER || ERROR_MESSAGES.FORMAT("Phone");

// validate price
export const validatePrice = (number: number) => {
  return number <= PRICE || ERROR_MESSAGES.FORMAT("Price");
};

// validate quantity
export const validateQuantity = (number: number) =>
  number <= QUANTITY || ERROR_MESSAGES.FORMAT("Quantity");
