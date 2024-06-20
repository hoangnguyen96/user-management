import { render } from "@testing-library/react";

// Component
import { Select } from "../Select";

describe("Select component", () => {
  it("Should render snapshot correctly", () => {
    expect(render(<Select />)).toMatchSnapshot();
  });
});
