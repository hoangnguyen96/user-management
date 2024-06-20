import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Activate: Story = {
  args: {
    label: "Button",
    variant: "activate",
  },
};

export const Contained: Story = {
  args: {
    label: "Button",
    variant: "contained",
  },
};

export const Inactivate: Story = {
  args: {
    label: "Button",
    variant: "inactivate",
  },
};

export const Normal: Story = {
  args: {
    label: "Button",
    variant: "normal",
  },
};

export const Outlined: Story = {
  args: {
    label: "Button",
    variant: "outlined",
  },
};

export const Text: Story = {
  args: {
    label: "Button",
    variant: "text",
  },
};
