import { memo, MouseEvent, useCallback, useEffect, useState } from "react";
import {
  Box,
  Link,
  ListItemButton,
  Stack,
  SvgIcon,
  useMediaQuery,
} from "@mui/material";

// Constants
import { NAVIGATION_STEP } from "@app/constants";

// Routes
import { ROUTES } from "@app/constants";

// Themes
import { themeDefault } from "../../themes";

// Icons
import {
  HelpIcon,
  IncomeIcon,
  KeyIcon,
  ProductIcon,
  PromoteIcon,
  UserIcon,
} from "../../icons";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useLocation } from "react-router-dom";

interface NavigationItem {
  url: string;
  icon: (isChecked: boolean) => JSX.Element;
  status: boolean;
}

type Navigation = {
  [key in NAVIGATION_STEP]: NavigationItem;
};

export const initialNavigation: Navigation = {
  [NAVIGATION_STEP.DASHBOARD]: {
    url: ROUTES.DASHBOARD,
    icon: (isChecked: boolean) => (
      <KeyIcon {...(isChecked && { color: "white" })} />
    ),
    status: false,
  },
  [NAVIGATION_STEP.PRODUCT]: {
    url: ROUTES.PRODUCT,
    icon: (isChecked: boolean) => (
      <ProductIcon {...(isChecked && { color: "white" })} />
    ),
    status: false,
  },
  [NAVIGATION_STEP.CUSTOMERS]: {
    url: ROUTES.CUSTOMERS,
    icon: (isChecked: boolean) => (
      <UserIcon {...(isChecked && { color: "white" })} />
    ),
    status: false,
  },
  [NAVIGATION_STEP.INCOME]: {
    url: ROUTES.INCOME,
    icon: (isChecked: boolean) => (
      <IncomeIcon {...(isChecked && { color: "white" })} />
    ),
    status: false,
  },
  [NAVIGATION_STEP.PROMOTE]: {
    url: ROUTES.PROMOTE,
    icon: (isChecked: boolean) => (
      <PromoteIcon {...(isChecked && { color: "white" })} />
    ),
    status: false,
  },
  [NAVIGATION_STEP.HELP]: {
    url: ROUTES.HELP,
    icon: (isChecked: boolean) => (
      <HelpIcon {...(isChecked && { color: "white" })} />
    ),
    status: false,
  },
};

interface NavigationBarProps {
  onNavigate?: (path: string) => void;
}

const NavigationBar = ({ onNavigate }: NavigationBarProps) => {
  const [currentStep, setCurrentStep] = useState<string>("");
  const [navigation, setNavigation] = useState(initialNavigation);
  const isLargeScreen = useMediaQuery(themeDefault().breakpoints.up("lg"));
  const location = useLocation();

  const handleListItemClick = useCallback(
    (e: MouseEvent<HTMLDivElement>, value: string) => {
      e.preventDefault();
      onNavigate?.(value);
    },
    [onNavigate]
  );

  // Function to update navigation status
  const updateNavigationStatus = useCallback((path: string) => {
    setNavigation(
      (prev) =>
        Object.fromEntries(
          Object.entries(prev).map(([key, stepDetail]) => [
            key,
            {
              ...stepDetail,
              status: stepDetail.url === path,
            },
          ])
        ) as Navigation
    );
  }, []);

  // Update currentStep and navigation when location changes
  useEffect(() => {
    const path = location.pathname;
    setCurrentStep(path);
    updateNavigationStatus(path);
  }, [location.pathname, updateNavigationStatus]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {Object.entries(navigation || {}).map(([key, stepDetail]) => (
        <ListItemButton
          key={`item-${key}`}
          sx={{ width: "100%", padding: 0 }}
          selected={currentStep === stepDetail.url}
          onClick={(e) => handleListItemClick(e, stepDetail.url)}
        >
          <Link
            key={`item-${key}`}
            href=""
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: isLargeScreen ? "flex-start" : "center",
              padding: "11px 8px 11px",
              gap: "14px",
              borderRadius: themeDefault().spacing(1),
              backgroundColor:
                currentStep === stepDetail.url
                  ? themeDefault().palette.primary.main
                  : "unset",
            }}
          >
            <Stack>{stepDetail.icon(currentStep === stepDetail.url)}</Stack>
            {isLargeScreen && (
              <>
                <Stack
                  flex={1}
                  color={
                    currentStep === stepDetail.url
                      ? themeDefault().palette.common.white
                      : "unset"
                  }
                >
                  {key}
                </Stack>

                <SvgIcon
                  component={ChevronRightIcon}
                  sx={{
                    width: "20px",
                    height: "20px",
                    color:
                      currentStep === stepDetail.url
                        ? themeDefault().palette.common.white
                        : "unset",
                  }}
                />
              </>
            )}
          </Link>
        </ListItemButton>
      ))}
    </Box>
  );
};

export default memo(NavigationBar);
