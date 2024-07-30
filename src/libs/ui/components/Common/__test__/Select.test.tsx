import { fireEvent, render } from "@testing-library/react";

// Constants
import { USER_ROLE } from "@app/constants";

// Models
import { UserResponse } from "@app/models";

// Component
import { Select } from "../Select";

const mockUserList: UserResponse[] = [
  {
    fullName: "Jane Cooper",
    role: USER_ROLE.ADMIN,
    company: "Microsoft",
    phoneNumber: "(225) 555-0118",
    email: "jane@microsoft.com",
    country: "United States",
    status: true,
    username: "admin",
    password: "123456",
    id: "1",
  },
  {
    fullName: "Floyd Miles",
    role: USER_ROLE.CONSUMER,
    company: "Yahoo",
    phoneNumber: "(205) 555-0100",
    email: "floyd@yahoo.com",
    country: "Kiribati",
    status: false,
    username: "consumer1",
    password: "123456",
    id: "2",
  },
];

describe("Select component", () => {
  const handleChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render snapshot correctly", () => {
    expect(
      render(<Select value="" onChange={handleChange} />)
    ).toMatchSnapshot();
  });

  it("Should does not call onChange when no option is selected", () => {
    const { getByRole } = render(
      <Select value="" listUser={mockUserList} onChange={handleChange} />
    );

    // Open the dropdown
    fireEvent.mouseDown(getByRole("combobox")); // Change to getByRole('combobox')

    // Simulate closing the dropdown without selecting an option
    fireEvent.keyDown(document.activeElement || document.body, {
      key: "Escape",
    });

    expect(handleChange).not.toHaveBeenCalled();
  });
});
