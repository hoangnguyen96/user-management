import { ReactNode, memo } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

// Icons
import CloseIcon from "@mui/icons-material/Close";

// Components
import { Button } from "../../Common";

interface ModalBaseProps {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

const ModalBase = ({ title, isOpen, children, onClose }: ModalBaseProps) => (
  <Dialog
    data-testid="close-modal"
    open={isOpen}
    onClose={onClose}
    sx={{ p: "0 20px 40px", textAlign: "center" }}
  >
    <DialogTitle textAlign="center">{title}</DialogTitle>
    <Button
      label={<CloseIcon />}
      variant="outlined"
      sx={{
        p: 0,
        position: "absolute",
        top: "10px",
        right: "10px",
        minWidth: "25px",
        border: "none",
        borderRadius: "50%",
      }}
      onClick={onClose}
    />
    <DialogContent>{children}</DialogContent>
  </Dialog>
);

export default memo(ModalBase);
