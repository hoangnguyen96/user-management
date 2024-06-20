import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";

// Constants
import { SORT_DATA_CUSTOMERS } from "@app/constants";

// Mock Data
import { LIST_CONTENT } from "./__mocks__/mock-data";

// Components
import { SearchBar, Button } from "../Common";
import { Selection } from "../Selection";

const ListCustomersContent = () => {
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
          <Typography variant="h4">All Customers</Typography>
          <Typography variant="subtitle2" color="#16c098">
            Active Members
          </Typography>
        </Box>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="16px"
        >
          <SearchBar />
          <Selection list={SORT_DATA_CUSTOMERS} />
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
          <Typography variant="subtitle2" width="150px">
            Customer Name
          </Typography>
          <Typography variant="subtitle2" width="100px">
            Company
          </Typography>
          <Typography variant="subtitle2" width="150px">
            Phone Number
          </Typography>
          <Typography variant="subtitle2" width="190px">
            Email
          </Typography>
          <Typography variant="subtitle2" width="110px">
            Country
          </Typography>
          <Typography variant="subtitle2" ml="12px">
            Status
          </Typography>
        </Stack>
        <Divider orientation="horizontal" flexItem />

        {LIST_CONTENT.map(
          ({ fullName, company, phoneNumber, email, country, status }) => (
            <Box key={company} sx={{ width: "100%", p: "0 40px" }}>
              <Stack
                flexDirection="row"
                justifyContent="flex-start"
                gap="16px"
                p="20px 0"
              >
                <Typography variant="caption" width="150px">
                  {fullName}
                </Typography>
                <Typography variant="caption" width="100px">
                  {company}
                </Typography>
                <Typography variant="caption" width="150px">
                  {phoneNumber}
                </Typography>
                <Typography variant="caption" width="190px">
                  {email}
                </Typography>
                <Typography variant="caption" width="110px">
                  {country}
                </Typography>
                {status ? (
                  <Button
                    variant="activate"
                    label="Active"
                    sx={{
                      width: "80px",
                      height: "29px",
                      p: 0,
                    }}
                  />
                ) : (
                  <Button
                    variant="inactivate"
                    label="Inactive"
                    sx={{
                      width: "80px",
                      height: "29px",
                      p: 0,
                    }}
                  />
                )}
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

const meta: Meta<typeof ListCustomersContent> = {
  component: ListCustomersContent,
};

export default meta;
type Story = StoryObj<typeof ListCustomersContent>;

export const ListCustomersBaseContent: Story = {
  args: {},
};
