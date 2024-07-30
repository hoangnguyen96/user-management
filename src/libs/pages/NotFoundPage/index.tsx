import { Box, Divider, Typography } from "@mui/material";
import { themeDefault } from "@app/ui/themes";

const NotFoundPage = () => (
  <Box
    sx={{
      position: "absolute",
      top: "40%",
      textAlign: "center",
      left: "50%",
      transform: "translateX(-50%)",
    }}
  >
    <Typography variant="h4" mb="10px" textTransform="uppercase">
      Page Not Found!
    </Typography>
    <Divider orientation="horizontal" flexItem />
    <Typography
      variant="caption"
      fontWeight="normal"
      color={themeDefault().palette.error.main}
    >
      Page not found. Please try again later or contact our team for further
      support.
    </Typography>
  </Box>
);

export default NotFoundPage;
