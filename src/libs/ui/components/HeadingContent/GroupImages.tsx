import { Avatar, Stack } from "@mui/material";

const imgData = [
  {
    img: "/src/libs/ui/images/avatar1.png",
    title: "Breakfast",
  },
  {
    img: "/src/libs/ui/images/avatar2.png",
    title: "Burger",
  },
  {
    img: "/src/libs/ui/images/avatar3.png",
    title: "Camera",
  },
  {
    img: "/src/libs/ui/images/avatar4.png",
    title: "Coffee",
  },
  {
    img: "/src/libs/ui/images/avatar5.png",
    title: "Hats",
  },
];

const GroupImage = () => (
  <Stack direction="row">
    {imgData.map(({ title, img: imageItem }, index) => (
      <Avatar
        key={title}
        alt={title}
        src={imageItem}
        sx={{
          ml: index === 0 ? 0 : "-12px",
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          border: "2px solid #ffffff",
        }}
      />
    ))}
  </Stack>
);

export default GroupImage;
