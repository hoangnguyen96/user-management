import { renderWithQueryClient } from "@app/ui/test-utils";

// Constants
import { USER_ROLE } from "@app/constants";

// Models
import { UserResponse } from "@app/models";

// Component
import PaginationBase from "..";

const LIST_MOCK: UserResponse[] = [
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
  {
    fullName: "Ronald Richards",
    role: USER_ROLE.CONSUMER,
    company: "Adobe",
    phoneNumber: "(302) 555-0107",
    email: "ronald@adobe.com",
    country: "Israel",
    status: false,
    username: "consumer2",
    password: "123456",
    id: "3",
  },
];

describe("PaginationBase component", () => {
  const props = {
    pagination: 1,
    listPage: [LIST_MOCK] as UserResponse[][],
    paginationList: LIST_MOCK,
    onChangePagination: () => {},
  };

  it("Should render snapshot correctly", () => {
    expect(
      renderWithQueryClient(<PaginationBase {...props} />)
    ).toMatchSnapshot();
  });
});
