import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Constants
import { PUBLIC_ROUTE } from "./routes/public-routes";
import { DELAY_TIME_API, ROUTES, STALE_TIME_API } from "@app/constants";

// Routes
import RouteAuthenticated from "./routes/RouteAuthenticated";
import { DASHBOARD_ROUTE } from "./routes/dashboard-routes";

// Contexts
import ThemeContextApp from "./libs/Contexts";

// Components
import { BaseLayout } from "@app/ui/layouts";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const LazyFallbackContent = lazy(
  () => import("@app/ui/components/LazyFallbackContent")
);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME_API,
        retry: DELAY_TIME_API,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeContextApp>
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
        </ThemeContextApp>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
