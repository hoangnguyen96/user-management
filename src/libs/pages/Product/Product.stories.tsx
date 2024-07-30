import { ChangeEvent, useCallback, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Container,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

// Constants
import { SORT_DATA_PRODUCT } from "@app/constants";

// Components
import { SearchBar } from "@app/ui/components";
import { Selection } from "@app/ui/components/Selection";
import { LIST_CONTENT_PRODUCT } from "@app/ui/components/ListProductContent/__mocks__/mock-data";
import { TitleContent } from "@app/ui/components/TitleContent/TitleContent.stories";
import { Heading } from "@app/ui/components/HeadingContent/HeadingContent.stories";

const CustomersPage = () => {
  const [pagination, setPagination] = useState(0);

  const handleChangePagination = useCallback(
    (_event: ChangeEvent<unknown>, value: number) => {
      setPagination(value - 1);
    },
    [setPagination]
  );

  return (
    <Container sx={{ width: "969px" }}>
      <TitleContent />
      <Heading />
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        p="30px 40px 40px"
      >
        <Box>
          <Typography variant="h4">All Product</Typography>
          <Typography variant="subtitle2" color="#16c098">
            Active Product
          </Typography>
        </Box>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="16px"
        >
          <SearchBar value="" onChange={() => {}} />
          <Selection list={SORT_DATA_PRODUCT} />
        </Stack>
      </Stack>

      {/* List */}
      <Stack>
        <Stack
          flexDirection="row"
          justifyContent="flex-start"
          p="0 40px 14px"
          gap="16px"
        >
          <Typography variant="subtitle2" width="140px">
            Product Code
          </Typography>
          <Typography variant="subtitle2" width="170px">
            Name
          </Typography>
          <Typography variant="subtitle2" width="140px">
            Price
          </Typography>
          <Typography variant="subtitle2" width="120px">
            Quantity
          </Typography>
          <Typography variant="subtitle2" width="120px">
            Image
          </Typography>
          <Typography variant="subtitle2" ml="12px">
            Status
          </Typography>
        </Stack>
        <Divider orientation="horizontal" flexItem />

        {LIST_CONTENT_PRODUCT.map(
          ({ code, name, price, quantity, image, status }) => (
            <Box key={code} sx={{ width: "100%", p: "0 40px" }}>
              <Stack
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                gap="16px"
                p="12px 0"
              >
                <Typography variant="caption" width="140px">
                  {code}
                </Typography>
                <Typography variant="caption" width="170px">
                  {name}
                </Typography>
                <Typography variant="caption" width="140px">
                  ${price}
                </Typography>
                <Typography variant="caption" width="120px">
                  {quantity}
                </Typography>
                <Box width={{ xs: "70px", lg: "120px" }} lineHeight={0}>
                  <img
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
              </Stack>
              <Divider orientation="horizontal" flexItem />
            </Box>
          )
        )}

        <Stack
          flexDirection="row"
          p="32px 40px 40px"
          alignItems="center"
          justifyContent="space-between"
          mt="auto"
        >
          <Typography variant="subtitle2">
            Showing data 1 to 8 of 256K entries
          </Typography>
          <Pagination
            count={5}
            page={pagination + 1}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePagination}
            siblingCount={1}
            boundaryCount={1}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

const meta: Meta<typeof CustomersPage> = {
  component: CustomersPage,
};

export default meta;
type Story = StoryObj<typeof CustomersPage>;

export const CustomersPageBase: Story = {
  args: {},
};
