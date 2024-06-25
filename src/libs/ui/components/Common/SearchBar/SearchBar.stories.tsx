import { Box, Input, Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchIcon } from "../../../icons";

interface SearchBarProps {
  placeholder: string;
  value: string;
}

const SearchBar = ({ placeholder, value }: SearchBarProps) => {
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
        placeholder={placeholder}
        value={value}
        inputProps={{ "aria-label": "search" }}
        sx={{
          backgroundColor: "#f9fbff",
        }}
      />
    </Box>
  );
};

const meta: Meta<typeof SearchBar> = {
  component: SearchBar,
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const SearchBase: Story = {
  args: {
    placeholder: "search...",
    value: "",
  },
};
