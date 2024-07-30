import {
  MenuItem,
  Select as SelectBase,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { themeDefault } from "@app/ui/themes";
import { UserResponse } from "@app/models";

interface SelectProps {
  value: string;
  errorMessage?: string;
  isInvalid?: boolean;
  listUser?: UserResponse[];
  onChange: (event: SelectChangeEvent<string>) => void;
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
    <Stack width="195px" mb={errorMessage ? 0 : "20px"}>
      <SelectBase
        data-testid="select-label-name"
        value={value}
        displayEmpty
        onChange={onChange}
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          border: "unset",
          maxWidth: "100%",
          borderRadius: "12px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor:
              errorMessage || isInvalid
                ? themeDefault().palette.error.main
                : "#b5b7C0",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor:
              errorMessage || isInvalid
                ? themeDefault().palette.error.main
                : themeDefault().palette.primary.main,
          },
          "&:focus .MuiOutlinedInput-notchedOutline": {
            borderColor:
              errorMessage || isInvalid
                ? themeDefault().palette.error.main
                : themeDefault().palette.primary.main,
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
          color={themeDefault().palette.error.main}
        >
          {errorMessage}
        </Typography>
      )}
    </Stack>
  );
};
