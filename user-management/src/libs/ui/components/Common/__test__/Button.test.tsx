import { render } from "@testing-library/react";

// Component
import { Button } from "../Button";

describe("Button component", () => {
  it("Should render snapshot correctly", () => {
    expect(render(<Button label="Button" />)).toMatchSnapshot();
  });
});
