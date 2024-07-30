import { PaletteMode } from "@mui/material";

export const colors = (mode?: PaletteMode) => ({
  primary: {
    main: "#5932ea",
    contrastText: "#9197b3",
  },
  secondary: {
    main: "#fafbff",
  },
  error: {
    main: "#df0404",
  },
  mode: mode,
});
