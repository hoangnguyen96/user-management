import { memo } from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingIndicator = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      marginTop: "25%",
    }}
  >
    <CircularProgress />
  </Box>
);

export default memo(LoadingIndicator);
