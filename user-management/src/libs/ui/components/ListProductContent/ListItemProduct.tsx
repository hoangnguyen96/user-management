import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";

// Constants
import { OPTIONS } from "@app/constants";

// Api
import {
  useDeleteProduct,
  useGetProductById,
  useUpdateProduct,
} from "@app/api";

// Models
import { Product } from "@app/models";

// Component
import HeadingProduct from "./HeadingProduct";
import PaginationBase from "../PaginationBase";
import LoadingIndicator from "../LoadingIndicator";
import ModalUpdateProduct from "../Modal/ModalUpdateProduct";
import MenuBar from "../MenuBar";
import ModalDeleteProduct from "../Modal/ModalDeleteProduct";

interface ListItemProductProps {
  isLoading: boolean;
  isPending: boolean;
  isAdmin?: boolean;
  error: string;
  userId?: string;
  listCurrent: Product[];
  listPage: Product[][];
  pagination: number;
  paginationList: Product[];
  refetchList: () => void;
  onChangePagination: (_event: ChangeEvent<unknown>, value: number) => void;
}
const ListItemProduct = ({
  isLoading,
  isPending,
  isAdmin,
  userId,
  error,
  listCurrent,
  listPage,
  pagination,
  paginationList,
  refetchList,
  onChangePagination,
}: ListItemProductProps) => {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [idProduct, setIdProduct] = useState({ id: "", userId });
  const openMenu = Boolean(anchorEl);

  const { refetch: refetchListById, data: productListById } = useGetProductById(
    idProduct.userId as string,
    idProduct.id
  );

  // Update Product
  const { isPending: isLoadingUpdate, mutate: mutationUpdate } =
    useUpdateProduct();

  // Delete Customer
  const { isPending: isLoadingRemove, mutate: mutationRemove } =
    useDeleteProduct();

  const handleCloseModalUpdate = useCallback(() => {
    setIsOpenModalEdit(false);
  }, [setIsOpenModalEdit]);

  const handleCloseModalDelete = useCallback(() => {
    setIsOpenModalDelete(false);
  }, [setIsOpenModalDelete]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleClickOption = useCallback(
    (option: string) => {
      handleClose();
      if (option === OPTIONS[0]) setIsOpenModalEdit(true);
      if (option === OPTIONS[1]) setIsOpenModalDelete(true);
    },
    [handleClose, setIsOpenModalEdit, setIsOpenModalDelete]
  );

  const handleClickMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>, id: string, userId: string) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
      setIdProduct((prev) => ({ ...prev, id, userId }));
    },
    [setAnchorEl, setIdProduct]
  );

  const handleUpdateSuccess = useCallback(() => {
    setIsOpenModalEdit(false);
    refetchList();
  }, [refetchList, setIsOpenModalEdit]);

  const handleUpdateFail = useCallback(() => {
    alert("Update failed");
  }, []);

  const handleSubmitUpdate = (
    id: string,
    userId: string,
    product: Partial<Product>
  ) => {
    mutationUpdate(
      { id, userId, payload: product },
      {
        onSuccess: handleUpdateSuccess,
        onError: handleUpdateFail,
      }
    );
  };

  const handleDeleteSuccess = useCallback(() => {
    setIsOpenModalDelete(false);
    refetchList();
  }, [refetchList]);

  const handleDeleteFail = useCallback(() => {
    alert("Update failed");
  }, []);

  const handleSubmitDelete = useCallback(
    (id: string, userId: string) => {
      mutationRemove(
        { id, userId },
        {
          onSuccess: handleDeleteSuccess,
          onError: handleDeleteFail,
        }
      );
    },
    [mutationRemove]
  );

  useEffect(() => {
    refetchListById();
  }, [idProduct, refetchListById]);

  return (
    <>
      <Stack minHeight="655px">
        <HeadingProduct />
        <Divider orientation="horizontal" flexItem />
        {isLoading || isPending ? (
          <LoadingIndicator />
        ) : error ? (
          <Typography variant="caption" textAlign="center" mt="auto">
            Data Null
          </Typography>
        ) : (
          listCurrent.map(
            ({ id, userId, code, name, price, quantity, image, status }) => (
              <Box key={id} sx={{ width: "100%", p: "0 40px" }}>
                <Stack
                  flexDirection="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  gap="16px"
                  p="12px 0"
                >
                  <Typography
                    variant="caption"
                    width={{ xs: "80px", lg: "140px" }}
                  >
                    {code}
                  </Typography>
                  <Typography
                    variant="caption"
                    width={{ xs: "110px", lg: "170px" }}
                  >
                    {name}
                  </Typography>
                  <Typography
                    variant="caption"
                    width={{ xs: "80px", lg: "140px" }}
                  >
                    ${price}
                  </Typography>
                  <Typography
                    variant="caption"
                    width={{ xs: "60px", lg: "120px" }}
                  >
                    {quantity}
                  </Typography>
                  <Box width={{ xs: "70px", lg: "120px" }} lineHeight={0}>
                    <Avatar
                      src={image}
                      alt={`image-${name}`}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                      }}
                    />
                  </Box>
                  <Typography variant="caption">
                    {status ? "In" : "Out of"} Stock
                  </Typography>

                  <Box sx={{ width: "20px", ml: "auto" }}>
                    <MenuBar
                      open={openMenu}
                      options={OPTIONS}
                      anchorEl={anchorEl}
                      isAdmin={isAdmin}
                      onClose={handleClose}
                      onClick={(e) => handleClickMenu(e, id, userId)}
                      onClickOption={handleClickOption}
                    />
                  </Box>
                </Stack>
                <Divider orientation="horizontal" flexItem />
              </Box>
            )
          )
        )}

        <PaginationBase
          pagination={pagination}
          listPage={listPage}
          paginationList={paginationList}
          onChangePagination={onChangePagination}
        />
      </Stack>

      <ModalUpdateProduct
        itemUpdate={productListById}
        isOpen={isOpenModalEdit}
        isLoading={isLoadingUpdate}
        isAdmin={isAdmin}
        onClose={handleCloseModalUpdate}
        onSubmit={handleSubmitUpdate}
      />

      <ModalDeleteProduct
        id={idProduct.id}
        userId={idProduct.userId}
        isOpen={isOpenModalDelete}
        isLoading={isLoadingRemove}
        onClose={handleCloseModalDelete}
        onSubmit={handleSubmitDelete}
      />
    </>
  );
};

export default memo(ListItemProduct);
