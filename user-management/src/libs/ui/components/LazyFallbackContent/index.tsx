import { memo } from "react";
import { Box, CircularProgress } from "@mui/material";

const LazyFallbackContent = () => (
  <Box sx={{ display: "flex", justifyContent: "center", marginTop: "45vh" }}>
    <CircularProgress />
  </Box>
);

export default memo(LazyFallbackContent);
