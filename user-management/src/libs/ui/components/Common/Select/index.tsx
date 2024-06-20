import {
  MenuItem,
  Select as SelectBase,
  Stack,
  Typography,
} from "@mui/material";
import { themeDefault } from "@app/ui/themes";
import { UserResponse } from "@app/models";

interface SelectProps {
  value?: string;
  errorMessage?: string;
  isInvalid?: boolean;
  listUser?: UserResponse[];
  onChange?: (event: any) => void;
}

export const Select = ({
  value,
  errorMessage,
  isInvalid,
  listUser,
  onChange,
  ...rest
}: SelectProps) => {
  return (
    <Stack width="200px" mb={errorMessage ? 0 : "20px"}>
      <SelectBase
        value={value}
        displayEmpty
        onChange={onChange}
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          border: "unset",
          maxWidth: "200px",
          borderRadius: "12px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor:
              errorMessage || isInvalid
                ? themeDefault.palette.error.main
                : "#b5b7C0",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor:
              errorMessage || isInvalid
                ? themeDefault.palette.error.main
                : themeDefault.palette.primary.main,
          },
          "&:focus .MuiOutlinedInput-notchedOutline": {
            borderColor:
              errorMessage || isInvalid
                ? themeDefault.palette.error.main
                : themeDefault.palette.primary.main,
          },
        }}
        {...rest}
      >
        {listUser?.map(({ id, fullName }) => (
          <MenuItem key={id} value={id}>
            {fullName}
          </MenuItem>
        ))}
      </SelectBase>
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
};
