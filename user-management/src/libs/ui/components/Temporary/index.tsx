import { memo } from "react";
import { Box, Divider, Typography } from "@mui/material";

interface TemporaryProps {
  title: string;
}

const Temporary = ({ title }: TemporaryProps) => (
  <Box
    sx={{
      position: "absolute",
      top: "40%",
      textAlign: "center",
      left: { xs: "40%", sm: "45%", lg: "55%" },
    }}
  >
    <Typography variant="h5" mb="10px" textTransform="uppercase">
      Coming soon
    </Typography>
    <Divider orientation="horizontal" flexItem />
    <Typography variant="caption" fontWeight="normal">
      {title}
    </Typography>
  </Box>
);

export default memo(Temporary);
