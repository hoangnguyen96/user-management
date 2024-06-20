import { ButtonPropsVariantOverrides } from "@mui/material";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    activate: true;
    inactivate: true;
    normal: true;
  }
}
