import { memo } from "react";
import { Stack, Typography } from "@mui/material";

// Components
import ModalBase from "../ModalBase";
import { Button } from "../../Common";

interface ModalDeleteProductProps {
  id: string;
  isOpen: boolean;
  isLoading: boolean;
  userId?: string;
  onClose: () => void;
  onSubmit: (id: string, userId: string) => void;
}

const ModalDeleteProduct = ({
  id,
  userId,
  isOpen,
  isLoading,
  onClose,
  onSubmit,
}: ModalDeleteProductProps) => {
  const handleSubmit = () => {
    onSubmit(id, userId as string);
  };

  return (
    <ModalBase title="DELETE" isOpen={isOpen} onClose={onClose}>
      <Typography variant="caption">
        Are you sure you want to delete it?
      </Typography>
      <Stack flexDirection="row" justifyContent="center" gap="32px" m="20px">
        <Button
          label="Yes"
          variant="contained"
          isLoading={isLoading}
          onClick={handleSubmit}
        />
        <Button label="No" variant="outlined" onClick={onClose} />
      </Stack>
    </ModalBase>
  );
};

export default memo(ModalDeleteProduct);
