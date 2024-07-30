import React, {
  ChangeEvent,
  lazy,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Divider, Stack, Typography } from "@mui/material";

// Constants
import { OPTIONS } from "@app/constants";

// Api
import {
  useDeleteCustomer,
  useGetCustomerById,
  useUpdateCustomer,
} from "@app/api";

// Models
import { UserResponse } from "@app/models";

// Components
import LoadingIndicator from "../LoadingIndicator";
import HeadingCustomers from "./HeadingCustomers";
import PaginationBase from "../PaginationBase";
import ItemCustomer from "./ItemCustomer";

const ModalActive = lazy(() => import("../Modal/ModalActive"));
const ModalUpdateCustomers = lazy(
  () => import("../Modal/ModalUpdateCustomers")
);
const ModalDeleteCustomers = lazy(
  () => import("../Modal/ModalDeleteCustomers")
);

interface ListItemCustomersProps {
  isLoading: boolean;
  isPending: boolean;
  isAdmin?: boolean;
  error: string;
  listCurrent: UserResponse[];
  listPage: UserResponse[][];
  pagination: number;
  paginationList: UserResponse[];
  refetchList: () => void;
  onChangePagination: (_event: ChangeEvent<unknown>, value: number) => void;
}

const ListItemCustomers = ({
  isLoading,
  isPending,
  isAdmin,
  error,
  listCurrent,
  listPage,
  pagination,
  paginationList,
  refetchList,
  onChangePagination,
}: ListItemCustomersProps) => {
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [modalActive, setModalActive] = useState<{
    isOpenActive: boolean;
    status: boolean;
  }>({
    isOpenActive: false,
    status: false,
  });
  const [idSelected, setIdSelected] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const { refetch: refetchListById, data: customersListDataById } =
    useGetCustomerById(idSelected);

  // Update Customer
  const { isPending: isLoadingUpdate, mutate: mutationUpdate } =
    useUpdateCustomer();

  // Delete Customer
  const { isPending: isLoadingRemove, mutate: mutationRemove } =
    useDeleteCustomer();

  const handleClickMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>, id: string) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
      setIdSelected(id);
    },
    [setAnchorEl, setIdSelected]
  );

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

  const handleCloseModalUpdate = useCallback(() => {
    setIsOpenModalEdit(false);
  }, [setIsOpenModalEdit]);

  const handleCloseModalDelete = useCallback(() => {
    setIsOpenModalDelete(false);
  }, [setIsOpenModalDelete]);

  const handleCloseModalActive = useCallback(() => {
    setModalActive((prev) => ({ ...prev, isOpenActive: false }));
  }, [setModalActive]);

  const handleUpdateSuccess = useCallback(() => {
    setIsOpenModalEdit(false);
    isAdmin ? refetchList() : refetchListById();
  }, [isAdmin, refetchList, refetchListById]);

  const handleUpdateFail = useCallback(() => {
    alert("Update failed");
  }, []);

  const handleDeleteSuccess = useCallback(() => {
    setIsOpenModalDelete(false);
    isAdmin ? refetchList() : refetchListById();
  }, [isAdmin, refetchList, refetchListById]);

  const handleDeleteFail = useCallback(() => {
    alert("Update failed");
  }, []);

  const handleSubmitUpdate = useCallback(
    (id: string, user: Partial<UserResponse>) => {
      mutationUpdate(
        { id: id, payload: user },
        {
          onSuccess: handleUpdateSuccess,
          onError: handleUpdateFail,
        }
      );
    },
    [mutationUpdate]
  );

  const handleSubmitDelete = useCallback(
    (id: string) => {
      mutationRemove(
        { id },
        {
          onSuccess: handleDeleteSuccess,
          onError: handleDeleteFail,
        }
      );
    },
    [mutationRemove]
  );

  const handleUpdateActiveSuccess = useCallback(() => {
    refetchList();
  }, [refetchList]);

  const handleUpdateActiveFailed = () => {
    alert("Active failed");
  };

  const handleToggleActive = useCallback(
    (id: string, status: boolean) => {
      if (id)
        setModalActive((prev) => ({
          ...prev,
          isOpenActive: true,
          status: !status,
        }));
      mutationUpdate(
        { id: id, payload: { status: !status } },
        {
          onSuccess: handleUpdateActiveSuccess,
          onError: handleUpdateActiveFailed,
        }
      );
    },
    [setModalActive, mutationUpdate]
  );

  // Refetch List Customers
  useEffect(() => {
    refetchList();
  }, [refetchList]);

  return (
    <>
      <Stack minHeight="698px">
        <HeadingCustomers />
        <Divider orientation="horizontal" flexItem />
        {isLoading || isPending ? (
          <LoadingIndicator />
        ) : error ? (
          <Typography variant="caption" textAlign="center" mt="auto">
            Data Null
          </Typography>
        ) : (
          listCurrent.map(
            ({
              id,
              fullName,
              company,
              phoneNumber,
              email,
              country,
              status,
            }) => {
              return (
                <ItemCustomer
                  key={`item-customer-${id}`}
                  id={id}
                  isAdmin={isAdmin}
                  fullName={fullName}
                  company={company}
                  phoneNumber={phoneNumber}
                  email={email}
                  country={country}
                  status={status}
                  anchorEl={anchorEl}
                  isOpenMenu={openMenu}
                  onClose={handleClose}
                  onToggleActive={handleToggleActive}
                  onClickMenu={handleClickMenu}
                  onClickOption={handleClickOption}
                />
              );
            }
          )
        )}

        <PaginationBase
          pagination={pagination}
          listPage={listPage}
          paginationList={paginationList}
          onChangePagination={onChangePagination}
        />
      </Stack>

      {/* Modal Update */}
      <ModalUpdateCustomers
        itemUpdate={customersListDataById}
        isOpen={isOpenModalEdit}
        isLoading={isLoadingUpdate}
        onClose={handleCloseModalUpdate}
        onSubmit={handleSubmitUpdate}
      />

      {/* Modal Delete */}
      <ModalDeleteCustomers
        id={idSelected}
        isOpen={isOpenModalDelete}
        isLoading={isLoadingRemove}
        onClose={handleCloseModalDelete}
        onSubmit={handleSubmitDelete}
      />

      {/* Modal Active */}
      <ModalActive
        isOpen={modalActive.isOpenActive}
        status={modalActive.status}
        onClose={handleCloseModalActive}
      />
    </>
  );
};

export default memo(ListItemCustomers);
