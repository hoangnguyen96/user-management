import { memo } from "react";
import { Typography } from "@mui/material";

// Modal
import ModalBase from "../ModalBase";

interface ModalActiveProps {
  isOpen: boolean;
  status: boolean;
  onClose: () => void;
}

const ModalActive = ({ isOpen, status, onClose }: ModalActiveProps) => (
  <ModalBase
    title={status ? "ACTIVE USER" : "INACTIVE USER"}
    isOpen={isOpen}
    onClose={onClose}
  >
    <Typography variant="caption">
      You have {status ? "active" : "inactive"} successfully, please wait a
      moment!
    </Typography>
  </ModalBase>
);

export default memo(ModalActive);
