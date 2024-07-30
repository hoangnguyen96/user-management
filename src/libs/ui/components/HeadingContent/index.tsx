import { memo } from "react";
import {
  Box,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";

// Icons
import { Members, Screen, TotalCustomers } from "../../icons";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { themeDefault } from "../../themes";
import GroupImages from "./GroupImages";
import { useThemeContext } from "@app/contexts";

const HeadingContent = () => {
  const isSmallScreen = useMediaQuery(themeDefault().breakpoints.down("lg"));
  const { isDarkModeGlobal } = useThemeContext();

  const LIST_HEADING_CONTENT = [
    {
      id: 1,
      icon: (
        <SvgIcon
          component={TotalCustomers}
          {...(isSmallScreen && { width: "26px" })}
        />
      ),
      title: "Total Customers",
      quantity: "5,423",
      description: (
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          gap={themeDefault().spacing(0.25)}
        >
          <SvgIcon component={ArrowUpwardIcon} sx={{ color: "#00ac4f" }} />
          <Typography fontSize="12px">
            <Typography variant="caption" color="#00ac4f" fontWeight="bold">
              16%{" "}
            </Typography>
            this month
          </Typography>
        </Stack>
      ),
    },
    {
      id: 2,
      icon: (
        <SvgIcon
          component={Members}
          {...(isSmallScreen && { width: "26px" })}
        />
      ),
      title: "Members",
      quantity: "1,893",
      description: (
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          gap={themeDefault().spacing(0.25)}
        >
          <SvgIcon component={ArrowDownwardIcon} sx={{ color: "#d0004b" }} />
          <Typography fontSize="12px">
            <Typography variant="caption" color="#d0004b" fontWeight="bold">
              1%{" "}
            </Typography>
            this month
          </Typography>
        </Stack>
      ),
    },
    {
      id: 3,
      icon: (
        <SvgIcon component={Screen} {...(isSmallScreen && { width: "26px" })} />
      ),
      title: "Active Now",
      quantity: "189",
      description: <GroupImages />,
    },
  ];

  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: isDarkModeGlobal ? "black" : "white",
        borderRadius: "24px",
        marginTop: "40px",
        marginBottom: "40px",
        boxShadow: "1px 1px 2px #cccccc",
        padding: { xs: "24px", md: "32px 60px" },
      }}
    >
      {LIST_HEADING_CONTENT.map(
        ({ id, icon, title, quantity, description }, index) => (
          <Box key={id}>
            <Stack
              flexDirection="row"
              gap={themeDefault().spacing(2.5)}
              alignItems="center"
            >
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  width: { xs: "60px", md: "84px" },
                  height: { xs: "60px", md: "84px" },
                  backgroundImage:
                    "linear-gradient(to right, #d3ffe7 , #effff6)",
                }}
              >
                {icon}
              </Stack>
              <Stack gap={themeDefault().spacing(0.25)}>
                <Typography variant="subtitle2">{title}</Typography>
                <Typography variant="h3">{quantity}</Typography>
                {description}
              </Stack>
            </Stack>

            {index !== LIST_HEADING_CONTENT.length - 1 && (
              <Divider orientation="vertical" flexItem />
            )}
          </Box>
        )
      )}
    </Stack>
  );
};

export default memo(HeadingContent);
