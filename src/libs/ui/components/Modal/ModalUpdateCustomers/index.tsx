import { memo, useCallback } from "react";

// Models
import { UserResponse } from "@app/models";

// Components
import ModalBase from "../ModalBase";
import FormController from "../../FormController";

interface ModalUpdateCustomersProps {
  isOpen: boolean;
  isLoading: boolean;
  itemUpdate: Partial<UserResponse>;
  onClose: () => void;
  onSubmit: (id: string, payload: Partial<UserResponse>) => void;
}

const ModalUpdateCustomers = ({
  isOpen,
  isLoading,
  itemUpdate,
  onClose,
  onSubmit,
}: ModalUpdateCustomersProps) => {
  const { id } = itemUpdate;

  const handleSubmit = useCallback(
    (values: Partial<UserResponse>) => {
      const payload: Partial<UserResponse> = {
        ...values,
        fullName: values.fullName,
        company: values.company,
        phoneNumber: values.phoneNumber,
        email: values.email,
        country: values.country,
      };

      onSubmit(id as string, payload);
    },
    [id, onSubmit]
  );

  return (
    <ModalBase title="UPDATE CUSTOMER" isOpen={isOpen} onClose={onClose}>
      {/* Form Update */}
      <FormController
        itemUpdate={itemUpdate}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </ModalBase>
  );
};

export default memo(ModalUpdateCustomers);
