import { PropsWithChildren, ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { RenderOptions, render } from "@testing-library/react";

// ThemeProvider
import { ThemeProvider } from "@mui/material";

// Config
import { themeDefault } from "./themes";

const AllTheProviders = ({ children }: PropsWithChildren) => {
  return <ThemeProvider theme={themeDefault()}>{children}</ThemeProvider>;
};

export const wrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <ThemeProvider theme={themeDefault()}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const customRenderWithQueryClient = (
  ui: ReactElement,
  options?: RenderOptions
) => render(ui, { wrapper, ...options });

export const WrapperRouter = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

export { customRender as render };
export { customRenderWithQueryClient as renderWithQueryClient };
