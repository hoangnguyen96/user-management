import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeDefault } from "../src/libs/ui/themes";

// Config
export const withMuiTheme = (Story) => (
  <ThemeProvider theme={themeDefault()}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

export const decorators = [withMuiTheme];
