import { render } from "@testing-library/react";

// Component
import { Input } from "../Input";

describe("Input component", () => {
  it("Should render snapshot correctly", () => {
    expect(render(<Input placeholder="Input..." />)).toMatchSnapshot();
  });
});
