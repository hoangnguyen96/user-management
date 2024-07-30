import type { Meta, StoryObj } from "@storybook/react";
import {
  Box,
  Container,
  Divider,
  ImageList,
  ImageListItem,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

// Icons
import { Members, Screen, TotalCustomers } from "../../icons";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { avatar1, avatar2, avatar3, avatar4, avatar5 } from "../../images";

const imgData = [
  {
    img: avatar1,
    title: "Breakfast",
  },
  {
    img: avatar2,
    title: "Burger",
  },
  {
    img: avatar3,
    title: "Camera",
  },
  {
    img: avatar4,
    title: "Coffee",
  },
  {
    img: avatar5,
    title: "Hats",
  },
];

const LIST_HEADING_CONTENT = [
  {
    id: 1,
    icon: <SvgIcon component={TotalCustomers} />,
    title: "Total Customers",
    quantity: "5,423",
    description: (
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap="2px"
      >
        <SvgIcon component={ArrowUpwardIcon} sx={{ color: "#00ac4f" }} />
        <Typography fontSize="12px">
          <Typography variant="caption" color="#00ac4f" fontWeight="bold">
            16%{" "}
          </Typography>
          this month
        </Typography>
      </Stack>
    ),
  },
  {
    id: 2,
    icon: <SvgIcon component={Members} />,
    title: "Members",
    quantity: "1,893",
    description: (
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap="2px"
      >
        <SvgIcon component={ArrowDownwardIcon} sx={{ color: "#d0004b" }} />
        <Typography fontSize="12px">
          <Typography variant="caption" color="#d0004b" fontWeight="bold">
            1%{" "}
          </Typography>
          this month
        </Typography>
      </Stack>
    ),
  },
  {
    id: 3,
    icon: <SvgIcon component={Screen} />,
    title: "Active Now",
    quantity: "189",
    description: (
      <ImageList sx={{ display: "flex", margin: 0 }}>
        {imgData.map(({ title, img }, index) => (
          <ImageListItem key={title} sx={{ ml: index === 0 ? 0 : "-15px" }}>
            <img
              srcSet={`${img}?w=26&h=26 2x`}
              src={`${img}?w=26&h=26`}
              alt={title}
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                border: "2px solid #ffffff",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    ),
  },
];

export const Heading = () => (
  <Container sx={{ width: "969px" }}>
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        borderRadius: "24px",
        marginTop: "40px",
        marginBottom: "40px",
        padding: "32px 60px",
        boxShadow: "1px 1px 2px #ccc",
      }}
    >
      {LIST_HEADING_CONTENT.map(
        ({ id, icon, title, quantity, description }, index) => (
          <Box key={id}>
            <Stack flexDirection="row" gap="20px" alignItems="center">
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  width: "84px",
                  height: "84px",
                  backgroundImage:
                    "linear-gradient(to right, #d3ffe7 , #effff6)",
                }}
              >
                {icon}
              </Stack>
              <Stack gap="3px">
                <Typography variant="subtitle2">{title}</Typography>
                <Typography variant="h3">{quantity}</Typography>
                {description}
              </Stack>
            </Stack>

            {index !== LIST_HEADING_CONTENT.length - 1 && (
              <Divider orientation="vertical" flexItem />
            )}
          </Box>
        )
      )}
    </Stack>
  </Container>
);

const meta: Meta<typeof Heading> = {
  component: Heading,
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const HeadingBase: Story = {
  args: {},
};
