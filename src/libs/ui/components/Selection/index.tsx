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
  backgroundColor?: string;
  setSelectionValue?: Dispatch<SetStateAction<string>>;
}

export const Selection = memo(
  ({ list, backgroundColor, setSelectionValue }: SelectionProps) => {
    const [valueSelection, setValueSelection] = useState(list[0].value);

    const handleChange = (event: SelectChangeEvent) => {
      const value = event.target.value;
      const selectedIndex = list.findIndex((item) => item.value === value);

      setValueSelection(list[selectedIndex].value);
      setSelectionValue?.(list[selectedIndex].value);
    };

    return (
      <FormControl
        sx={{
          width: "190px",
          maxWidth: "100%",
          backgroundColor: backgroundColor,
        }}
      >
        <InputLabel id="demo-simple-select-label" variant="standard">
          Short by:
        </InputLabel>
        <Select
          data-testid="change-selection"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          sx={{
            "& fieldset": {
              border: "none",
            },
          }}
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
