import type { Meta, StoryObj } from "@storybook/react";
import { Container, Divider, Stack, Typography } from "@mui/material";
import { Button } from "@app/ui/components";

const LandingPage = () => (
  <Container sx={{ width: "969px" }}>
    <Stack justifyContent="center" alignItems="center" height="90vh">
      <Typography
        variant="h1"
        lineHeight="70px"
        textTransform="uppercase"
        fontSize={{ xs: "60px", sm: "75px" }}
      >
        Welcome!
      </Typography>
      <Typography
        fontSize="12px"
        mb="16px"
        letterSpacing={{ xs: "2px", sm: "4px" }}
      >
        This user management application
      </Typography>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ width: "30%", margin: "0 auto" }}
      />
      <Stack flexDirection="row" mt="20px" gap="16px">
        <Button onClick={() => {}} variant="outlined" label="Login" />
        <Button onClick={() => {}} variant="outlined" label="SignUp" />
      </Stack>
    </Stack>
  </Container>
);

const meta: Meta<typeof LandingPage> = {
  component: LandingPage,
};

export default meta;
type Story = StoryObj<typeof LandingPage>;

export const LandingPageBase: Story = {
  args: {},
};
