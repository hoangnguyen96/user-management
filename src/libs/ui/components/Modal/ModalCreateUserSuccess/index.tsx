import { memo } from "react";
import { Link, Typography } from "@mui/material";

// Routes
import { ROUTES } from "../../../../constants";

// Component
import ModalBase from "../ModalBase";

interface ModalCreateUserSuccessProps {
  isOpen: boolean;
  username: string;
  password: string;
  onClose: () => void;
}

const ModalCreateUserSuccess = ({
  isOpen,
  username,
  password,
  onClose,
}: ModalCreateUserSuccessProps) => (
  <ModalBase title="CREATE USER SUCCESS" isOpen={isOpen} onClose={onClose}>
    <Typography variant="caption">
      You have created User successfully, please login with
      <br />
      username: <Typography variant="subtitle2">{username}</Typography> and
      password: <Typography variant="subtitle2">{password}</Typography>
      <br />
      to login. Please login at here{" "}
    </Typography>
    <Link
      href={ROUTES.LOGIN}
      sx={{
        padding: "10px 0",
        textAlign: "center",
        fontWeight: 600,
        borderRadius: "20px",
        backgroundColor: "white",
        color: "#5932ea",
      }}
    >
      Login!
    </Link>
  </ModalBase>
);

export default memo(ModalCreateUserSuccess);
