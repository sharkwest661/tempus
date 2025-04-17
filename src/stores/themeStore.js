// src/stores/themeStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme } from "../theme/themes";
import { Appearance } from "react-native";

// Get initial system color scheme
const systemColorScheme = Appearance.getColorScheme();
const initialIsDarkMode = systemColorScheme === "dark";

const useThemeStore = create(
  persist(
    (set) => ({
      theme: initialIsDarkMode ? darkTheme : lightTheme,
      isDarkMode: initialIsDarkMode,
      followSystem: true,

      // Toggle between light and dark mode
      toggleTheme: () =>
        set((state) => ({
          theme: state.isDarkMode ? lightTheme : darkTheme,
          isDarkMode: !state.isDarkMode,
          followSystem: false,
        })),

      // Set specific theme mode
      setThemeMode: (isDark) =>
        set(() => ({
          theme: isDark ? darkTheme : lightTheme,
          isDarkMode: isDark,
          followSystem: false,
        })),

      // Toggle following system setting
      toggleFollowSystem: () =>
        set((state) => {
          const systemIsDark = Appearance.getColorScheme() === "dark";
          return {
            followSystem: !state.followSystem,
            theme: !state.followSystem
              ? systemIsDark
                ? darkTheme
                : lightTheme
              : state.theme,
            isDarkMode: !state.followSystem ? systemIsDark : state.isDarkMode,
          };
        }),

      // Update theme based on system changes (called when system theme changes)
      updateFromSystem: () =>
        set((state) => {
          if (!state.followSystem) return state;
          const systemIsDark = Appearance.getColorScheme() === "dark";
          return {
            theme: systemIsDark ? darkTheme : lightTheme,
            isDarkMode: systemIsDark,
          };
        }),
    }),
    {
      name: "tempus-tours-theme",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        followSystem: state.followSystem,
      }),
    }
  )
);

export default useThemeStore;
