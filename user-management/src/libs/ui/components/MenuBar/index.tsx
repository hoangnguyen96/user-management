import { MutableRefObject, memo, useRef } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";

// Hooks
import { useOnClickOutside } from "../../../hooks";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface MenuBarProps {
  isAdmin?: boolean;
  open: boolean;
  options: string[];
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onClickOption: (option: string) => void;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const MenuBar = ({
  open,
  isAdmin,
  options,
  anchorEl,
  onClose,
  onClick,
  onClickOption,
}: MenuBarProps) => {
  const menuRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  // Handle click out side
  useOnClickOutside(menuRef, onClose);

  return (
    <Box position="relative" ref={menuRef}>
      <IconButton
        data-testid="button-more-menu"
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        sx={{ p: 0 }}
        onClick={onClick}
      >
        <MoreVertIcon sx={{ fontSize: "20px" }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiBackdrop-root.MuiModal-backdrop": {
            position: "absolute",
            top: "unset",
            right: "unset",
            bottom: "unset",
            left: "unset",
            backgroundColor: "blue",
          },
          "& .MuiPopover-paper.MuiMenu-paper": {
            boxShadow: "1px 1px 2px #cccccc",
          },
        }}
      >
        {options
          .filter((option) => isAdmin || option !== "Delete")
          .map((option) => (
            <MenuItem
              data-testid="option-menu"
              key={option}
              onClick={() => onClickOption(option)}
            >
              {option}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
};

export default memo(MenuBar);
