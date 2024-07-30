import type { Meta, StoryObj } from "@storybook/react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Chart from "react-apexcharts";

// Utils
import { filterCompany, totalQuantity } from "@app/utils";
import { LIST_CUSTOMERS, LIST_PRODUCT } from "./__mocks__";

const seriesAll = [LIST_CUSTOMERS.length, LIST_PRODUCT.length];
const optionsAll = {
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          fontSize: "22px",
        },
        value: {
          fontSize: "16px",
        },
        total: {
          show: true,
          label: "Total",
          formatter: function () {
            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
            return seriesAll.reduce((a, b) => a + b, 0).toString();
          },
        },
      },
    },
  },
  labels: ["Customers", "Products"],
  colors: ["#5932ea", "#16c098"],
};

const amazon = filterCompany(LIST_CUSTOMERS, "Amazon");
const facebook = filterCompany(LIST_CUSTOMERS, "Facebook");
const yahoo = filterCompany(LIST_CUSTOMERS, "Yahoo");
const microsoft = filterCompany(LIST_CUSTOMERS, "Microsoft");
const google = filterCompany(LIST_CUSTOMERS, "Google");
const alibaba = filterCompany(LIST_CUSTOMERS, "Alibaba");

const seriesCustomers = [
  {
    name: "People",
    data: [facebook, amazon, yahoo, microsoft, google, alibaba],
  },
];

const optionsCustomers = {
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      "Facebook",
      "Amazon",
      "Yahoo",
      "Microsoft",
      "Google",
      "Alibaba",
    ],
  },
  colors: ["#5932ea"],
};

const apple = totalQuantity(LIST_PRODUCT, "Apple");
const cafe = totalQuantity(LIST_PRODUCT, "Cafe");
const banana = totalQuantity(LIST_PRODUCT, "Banana");
const onion = totalQuantity(LIST_PRODUCT, "Onion");
const cherry = totalQuantity(LIST_PRODUCT, "Cherry");
const orange = totalQuantity(LIST_PRODUCT, "Orange");

const seriesProducts = [
  {
    name: "Quantity",
    data: [apple, cafe, banana, onion, cherry, orange],
  },
];

const optionsProducts = {
  yaxis: {
    stepSize: 20,
  },
  xaxis: {
    categories: ["Apple", "Cafe", "Banana", "Onion", "Cherry", "Orange"],
  },
  colors: ["#5932ea", "#5932ea", "#5932ea", "#5932ea", "#5932ea", "#5932ea"],
};

const Dashboard = () => (
  <Container sx={{ width: "969px" }}>
    <Box
      sx={{
        marginTop: "20px",
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: "1px 1px 2px #cccccc",
        marginBottom: "40px",
        padding: { xs: "24px", md: "32px 20px" },
      }}
    >
      <Typography>Overview of product quantity</Typography>
      <Chart
        options={optionsProducts}
        series={seriesProducts}
        type="line"
        width="100%"
      />
    </Box>

    <Stack flexDirection="row" gap="20px">
      <Box
        flex={1}
        sx={{
          width: "50%",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "1px 1px 2px #cccccc",
          padding: { xs: "24px", md: "32px 20px" },
        }}
      >
        <Typography ml="10px">Overview of all</Typography>
        <Chart
          options={optionsAll}
          series={seriesAll}
          type="radialBar"
          width="100%"
          height="auto"
        />
      </Box>
      <Box
        flex={1}
        sx={{
          width: "50%",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "1px 1px 2px #cccccc",
          padding: { xs: "24px", md: "32px 20px" },
        }}
      >
        <Typography ml="10px">
          Total number of customers of the company
        </Typography>
        <Chart
          options={optionsCustomers}
          series={seriesCustomers}
          type="bar"
          width="100%"
        />
      </Box>
    </Stack>
  </Container>
);

const meta: Meta<typeof Dashboard> = {
  component: Dashboard,
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

export const DashboardBase: Story = {
  args: {},
};
