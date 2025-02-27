// Constants
import { USER_ROLE } from "../../../constants";

export const mockUsers = [
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

export const mockUsersByNameAndEmail = [
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

export const mockUsersByCompany = [
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

export const mockUsersByCountry = [
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
];

export const mockUsersByPhone = [
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

export const mockProducts = [
  {
    name: "Eggs",
    price: 83,
    quantity: 70,
    status: false,
    image: "/src/libs/ui/images/img1.jpg",
    code: "POD1",
    id: "1",
    userId: "1",
  },
  {
    name: "Hamburger",
    price: 32,
    quantity: 69,
    status: false,
    image: "/src/libs/ui/images/img2.jpg",
    code: "POD2",
    id: "2",
    userId: "2",
  },
  {
    name: "Radio",
    price: 82,
    quantity: 66,
    status: true,
    image: "/src/libs/ui/images/img3.jpg",
    code: "POD3",
    id: "3",
    userId: "3",
  },
];

export const mockProductsByName = [
  {
    name: "Eggs",
    price: 83,
    quantity: 70,
    status: false,
    image: "/src/libs/ui/images/img1.jpg",
    code: "POD1",
    id: "1",
    userId: "1",
  },
  {
    name: "Hamburger",
    price: 32,
    quantity: 69,
    status: false,
    image: "/src/libs/ui/images/img2.jpg",
    code: "POD2",
    id: "2",
    userId: "2",
  },
  {
    name: "Radio",
    price: 82,
    quantity: 66,
    status: true,
    image: "/src/libs/ui/images/img3.jpg",
    code: "POD3",
    id: "3",
    userId: "3",
  },
];

export const mockProductsByPrice = [
  {
    name: "Hamburger",
    price: 32,
    quantity: 69,
    status: false,
    image: "/src/libs/ui/images/img2.jpg",
    code: "POD2",
    id: "2",
    userId: "2",
  },
  {
    name: "Radio",
    price: 82,
    quantity: 66,
    status: true,
    image: "/src/libs/ui/images/img3.jpg",
    code: "POD3",
    id: "3",
    userId: "3",
  },
  {
    name: "Eggs",
    price: 83,
    quantity: 70,
    status: false,
    image: "/src/libs/ui/images/img1.jpg",
    code: "POD1",
    id: "1",
    userId: "1",
  },
];

export const mockProductsByQuantity = [
  {
    name: "Radio",
    price: 82,
    quantity: 66,
    status: true,
    image: "/src/libs/ui/images/img3.jpg",
    code: "POD3",
    id: "3",
    userId: "3",
  },
  {
    name: "Hamburger",
    price: 32,
    quantity: 69,
    status: false,
    image: "/src/libs/ui/images/img2.jpg",
    code: "POD2",
    id: "2",
    userId: "2",
  },
  {
    name: "Eggs",
    price: 83,
    quantity: 70,
    status: false,
    image: "/src/libs/ui/images/img1.jpg",
    code: "POD1",
    id: "1",
    userId: "1",
  },
];
