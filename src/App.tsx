import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";

// Constants
import { PUBLIC_ROUTE } from "./routes/public-routes";
import { ROUTES } from "@app/constants";

// Routes
import RouteAuthenticated from "./routes/RouteAuthenticated";
import { DASHBOARD_ROUTE } from "./routes/dashboard-routes";

// Themes
import { themeDefault } from "./libs/ui/themes";

// Components
import { BaseLayout } from "@app/ui/layouts";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const LazyFallbackContent = lazy(
  () => import("@app/ui/components/LazyFallbackContent")
);

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={themeDefault}>
          <CssBaseline />
          <>
            <Routes>
              <Route>
                <Route
                  path={ROUTES.LANDING_PAGE}
                  element={
                    <Suspense fallback={<LazyFallbackContent />}>
                      <LandingPage />
                    </Suspense>
                  }
                />
              </Route>
              <Route>
                {PUBLIC_ROUTE.map(({ path, Component }) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <Suspense fallback={<LazyFallbackContent />}>
                        <Component />
                      </Suspense>
                    }
                  />
                ))}
              </Route>
              <Route element={<RouteAuthenticated />}>
                <Route element={<BaseLayout />}>
                  {DASHBOARD_ROUTE.map(({ path, Component }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <Suspense fallback={<LazyFallbackContent />}>
                          <Component />
                        </Suspense>
                      }
                    />
                  ))}
                </Route>
              </Route>
            </Routes>
          </>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
