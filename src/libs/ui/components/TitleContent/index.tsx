import { memo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { SearchBar } from "../Common/SearchBar";
import { useThemeContext } from "@app/contexts";

interface TitleContentProps {
  name: string;
}

const TitleContent = ({ name }: TitleContentProps) => {
  const { isDarkModeGlobal } = useThemeContext();

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Typography variant="h2" color="black">
          Hello {name},
        </Typography>
      </Box>
      <Box>
        <SearchBar
          backgroundSearch={isDarkModeGlobal ? "black" : "white"}
          value=""
          onChange={() => {}}
        />
      </Box>
    </Stack>
  );
};

export default memo(TitleContent);
