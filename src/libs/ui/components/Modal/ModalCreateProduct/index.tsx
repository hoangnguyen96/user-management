import { memo, useCallback } from "react";

// Models
import { Product,  UserResponse } from "@app/models";

// Components
import ModalBase from "../ModalBase";
import FormProduct from "../../FormProduct";

interface ModalCreateProductProps {
  isOpen: boolean;
  isLoading: boolean;
  isAdmin?: boolean;
  idCustomer?: string;
  itemUpdate: Partial<Product>;
  listUser: UserResponse[];
  onClose: () => void;
  onSubmit: (payload: Partial<Product>) => void;
}

const ModalCreateProduct = ({
  isOpen,
  isLoading,
  isAdmin,
  idCustomer,
  itemUpdate,
  listUser,
  onClose,
  onSubmit,
}: ModalCreateProductProps) => {
  const { id } = itemUpdate;

  const handleSubmit = useCallback(
    (values: Partial<Product>) => {      
      const payload: Partial<Product> = {
        ...values,
        code: `POD00${values.userId || idCustomer}`,
        name: values.name,
        quantity: Number(values.quantity) || 0,
        image: "https://i.ibb.co/vkbZPGr/img10.jpg",
        price:  Number(values.price) || 0,
        userId: values.userId || idCustomer,
      };

      onSubmit(payload);
    },
    [id, onSubmit]
  );

  return (
    <ModalBase title="ADD PRODUCT" isOpen={isOpen} onClose={onClose}>
      {/* Form Update */}
      <FormProduct
        isAdmin={isAdmin}
        listUser={listUser}
        itemUpdate={itemUpdate}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </ModalBase>
  );
};

export default memo(ModalCreateProduct);
