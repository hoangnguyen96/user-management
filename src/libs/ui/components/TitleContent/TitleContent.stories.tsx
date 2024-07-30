import { Meta, StoryObj } from "@storybook/react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { SearchBar } from "../Common/SearchBar";

export const TitleContent = () => (
  <Container sx={{ width: "969px" }}>
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Typography variant="h2">Hello Enova,</Typography>
      </Box>
      <Box>
        <SearchBar value="" onChange={() => {}} />
      </Box>
    </Stack>
  </Container>
);

const meta: Meta<typeof TitleContent> = {
  component: TitleContent,
};

export default meta;
type Story = StoryObj<typeof TitleContent>;

export const SearchBase: Story = {
  args: {},
};
