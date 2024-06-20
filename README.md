# USER MANAGEMENT

User management is an online user management application, helping to check and update information faster,...

Author: Hoang Nguyen Van <[hoang.nguyenvan@asnet.com.vn](hoang.nguyenvan@asnet.com.vn)>

### Design

- [Figma](<https://www.figma.com/design/P3rYwT6ya3rO5q5mBSr5jK/CRM-Dashboard-Customers-List-(Community)?node-id=2-2&t=63COUBsmL9HVwOv5-0>)

### APIs

- API endpoint: [user_management](https://664ab70ba300e8795d42b37c.mockapi.io/api/v1/user)

## HOW TO RUN

#### Prerequisites

1. Make sure you install packages with correct version below:

- [node v20.2.0](https://nodejs.org/en/)
- [pnpm 7.32.3](https://pnpm.io/)

2. Create a `.env` file and add content to with your configuration: `VITE_APP_BASE_API=https://664ab70ba300e8795d42b37c.mockapi.io/api/v1`

3. Install all dependencies packages with command at root:

```
pnpm install
```

4. Run app:

```
pnpm dev
```

Then open [http://localhost:5173/](http://localhost:5173/) to view it in the browser

5. Run Storybook:

```
pnpm run storybook
```

Then open [http://localhost:6006/](http://localhost:6006/) to view it in the browser

6. Run Unit test coverage:

```
pnpm run coverage
```

## TECH STACKS

### Frameworks & Libraries

- [React](https://reactjs.org/): A JavaScript library for building user interfaces

- [MaterialUI](https://mui.com/material-ui/getting-started/): Is an open-source React component library that implements Google's Material Design. It's comprehensive and can be used in production out of the box.

- [react-hook-form](https://react-hook-form.com/): React Hooks for form state management and validation

- [zustand](https://github.com/pmndrs/zustand): A small, fast and scalable bearbones state-management solution using simplified flux principles. Has a comfy API based on hooks

- [react-query](https://tanstack.com/query/latest): Powerful asynchronous state management, server-state utilities and data fetching for the web with zero dependencies

### Developer Tools

- [Vite](https://vitejs.dev/): Vite is a rapid build and development tool for modern JavaScript and TypeScript projects. It is designed to provide a faster and more efficient development experience than traditional tools like Webpack.

- [Typescript](https://www.typescriptlang.org/): TypeScript is an open-source language which builds on JavaScript, one of the world's most used tools, by adding static type definitions.

- [Storybook](https://storybook.js.org/): Storybook is an open source tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.

### Testing

- [Jest](https://jestjs.io/): A new testing framework for end-to-end testing with WebDriver (or others). It abstracts browser interaction to simple steps that are written from a user perspective

- [React Testing Library](https://testing-library.com/): Simple and complete testing utilities that encourage good testing practices. Is a light-weight solution for testing web pages by querying and interacting with DOM nodes.
