import { memo, useCallback } from "react";

// Models
import { Product, ProductInit } from "@app/models";

// Components
import ModalBase from "../ModalBase";
import FormProduct from "../../FormProduct";

interface ModalUpdateProductProps {
  isOpen: boolean;
  isLoading: boolean;
  isAdmin?: boolean;
  itemUpdate: Partial<Product>;
  onClose: () => void;
  onSubmit: (id: string, userId: string, payload: Partial<Product>) => void;
}

const ModalUpdateProduct = ({
  isOpen,
  isAdmin,
  isLoading,
  itemUpdate,
  onClose,
  onSubmit,
}: ModalUpdateProductProps) => {
  const { id, userId } = itemUpdate;

  const handleSubmit = useCallback(
    (values: Partial<ProductInit>) => {
      const payload: Partial<Product> = {
        ...values,
        name: values.name,
        price: parseInt(values.price || "0"),
        quantity: parseInt(values.quantity || "0"),
      };

      onSubmit(id as string, userId as string, payload);
    },
    [onSubmit]
  );

  return (
    <ModalBase title="UPDATE PRODUCT" isOpen={isOpen} onClose={onClose}>
      {/* Form */}
      <FormProduct
        itemUpdate={itemUpdate}
        isAdmin={isAdmin}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </ModalBase>
  );
};

export default memo(ModalUpdateProduct);
