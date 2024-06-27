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
import { ROUTES, SORT_DATA_PRODUCT } from "@app/constants";

// Api
import {
  useCreateProduct,
  useGetListCustomers,
  useGetListProduct,
  useGetListProductOfUser,
} from "@app/api";

// Models
import { Product } from "@app/models";

// Utils
import {
  filterListProductByName,
  dividePaginationProduct,
  sortProductList,
} from "@app/utils";

// Components
import HeadingSearch from "../HeadingSearch";
import ListItemProduct from "./ListItemProduct";
import { useMatch } from "react-router-dom";
import ModalCreateProduct from "../Modal/ModalCreateProduct";

interface ListProductContentProps {
  isAdmin?: boolean;
  id: string;
}

const ListProductContent = ({
  isAdmin = false,
  id,
}: ListProductContentProps) => {
  const [isOpenModalCreateProduct, setIsOpenModalCreateProduct] =
    useState<boolean>(false);
  const [pagination, setPagination] = useState<number>(0);
  const [listPage, setListPage] = useState<Product[][]>([]);
  const [textSearch, setTextSearch] = useState<string>("");
  const [filterText, setFilterText] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [selectionValue, setSelectionValue] = useState(
    SORT_DATA_PRODUCT[0].value
  );

  const isMatchProduct = !!useMatch(ROUTES.PRODUCT);

  const {
    isLoading: isLoadingListAll,
    refetch: refetchListAll,
    data: productListData,
    errorMessage: errorGetList,
  } = useGetListProduct();

  const {
    isLoading: isLoadingListOfUser,
    refetch: refetchListOfUser,
    data: productListOfUser,
    errorMessage: errorGetListOfUser,
  } = useGetListProductOfUser(id);

  const { data: listUser } = useGetListCustomers();

  const { isPending: isLoadingCreate, mutate: createProduct } =
    useCreateProduct();

  const productList = useMemo(() => {
    if (!isAdmin) {
      return productListOfUser;
    }

    return errorGetList || productListData.length <= 0 ? [] : productListData;
  }, [isAdmin, productListData, productListOfUser]);

  // Search Bar
  useEffect(() => {
    if (!isLoadingListAll) {
      if (filterText) {
        const listByName = filterListProductByName(productList, filterText);
        const filteredList = dividePaginationProduct(listByName);
        setListPage(filteredList);
      } else {
        const list = dividePaginationProduct(productList);
        setListPage(list);
      }
    }
  }, [filterText]);

  // Selection Bar
  useEffect(() => {
    if (!isLoadingListAll) {
      const sortedProductList = sortProductList(productList, selectionValue);
      if (sortedProductList.length > 0) {
        const list = dividePaginationProduct(sortedProductList);
        setListPage(list);
      }
    }
  }, [selectionValue]);

  // Reset list
  useEffect(() => {
    const listAll = dividePaginationProduct(productList);
    setListPage(listAll);
  }, [isLoadingListAll, isLoadingListOfUser]);

  const handleChangePagination = useCallback(
    (_event: ChangeEvent<unknown>, value: number) => {
      setPagination(value - 1);
    },
    []
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

  const handleOpenModalCreateProduct = useCallback(() => {
    setIsOpenModalCreateProduct(true);
  }, [setIsOpenModalCreateProduct]);

  const handleCloseModalCreateProduct = useCallback(() => {
    setIsOpenModalCreateProduct(false);
  }, [setIsOpenModalCreateProduct]);

  const handleCreateProductSuccess = useCallback(() => {
    setIsOpenModalCreateProduct(false);
    refetchListAll();
  }, [refetchListAll, setIsOpenModalCreateProduct]);

  const handleCreateProductFailed = useCallback(
    () => alert("Create Product failed!"),
    []
  );

  const handleCreateProduct = useCallback((payload: Partial<Product>) => {
    createProduct(payload, {
      onSuccess: handleCreateProductSuccess,
      onError: handleCreateProductFailed,
    });
  }, []);

  const currentPageData = listPage[pagination] || [];

  return (
    <>
      <Box
        sx={{
          borderRadius: "24px",
          backgroundColor: "white",
          boxShadow: "1px 1px 2px #cccccc",
        }}
      >
        <HeadingSearch
          title="All Product"
          subTitle="Active Product"
          isProduct={isMatchProduct}
          textSearch={textSearch}
          list={SORT_DATA_PRODUCT}
          handleOnChangeText={handleOnChangeText}
          onOpenModalProduct={handleOpenModalCreateProduct}
          setSelectionValue={setSelectionValue}
          setTextSearch={setTextSearch}
        />

        {/* List */}
        <ListItemProduct
          isAdmin={isAdmin}
          isLoading={isLoadingListAll}
          isPending={isPending}
          userId={id}
          listCurrent={currentPageData}
          listPage={listPage}
          error={errorGetList || errorGetListOfUser}
          pagination={pagination}
          paginationList={productList}
          refetchList={refetchListAll || refetchListOfUser}
          onChangePagination={handleChangePagination}
        />
      </Box>

      <ModalCreateProduct
        isLoading={isLoadingCreate}
        isAdmin={isAdmin}
        listUser={listUser}
        isOpen={isOpenModalCreateProduct}
        idCustomer={id}
        itemUpdate={{}}
        onClose={handleCloseModalCreateProduct}
        onSubmit={handleCreateProduct}
      />
    </>
  );
};

export default memo(ListProductContent);
