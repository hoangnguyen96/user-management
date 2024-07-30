import { memo } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { useThemeContext } from "@app/contexts";

interface TemporaryProps {
  title: string;
}

const Temporary = ({ title }: TemporaryProps) => {
  const { isDarkModeGlobal } = useThemeContext();

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "24px",
        boxShadow: "1px 1px 2px #cccccc",
        backgroundColor: isDarkModeGlobal ? "black" : "white",
      }}
    >
      <Typography variant="h5" mb="10px" textTransform="uppercase">
        Coming soon
      </Typography>
      <Divider orientation="horizontal" flexItem />
      <Typography variant="caption" fontWeight="normal">
        {title}
      </Typography>
    </Stack>
  );
};
export default memo(Temporary);
