import { Link, Typography } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";

// Logo
import logo from "../../../../assets/images/user-manage.svg";

const Logo = () => (
  <Link display="flex" flexDirection="row" alignItems="center" gap="8px">
    <img src={logo} alt="logo-brand" width="37px" height="37px" />
    <Typography variant="h1" display="flex" alignItems="flex-end" gap="4px">
      Dashboard{" "}
      <Typography variant="body2" lineHeight="28px">
        v.01
      </Typography>
    </Typography>
  </Link>
);

const meta: Meta<typeof Logo> = {
  component: Logo,
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const LogoBase: Story = {
  args: {},
};
