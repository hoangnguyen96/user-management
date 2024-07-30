import { forwardRef, memo } from "react";
import {
  Stack,
  TextField,
  TextFieldProps,
  TextFieldVariants,
  Typography,
} from "@mui/material";
import { themeDefault } from "../../../themes";

interface CustomTextFieldProps extends Omit<TextFieldProps, "variant"> {
  variant?: TextFieldVariants;
  errorMessage?: string;
  isInvalid?: boolean;
}

export const Input = memo(
  forwardRef<HTMLDivElement, CustomTextFieldProps>(
    ({ variant, errorMessage, isInvalid, type = "text", ...rest }, ref) => {
      return (
        <Stack ref={ref} mb={errorMessage ? 0 : "20px"}>
          <TextField
            type={type}
            variant={variant}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    errorMessage || isInvalid
                      ? themeDefault().palette.error.main
                      : "#b5b7C0",
                },
                "&:hover fieldset": {
                  borderColor:
                    errorMessage || isInvalid
                      ? themeDefault().palette.error.main
                      : themeDefault().palette.primary.main,
                },
                "&.Mui-focused fieldset": {
                  borderColor:
                    errorMessage || isInvalid
                      ? themeDefault().palette.error.main
                      : themeDefault().palette.primary.main,
                },
              },
            }}
            {...rest}
          />
          {errorMessage && (
            <Typography
              variant="caption"
              fontSize="12px"
              ml="10px"
              color={themeDefault().palette.error.main}
            >
              {errorMessage}
            </Typography>
          )}
        </Stack>
      );
    }
  )
);
