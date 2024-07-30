import { Box, Stack, Switch, Typography } from "@mui/material";
import Chart from "react-apexcharts";

// Api
import { useGetListCustomers, useGetListProduct } from "@app/api";

// Utils
import { filterCompany, totalQuantity } from "@app/utils";

// Components
import LoadingIndicator from "@app/ui/components/LoadingIndicator";
import { useThemeContext } from "@app/contexts";

const Dashboard = () => {
  const { isDarkModeGlobal, toggleDarkMode } = useThemeContext();

  const { isLoading: isLoadingCustomers, data: customersListData } =
    useGetListCustomers();
  const { isLoading: isLoadingProduct, data: productListData } =
    useGetListProduct();

  const seriesAll = [customersListData.length, productListData.length];
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

  const amazon = filterCompany(customersListData, "Amazon");
  const facebook = filterCompany(customersListData, "Facebook");
  const yahoo = filterCompany(customersListData, "Yahoo");
  const microsoft = filterCompany(customersListData, "Microsoft");
  const google = filterCompany(customersListData, "Google");
  const alibaba = filterCompany(customersListData, "Alibaba");

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

  const apple = totalQuantity(productListData, "Apple");
  const cafe = totalQuantity(productListData, "Cafe");
  const banana = totalQuantity(productListData, "Banana");
  const onion = totalQuantity(productListData, "Onion");
  const cherry = totalQuantity(productListData, "Cherry");
  const orange = totalQuantity(productListData, "Orange");

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

  return (
    <>
      {isLoadingCustomers || isLoadingProduct ? (
        <LoadingIndicator />
      ) : (
        <>
          <Box
            sx={{
              marginTop: "20px",
              borderRadius: "8px",
              backgroundColor: isDarkModeGlobal ? "black" : "white",
              boxShadow: "1px 1px 2px #cccccc",
              marginBottom: "40px",
              padding: { xs: "24px", md: "32px 20px" },
            }}
          >
            <Stack flexDirection="row" alignItems="center">
              <Typography>Theme</Typography>
              <Switch checked={isDarkModeGlobal} onChange={toggleDarkMode} />
            </Stack>
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
                backgroundColor: isDarkModeGlobal ? "black" : "white",
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
                backgroundColor: isDarkModeGlobal ? "black" : "white",
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
        </>
      )}
    </>
  );
};

export default Dashboard;
