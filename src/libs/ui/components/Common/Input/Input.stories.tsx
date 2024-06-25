import type { Meta, StoryObj } from "@storybook/react";
import { Input } from ".";
import { Box } from "@mui/material";

const InputBase = ({ ...rest }) => (
  <Box display="flex">
    <Input {...rest} />
  </Box>
);

const meta: Meta<typeof Input> = {
  component: InputBase,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Input...",
    variant: "outlined",
  },
};

export const Error: Story = {
  args: {
    placeholder: "Input...",
    isInvalid: true,
  },
};
