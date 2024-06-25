import {
  Box,
  LinearProgress,
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
    <MuiButton variant={variant} sx={{ flexDirection: "column" }} {...rest}>
      {label}
      {isLoading ? (
        <LinearProgress sx={{ width: "100%" }} />
      ) : variant === "contained" ? (
        <Box width="100%" height="4px" />
      ) : (
        <></>
      )}
    </MuiButton>
  )
);
