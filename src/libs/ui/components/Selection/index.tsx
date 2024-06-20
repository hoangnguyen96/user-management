import { Dispatch, SetStateAction, memo, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

// Icon
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface SelectionProps {
  list: {
    value: string;
    name: string;
  }[];
  setTextSearch?: Dispatch<SetStateAction<string>>;
  setSelectionValue?: Dispatch<SetStateAction<string>>;
}

export const Selection = memo(
  ({ list, setSelectionValue, setTextSearch }: SelectionProps) => {
    const [valueSelection, setValueSelection] = useState(list[0].value);

    const handleChange = (event: SelectChangeEvent) => {
      const value = event.target.value;
      setValueSelection(value);
      setTextSearch?.("");
      setSelectionValue?.(value);
    };

    return (
      <FormControl sx={{ width: "190px", maxWidth: "100%" }}>
        <InputLabel id="demo-simple-select-label">Short by:</InputLabel>
        <Select
          data-testid="change-selection"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={valueSelection}
          IconComponent={KeyboardArrowDownIcon}
          onChange={handleChange}
        >
          {list.map(({ value, name }) => (
            <MenuItem key={`select-item-${value}`} value={value}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
);
