import { memo } from "react";
import { Stack, Typography } from "@mui/material";

const HeadingProduct = () => (
  <Stack
    flexDirection="row"
    justifyContent="flex-start"
    p="0 40px 14px"
    gap="16px"
  >
    <Typography variant="subtitle2" width={{ xs: "80px", lg: "140px" }}>
      Product Code
    </Typography>
    <Typography variant="subtitle2" width={{ xs: "110px", lg: "170px" }}>
      Name
    </Typography>
    <Typography variant="subtitle2" width={{ xs: "80px", lg: "140px" }}>
      Price
    </Typography>
    <Typography variant="subtitle2" width={{ xs: "60px", lg: "120px" }}>
      Quantity
    </Typography>
    <Typography variant="subtitle2" width={{ xs: "70px", lg: "120px" }}>
      Image
    </Typography>
    <Typography variant="subtitle2" ml="12px">
      Status
    </Typography>
  </Stack>
);

export default memo(HeadingProduct);
