import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

// Stores
import { useThemeStore } from "@app/stores";

// Themes
import { themeDefault } from "@app/ui/themes";

const mode = themeDefault().palette.mode === "light";

const ThemeContext = createContext({
  toggleDarkMode: () => {},
  isDarkModeGlobal: mode,
});

const ThemeContextApp = ({ children }: { children: ReactNode }) => {
  const [isDarkModeGlobal, setIsDarkMode] = useThemeStore((state) => [
    state.isDarkMode,
    state.setIsDarkMode,
  ]);

  const [isDark, setIsDark] = useState(isDarkModeGlobal);

  const toggleDarkMode = useCallback(() => {
    setIsDark(!isDark);
    setIsDarkMode(!isDark);
  }, [setIsDarkMode, isDark]);

  const theme = useMemo(
    () => themeDefault(isDark ? "dark" : "light"),
    [isDark]
  );

  return (
    <ThemeContext.Provider value={{ toggleDarkMode, isDarkModeGlobal }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeContextApp;
