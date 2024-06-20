import { memo } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";

// Constants
import { OPTIONS } from "@app/constants";

// Components
import { Button } from "../Common";
import MenuBar from "../MenuBar";

interface ItemCustomerProps {
  id: string;
  fullName: string;
  company: string;
  phoneNumber: string;
  email: string;
  country: string;
  status: boolean;
  isAdmin?: boolean;
  isOpenMenu: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onToggleActive: (id: string, status: boolean) => void;
  onClickOption: (option: string) => void;
  onClickMenu: (event: React.MouseEvent<HTMLElement>, id: string) => void;
}

const ItemCustomer = ({
  id,
  fullName,
  company,
  phoneNumber,
  email,
  country,
  status,
  isAdmin,
  anchorEl,
  isOpenMenu,
  onClose,
  onToggleActive,
  onClickOption,
  onClickMenu,
}: ItemCustomerProps) => (
  <Box sx={{ width: "100%", p: "0 40px" }}>
    <Stack
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      gap="16px"
      p="20px 0"
    >
      <Typography
        variant="caption"
        width="150px"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {fullName}
      </Typography>
      <Typography
        variant="caption"
        width="100px"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {company}
      </Typography>
      <Typography variant="caption" width="140px">
        {phoneNumber}
      </Typography>
      <Typography
        variant="caption"
        width="190px"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {email}
      </Typography>
      <Typography
        variant="caption"
        width="110px"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {country}
      </Typography>
      <Button
        data-testid="button-toggle"
        variant={status ? "activate" : "inactivate"}
        label={status ? "Active" : "Inactive"}
        sx={{
          width: "80px",
          height: "29px",
          p: 0,
        }}
        onClick={() => onToggleActive(id, status)}
      />
      <MenuBar
        open={isOpenMenu}
        options={OPTIONS}
        anchorEl={anchorEl}
        isAdmin={isAdmin}
        onClose={onClose}
        onClick={(e) => onClickMenu(e, id)}
        onClickOption={onClickOption}
      />
    </Stack>
    <Divider orientation="horizontal" flexItem />
  </Box>
);

export default memo(ItemCustomer);
