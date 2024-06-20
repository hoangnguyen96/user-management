import { createTheme } from "@mui/material/styles";
import { breakpointsBase } from "./breakpoints";
import { colors } from "./colors";
import { typographyBase } from "./typography";

export const themeDefault = createTheme({
  breakpoints: breakpointsBase,
  palette: colors,
  typography: typographyBase,

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            color: "White",
          },
        },
        {
          props: { variant: "activate" },
          style: {
            backgroundColor: "rgba(22, 192, 152, 0.38)",
            color: "#008767",
            border: "1px solid #00b087",
            "&:hover": {
              backgroundColor: "rgba(22, 192, 152, 0.62)",
            },
          },
        },
        {
          props: { variant: "inactivate" },
          style: {
            backgroundColor: "#ffc5c5",
            color: "#df0404",
            border: "1px solid #df0404",
            "&:hover": {
              backgroundColor: "rgb(253 170 170)",
            },
          },
        },
        {
          props: { variant: "normal" },
          style: {
            backgroundColor: " rgba(245, 245, 245, 1)",
            color: "rgba(64, 75, 82, 1)",
            border: "1px solid #eeeeee",
            "&:hover": {
              backgroundColor: "rgb(219 219 219)",
            },
          },
        },
      ],
      defaultProps: {
        size: "medium",
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            fontSize: "14px",
            backgroundColor: theme.palette.common.white,
            "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
              padding: "12px",
            },
            "& fieldset": {
              borderColor: "#b5b7C0",
            },
            "&:hover fieldset": {
              borderColor: theme.palette.primary.main,
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.main,
            },
          },
        }),
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          width: "auto",
          flex: 1,
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9fbff",
          borderRadius: 12,
          minWidth: 154,
          "& .css-wama2x-MuiFormLabel-root-MuiInputLabel-root": {
            position: "unset",
            transform: "unset",
            left: "unset",
            top: "unset",
          },
          "& .css-cb5d54-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root":
            {
              "& fieldset": {
                border: 0,
              },
              borderColor: "transparent",
              borderWidth: 0,
            },
          "& .css-wxw8j3-MuiFormLabel-root-MuiInputLabel-root": {
            position: "unset",
            transform: "unset",
            left: "unset",
            top: "unset",
            flex: 0.8,
            padding: 10,
            paddingRight: 5,
            fontSize: "12px",
            textAlign: "right",
          },
          "& .css-zbhh1g-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
            {
              padding: "11px 32px 11px 0",
              fontSize: "12px",
              fontWeight: 500,
            },
          "& .css-cb5d54-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "transparent",
              borderWidth: 0,
            },
          "& .css-10d36jd-MuiSvgIcon-root-MuiSelect-icon, & .css-5ajf1d-MuiSvgIcon-root-MuiSelect-icon":
            {
              width: 20,
              height: 20,
            },
          "& .css-1j5jes1-MuiFormLabel-root.Mui-focused": {
            color: "rgba(0, 0, 0, 0.6)",
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          "& .css-ddqxy4-MuiButtonBase-root-MuiMenuItem-root": {
            fontSize: "12px",
          },
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.spacing(1),
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
        }),
      },
    },

    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: "transparent",
          fontSize: "14px",
          textDecoration: "none",
          color: theme.palette.primary.contrastText,
          "&:hover": {
            cursor: "pointer",
          },
        }),
      },
    },

    MuiPagination: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiPagination-ul": {
            "& .MuiButtonBase-root.MuiPaginationItem-root": {
              fontSize: "12px",
              fontWeight: 500,
              backgroundColor: "#f5f5f5",
              minWidth: "25px",
              height: "24px",
              margin: "0 5px",
              "&.Mui-selected": {
                backgroundColor: theme.palette.primary.main,
                color: "white",
              },
              "& .MuiSvgIcon-root.MuiPaginationItem-icon": {
                fontSize: "12px",
              },
            },
          },
        }),
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: "100%",
          paddingLeft: 0,
          paddingRight: 0,
          "@media (min-width:600px)": {
            paddingLeft: 0,
            paddingRight: 0,
          },
          "@media (min-width:960px)": {
            paddingLeft: 0,
            paddingRight: 0,
          },
          "@media (min-width:1280px)": {
            paddingLeft: 0,
            paddingRight: 0,
          },
          "@media (min-width:1440px)": {
            maxWidth: "1440px",
          },
        },
      },
    },
  },
});
