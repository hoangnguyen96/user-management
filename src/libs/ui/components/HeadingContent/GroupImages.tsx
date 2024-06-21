import { avatar1, avatar2, avatar3, avatar4, avatar5 } from "@app/ui/images";
import { Avatar, Stack } from "@mui/material";

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
