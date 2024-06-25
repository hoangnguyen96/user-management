import { MouseEvent, memo, useCallback, useState } from "react";
import {
  Avatar,
  Box,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";

// Stores
import { useAuthStore } from "@app/stores";

// Hooks
import { useAuth } from "@app/hooks";

// Components
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Logout } from "@mui/icons-material";
import { themeDefault } from "../../themes";
import { avatar1 } from "@app/ui/images";

const Footer = () => {
  const isLargeScreen = useMediaQuery(themeDefault.breakpoints.up("lg"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Auth
  const user = useAuthStore((state) => state.user);
  const { handleLogout } = useAuth();

  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleLogoutApp = useCallback(() => {
    handleLogout();
    handleClose();
  }, []);

  return (
    <Box>
      {isLargeScreen && (
        <Box
          sx={{
            marginBottom: "45px",
            padding: "26px 24px 22px",
            borderRadius: "20px",
            backgroundImage: "linear-gradient(to right, #eaabf0 , #5932ea)",
          }}
        >
          <Typography
            fontSize="14px"
            fontWeight={600}
            color="white"
            textAlign="center"
            marginBottom="20px"
          >
            Upgrade to PRO to get access all Features!
          </Typography>
          <Link
            href="#"
            sx={{
              display: "block",
              padding: "10px 0",
              textAlign: "center",
              fontWeight: 600,
              borderRadius: "20px",
              backgroundColor: "white",
              color: "#5932ea",
            }}
          >
            Get Pro Now!
          </Link>
        </Box>
      )}
      <Stack
        flexDirection="row"
        justifyContent="flex-start"
        gap="12px"
        alignItems="center"
        sx={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        <Avatar
          src={avatar1}
          alt="user-management"
          sx={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
          }}
        />
        {isLargeScreen && (
          <>
            <Stack flex={1}>
              <Typography fontSize="14px" fontWeight={400}>
                {user.fullName}
              </Typography>
              <Typography fontSize="12px" fontWeight={400} color="#757575">
                {user.company}
              </Typography>
            </Stack>
            <SvgIcon
              component={KeyboardArrowDownIcon}
              sx={{ color: "#757575" }}
            />
          </>
        )}
      </Stack>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: isLargeScreen ? "245px" : "50px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleLogoutApp}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {isLargeScreen ? (
            <Typography variant="caption">Logout</Typography>
          ) : (
            <></>
          )}
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default memo(Footer);
