import { memo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { SearchBar } from "../Common/SearchBar";

interface TitleContentProps {
  name: string;
}

const TitleContent = ({ name }: TitleContentProps) => (
  <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
    <Box>
      <Typography variant="h2">Hello {name},</Typography>
    </Box>
    <Box>
      <SearchBar backgroundSearch="white" />
    </Box>
  </Stack>
);

export default memo(TitleContent);
