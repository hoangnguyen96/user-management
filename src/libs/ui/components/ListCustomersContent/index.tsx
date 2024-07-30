import {
  ChangeEvent,
  memo,
  useCallback,
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
import { useThemeContext } from "@app/contexts";

interface ListCustomersContentProps {
  isAdmin?: boolean;
  id: string;
}

const ListCustomersContent = ({
  isAdmin = false,
  id,
}: ListCustomersContentProps) => {
  const { isDarkModeGlobal } = useThemeContext();
  const [pagination, setPagination] = useState<number>(0);
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

  const sortedAndFilteredCustomers = useMemo(() => {
    let list = customersList;

    if (filterText) {
      list = filterListCustomersByName(list, filterText);
    }

    if (selectionValue !== "fullName") {
      list = sortCustomersList(
        list,
        selectionValue as keyof Omit<UserResponse, "status" | "id">
      );
    }

    return list;
  }, [customersList, filterText, selectionValue]);

  const listPage = useMemo(() => {
    return dividePaginationCustomers(sortedAndFilteredCustomers);
  }, [sortedAndFilteredCustomers]);

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
        backgroundColor: isDarkModeGlobal ? "black" : "white",
        boxShadow: "1px 1px 2px #cccccc",
      }}
    >
      <HeadingSearch
        title="All Customers"
        subTitle="Active Members"
        textSearch={textSearch}
        backgroundColor={isDarkModeGlobal ? "#1a1a1a" : "#f9fbff"}
        list={SORT_DATA_CUSTOMERS}
        handleOnChangeText={handleOnChangeText}
        setSelectionValue={setSelectionValue}
      />

      {/* List */}
      <ListItemCustomers
        isAdmin={isAdmin}
        isLoading={isLoadingListAll || isLoadingListById}
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
