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
  backgroundColor?: string;
  handleOnChangeText: (e: ChangeEvent<HTMLInputElement>) => void;
  onOpenModalProduct?: () => void;
  setSelectionValue: Dispatch<SetStateAction<string>>;
}

const HeadingSearch = ({
  title,
  subTitle,
  textSearch,
  list,
  backgroundColor,
  isProduct = false,
  handleOnChangeText,
  onOpenModalProduct,
  setSelectionValue,
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
      <SearchBar
        value={textSearch}
        backgroundSearch={backgroundColor}
        onChange={handleOnChangeText}
      />
      <Selection
        list={list}
        backgroundColor={backgroundColor}
        setSelectionValue={setSelectionValue}
      />
      {isProduct && (
        <Button
          data-testid="modal-add-product"
          variant="contained"
          label="Add"
          onClick={onOpenModalProduct}
        />
      )}
    </Stack>
  </Stack>
);

export default memo(HeadingSearch);
