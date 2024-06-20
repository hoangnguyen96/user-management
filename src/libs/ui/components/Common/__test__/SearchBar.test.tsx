import { render } from "@testing-library/react";

// Component
import { SearchBar } from "../SearchBar";

describe("SearchBar component", () => {
  it("Should render snapshot correctly", () => {
    expect(render(<SearchBar />)).toMatchSnapshot();
  });
});
