import "@testing-library/jest-dom";

// Mock import.meta.env
Object.defineProperty(global, "import", {
  value: {
    meta: {
      env: {
        VITE_APP_BASE_API: "https://664ab70ba300e8795d42b37c.mockapi.io/api/v1",
      },
    },
  },
});
