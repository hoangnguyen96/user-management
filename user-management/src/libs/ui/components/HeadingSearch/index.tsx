import { ChangeEvent, Dispatch, SetStateAction, memo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Button, SearchBar } from "../Common";
import { Selection } from "../Selection";

interface HeadingSearchProps {
  textSearch: string;
  title: string;
  subTitle: string;
  list: {
    value: string;
    name: string;
  }[];
  isProduct?: boolean;
  handleOnChangeText?: (e: ChangeEvent<HTMLInputElement>) => void;
  onOpenModalProduct?: () => void;
  setSelectionValue: Dispatch<SetStateAction<string>>;
  setTextSearch: Dispatch<SetStateAction<string>>;
}

const HeadingSearch = ({
  title,
  subTitle,
  textSearch,
  list,
  isProduct = false,
  handleOnChangeText,
  onOpenModalProduct,
  setSelectionValue,
  setTextSearch,
}: HeadingSearchProps) => (
  <Stack
    flexDirection="row"
    alignItems="center"
    justifyContent="space-between"
    p="30px 40px 40px"
  >
    <Box>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="subtitle2" color="#16c098">
        {subTitle}
      </Typography>
    </Box>
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      gap="16px"
    >
      <SearchBar value={textSearch} onChange={handleOnChangeText} />
      <Selection
        list={list}
        setSelectionValue={setSelectionValue}
        setTextSearch={setTextSearch}
      />
      {isProduct && (
        <Button
          data-testid="add-product"
          variant="contained"
          label="Add"
          onClick={onOpenModalProduct}
        />
      )}
    </Stack>
  </Stack>
);

export default memo(HeadingSearch);
