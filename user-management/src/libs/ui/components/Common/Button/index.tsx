import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { ReactNode, memo } from "react";

export interface ButtonProps extends MuiButtonProps {
  label: string | ReactNode;
  isLoading?: boolean;
}

export const Button = memo(
  ({
    variant = "contained",
    isLoading = false,
    label,
    ...rest
  }: ButtonProps) => (
    <MuiButton variant={variant} {...rest}>
      {isLoading ? (
        <CircularProgress
          sx={{
            width: "20px !important",
            height: "20px !important",
            color: "white",
          }}
        />
      ) : (
        label
      )}
    </MuiButton>
  )
);
