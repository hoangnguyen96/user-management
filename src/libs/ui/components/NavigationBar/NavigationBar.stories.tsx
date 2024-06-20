import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  List,
  ListItemButton,
  Stack,
  SvgIcon,
  useMediaQuery,
} from "@mui/material";

// Nav
import { initialNavigation } from ".";

// Themes
import { themeDefault } from "../../themes";

// Icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const NavBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const isLargeScreen = useMediaQuery(themeDefault.breakpoints.up("lg"));

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        maxWidth: "306px",
        width: "100%",
      }}
    >
      {Object.entries(initialNavigation || {}).map(([key, stepDetail]) => {
        const indexKey = Object.keys(initialNavigation).indexOf(key);

        return (
          <ListItemButton
            key={`item-${key}`}
            sx={{
              alignItems: "center",
              justifyContent: isLargeScreen ? "flex-start" : "center",
              backgroundColor: "transparent",
              padding: "11px 8px 11px",
              fontSize: "14px",
              gap: "14px",
              color: themeDefault.palette.primary.contrastText,
            }}
            selected={selectedIndex === indexKey}
            onClick={(event) => handleListItemClick(event, indexKey)}
          >
            <Stack>{stepDetail.icon(selectedIndex === indexKey)}</Stack>
            {isLargeScreen && (
              <>
                <Stack
                  flex={1}
                  color={
                    selectedIndex === indexKey
                      ? themeDefault.palette.common.white
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
                      selectedIndex === indexKey
                        ? themeDefault.palette.common.white
                        : "unset",
                  }}
                />
              </>
            )}
          </ListItemButton>
        );
      })}
    </List>
  );
};

const meta: Meta<typeof NavBar> = {
  component: NavBar,
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Navbar: Story = {
  args: {},
};
