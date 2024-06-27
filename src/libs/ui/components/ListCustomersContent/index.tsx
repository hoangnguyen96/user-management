import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { Box } from "@mui/material";

// Constants
import { SORT_DATA_CUSTOMERS } from "@app/constants";

// Apis
import { useGetCustomerById, useGetListCustomers } from "@app/api";

// Models
import { UserResponse } from "@app/models";

// Utils
import {
  dividePaginationCustomers,
  filterListCustomersByName,
  sortCustomersList,
} from "@app/utils";

// Components
import ListItemCustomers from "./ListItemCustomers";
import HeadingSearch from "../HeadingSearch";

interface ListCustomersContentProps {
  isAdmin?: boolean;
  id: string;
}

const ListCustomersContent = ({
  isAdmin = false,
  id,
}: ListCustomersContentProps) => {
  const [pagination, setPagination] = useState<number>(0);
  const [listPage, setListPage] = useState<UserResponse[][]>([]);
  const [textSearch, setTextSearch] = useState<string>("");
  const [filterText, setFilterText] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [selectionValue, setSelectionValue] = useState(
    SORT_DATA_CUSTOMERS[0].value
  );

  const {
    isLoading: isLoadingListAll,
    refetch: refetchList,
    data: customersListData,
    errorMessage: errorGetList,
  } = useGetListCustomers();

  const { isLoading: isLoadingListById, data: customersListDataById } =
    useGetCustomerById(id);

  const customersList = useMemo(() => {
    if (!isAdmin) {
      return [customersListDataById] || [];
    }

    return errorGetList || customersListData.length <= 0
      ? []
      : customersListData;
  }, [isAdmin, customersListData, customersListDataById]);

  // Search Bar
  useEffect(() => {
    if (filterText) {
      const listByName = filterListCustomersByName(customersList, filterText);
      const list = dividePaginationCustomers(listByName);

      return setListPage(list);
    }

    const listAll = dividePaginationCustomers(customersList);
    return setListPage(listAll);
  }, [filterText]);

  // Selection Bar
  useEffect(() => {
    if (selectionValue !== "default") {
      const sortedCustomersList = sortCustomersList(
        customersList,
        selectionValue
      );

      const list = dividePaginationCustomers(sortedCustomersList);
      return setListPage(list);
    }

    const listAll = dividePaginationCustomers(customersList);
    return setListPage(listAll);
  }, [selectionValue]);

  // Reset List all
  useEffect(() => {
    const listAll = dividePaginationCustomers(customersList);
    setListPage(listAll);
  }, [isLoadingListAll, isLoadingListById, customersList]);

  const handleChangePagination = useCallback(
    (_event: ChangeEvent<unknown>, value: number) => {
      setPagination(value - 1);
    },
    [setPagination]
  );

  const handleOnChangeText = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTextSearch(e.target.value);

      startTransition(() => {
        setFilterText(e.target.value);
      });
    },
    [setFilterText, startTransition]
  );

  const currentPageData = listPage[pagination] || [];

  return (
    <Box
      sx={{
        borderRadius: "24px",
        backgroundColor: "white",
        boxShadow: "1px 1px 2px #cccccc",
      }}
    >
      <HeadingSearch
        title="All Customers"
        subTitle="Active Members"
        textSearch={textSearch}
        list={SORT_DATA_CUSTOMERS}
        handleOnChangeText={handleOnChangeText}
        setSelectionValue={setSelectionValue}
        setTextSearch={setTextSearch}
      />

      {/* List */}
      <ListItemCustomers
        isAdmin={isAdmin}
        isLoading={isLoadingListAll}
        isPending={isPending}
        listCurrent={currentPageData}
        listPage={listPage}
        error={errorGetList}
        pagination={pagination}
        paginationList={customersList}
        refetchList={refetchList}
        onChangePagination={handleChangePagination}
      />
    </Box>
  );
};

export default memo(ListCustomersContent);
