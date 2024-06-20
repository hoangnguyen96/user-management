import { forwardRef, memo } from "react";
import {
  Stack,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
  Typography,
} from "@mui/material";
import { themeDefault } from "../../../themes";

// Define custom variant types
type CustomVariant = "error" | "warning" | "normal";

interface CustomTextFieldProps extends Omit<TextFieldProps, "variant"> {
  variant?: CustomVariant;
  errorMessage?: string;
  isInvalid?: boolean;
}

const customStyles: Record<CustomVariant, SxProps<Theme>> = {
  error: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "darkred",
      },
      "&.Mui-focused fieldset": {
        borderColor: "red",
      },
    },
    "& .MuiInputLabel-root": {
      color: "red",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "red",
    },
    "& .MuiFormHelperText-root": {
      color: "red",
    },
  },
  warning: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "orange",
      },
      "&:hover fieldset": {
        borderColor: "darkorange",
      },
      "&.Mui-focused fieldset": {
        borderColor: "orange",
      },
    },
    "& .MuiInputLabel-root": {
      color: "orange",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "orange",
    },
    "& .MuiFormHelperText-root": {
      color: "orange",
    },
  },
  normal: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "gray",
      },
      "&:hover fieldset": {
        borderColor: "darkgray",
      },
      "&.Mui-focused fieldset": {
        borderColor: "gray",
      },
    },
    "& .MuiInputLabel-root": {
      color: "gray",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "gray",
    },
    "& .MuiFormHelperText-root": {
      color: "gray",
    },
  },
};

export const Input = memo(
  forwardRef<HTMLDivElement, CustomTextFieldProps>(
    ({ variant, errorMessage, isInvalid, type = "text", ...rest }, ref) => {
      return (
        <Stack ref={ref} mb={errorMessage ? 0 : "20px"}>
          <TextField
            type={type}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    errorMessage || isInvalid
                      ? themeDefault.palette.error.main
                      : "#b5b7C0",
                },
                "&:hover fieldset": {
                  borderColor:
                    errorMessage || isInvalid
                      ? themeDefault.palette.error.main
                      : themeDefault.palette.primary.main,
                },
                "&.Mui-focused fieldset": {
                  borderColor:
                    errorMessage || isInvalid
                      ? themeDefault.palette.error.main
                      : themeDefault.palette.primary.main,
                },
              },
              ...(variant ? customStyles[variant] : { variant: "normal" }),
            }}
            {...rest}
          />
          {errorMessage && (
            <Typography
              variant="caption"
              fontSize="12px"
              ml="10px"
              color={themeDefault.palette.error.main}
            >
              {errorMessage}
            </Typography>
          )}
        </Stack>
      );
    }
  )
);
