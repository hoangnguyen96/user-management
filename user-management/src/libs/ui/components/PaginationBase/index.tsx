import { ChangeEvent, memo } from "react";
import { Pagination, Stack, Typography } from "@mui/material";

// Models
import { Product, UserResponse } from "@app/models";

interface PaginationBaseProps {
  pagination: number;
  listPage: Product[][] | UserResponse[][];
  paginationList: Product[] | UserResponse[];
  onChangePagination: (_event: ChangeEvent<unknown>, value: number) => void;
}

const PaginationBase = ({
  pagination,
  listPage,
  paginationList,
  onChangePagination,
}: PaginationBaseProps) => (
  <Stack
    flexDirection="row"
    p="32px 40px 40px"
    alignItems="center"
    justifyContent="space-between"
    mt="auto"
  >
    <Typography variant="subtitle2">
      Showing data {pagination * 8 + 1} to{" "}
      {Math.min((pagination + 1) * 8, paginationList.length)} of{" "}
      {paginationList.length} entries
    </Typography>
    <Pagination
      data-testid="change-pagination"
      count={listPage.length}
      page={pagination + 1}
      variant="outlined"
      shape="rounded"
      onChange={onChangePagination}
      siblingCount={1}
      boundaryCount={1}
    />
  </Stack>
);

export default memo(PaginationBase);
