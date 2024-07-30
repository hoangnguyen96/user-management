import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { persist } from "zustand/middleware";

// Constants
import { LOCAL_STORAGE } from "@app/constants";

interface Theme {
  isDarkMode: boolean;
}

interface ThemeDarkMode extends Theme {
  setIsDarkMode: (isDarkMode: boolean) => void;
  clearTheme: () => void;
}

const INITIAL_THEME_STATE: Theme = {
  isDarkMode: false,
};

export const useThemeStore = createWithEqualityFn<ThemeDarkMode>()(
  persist(
    (set) => ({
      ...INITIAL_THEME_STATE,

      setIsDarkMode: (isDarkMode) => {
        set({ isDarkMode });
      },

      clearTheme: () => {
        set({
          ...INITIAL_THEME_STATE,
        });
      },
    }),
    { name: LOCAL_STORAGE.THEME }
  ),
  shallow
);
