import { ChangeEvent, memo } from "react";
import { Box, Input, Stack } from "@mui/material";

// Icons
import { SearchIcon } from "../../../icons";

interface SearchBarProps {
  backgroundSearch?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = memo(
  ({
    backgroundSearch = "#f9fbff",
    value,
    onChange,
    ...props
  }: SearchBarProps) => {
    return (
      <Box position="relative">
        <Stack
          position="absolute"
          height="100%"
          justifyContent="center"
          alignItems="center"
          padding="0 8px"
          zIndex={10}
        >
          <SearchIcon />
        </Stack>
        <Input
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={value}
          onChange={onChange}
          sx={{
            padding: "8px 8px 8px 40px",
            fontSize: "14px",
            borderRadius: "12px",
            backgroundColor: backgroundSearch,
            "::after": {
              display: "none",
            },
            "::before": {
              display: "none",
            },
          }}
          {...props}
        />
      </Box>
    );
  }
);
