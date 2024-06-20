import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SORT_DATA_CUSTOMERS } from "@app/constants";

const Selection = () => {
  const [value, setValue] = useState(String(SORT_DATA_CUSTOMERS[0].value));

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Short by:</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        IconComponent={KeyboardArrowDownIcon}
        onChange={handleChange}
      >
        {SORT_DATA_CUSTOMERS.map(({ value, name }) => (
          <MenuItem key={`select-item-${value}`} value={value}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const meta: Meta<typeof Selection> = {
  component: Selection,
};

export default meta;
type Story = StoryObj<typeof Selection>;

export const SelectionBase: Story = {
  args: {},
};
