import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";

// Constants
import { SORT_DATA_PRODUCT } from "@app/constants";

// Mock Data
import { LIST_CONTENT_PRODUCT } from "./__mocks__/mock-data";

// Components
import { SearchBar, Button } from "../Common";
import { Selection } from "../Selection";

const ListProductContent = () => {
  const [pagination, setPagination] = useState(1);

  const handleChangePagination = (value: number) => {
    return setPagination(value);
  };

  const handleChangeNextPage = () => {
    if (pagination === 4) return setPagination(4);

    return setPagination((pagination) => pagination + 1);
  };

  const handleChangePrevPage = () => {
    if (pagination === 0) return setPagination(0);

    return setPagination((pagination) => pagination - 1);
  };

  return (
    <Container
      sx={{
        width: "969px",
        borderRadius: "24px",
        backgroundColor: "white",
        boxShadow: "1px 1px 2px #cccccc",
      }}
    >
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
          <SearchBar />
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
        >
          <Typography variant="subtitle2">
            Showing data 1 to 8 of 256K entries
          </Typography>
          <Stack flexDirection="row" gap="12px">
            <Button
              variant="normal"
              label="<"
              sx={{ p: 0, minWidth: "26px", height: "24px", fontSize: "12px" }}
              {...(pagination === 0 ? { disabled: true } : {})}
              onClick={handleChangePrevPage}
            />
            {[1, 2, 3, 4, 5].map((item, index) => (
              <Button
                key={item}
                variant={index === pagination ? "contained" : "normal"}
                label={`${item}`}
                sx={{
                  p: 0,
                  minWidth: "26px",
                  height: "24px",
                  fontSize: "12px",
                }}
                onClick={() => handleChangePagination(index)}
              />
            ))}
            <Button
              variant="normal"
              label=">"
              sx={{ p: 0, minWidth: "26px", height: "24px", fontSize: "12px" }}
              {...(pagination === 4 ? { disabled: true } : {})}
              onClick={handleChangeNextPage}
            />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

const meta: Meta<typeof ListProductContent> = {
  component: ListProductContent,
};

export default meta;
type Story = StoryObj<typeof ListProductContent>;

export const ListProductContentBase: Story = {
  args: {},
};
