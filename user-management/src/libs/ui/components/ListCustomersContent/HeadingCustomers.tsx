import { memo } from "react";
import { Stack, Typography } from "@mui/material";

const HeadingCustomers = () => (
  <Stack
    flexDirection="row"
    justifyContent="flex-start"
    p="0 40px 14px"
    gap="16px"
  >
    <Typography variant="subtitle2" width="150px">
      Customer Name
    </Typography>
    <Typography variant="subtitle2" width="100px">
      Company
    </Typography>
    <Typography variant="subtitle2" width="140px">
      Phone Number
    </Typography>
    <Typography variant="subtitle2" width="190px">
      Email
    </Typography>
    <Typography variant="subtitle2" width="110px">
      Country
    </Typography>
    <Typography variant="subtitle2" ml="12px">
      Status
    </Typography>
  </Stack>
);

export default memo(HeadingCustomers);
