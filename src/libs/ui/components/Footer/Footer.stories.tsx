import { Avatar, Box, Link, Stack, SvgIcon, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Meta, StoryObj } from "@storybook/react";
import { avatar1 } from "@app/ui/images";

const Footer = () => (
  <Box width="306px">
    <Box
      sx={{
        marginBottom: "45px",
        padding: "26px 24px 22px",
        borderRadius: "20px",
        backgroundImage: "linear-gradient(to right, #eaabf0 , #5932ea)",
      }}
    >
      <Typography
        fontSize="14px"
        fontWeight={600}
        color="white"
        textAlign="center"
        marginBottom="20px"
      >
        Upgrade to PRO to get access all Features!
      </Typography>
      <Link
        href="#"
        sx={{
          display: "block",
          padding: "10px 0",
          textAlign: "center",
          fontWeight: 600,
          borderRadius: "20px",
          backgroundColor: "white",
          color: "#5932ea",
        }}
      >
        Get Pro Now!
      </Link>
    </Box>
    <Stack
      flexDirection="row"
      justifyContent="flex-start"
      gap="12px"
      alignItems="center"
      sx={{ cursor: "pointer" }}
    >
      <Avatar
        src={avatar1}
        alt="user-management"
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
        }}
      />

      <Stack flex={1}>
        <Typography fontSize="14px" fontWeight={400}>
          Evano
        </Typography>
        <Typography fontSize="12px" fontWeight={400} color="#757575">
          Project Manager
        </Typography>
      </Stack>

      <SvgIcon component={KeyboardArrowDownIcon} sx={{ color: "#757575" }} />
    </Stack>
  </Box>
);

const meta: Meta<typeof Footer> = {
  component: Footer,
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const FooterBase: Story = {
  args: {},
};
