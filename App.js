// App.js - Main entry point
import React, { useEffect } from "react";
import { StatusBar, Appearance, LogBox, Platform } from "react-native";
import { ThemeProvider } from "@shopify/restyle";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { lightTheme, darkTheme } from "./src/theme/themes";
import Navigation from "./src/navigation";
import useThemeStore from "./src/stores/themeStore";
import * as SplashScreen from "expo-splash-screen";
import i18n from "./src/i18n"; // This would be the i18n setup file

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Ignore specific warnings for development
LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
]);

export default function App() {
  // Correctly selecting theme state following Zustand patterns
  const theme = useThemeStore((state) => state.theme);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const followSystem = useThemeStore((state) => state.followSystem);
  const updateFromSystem = useThemeStore((state) => state.updateFromSystem);

  // Setup system theme change listener
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Only update if the user has chosen to follow system settings
      if (followSystem) {
        updateFromSystem();
      }
    });

    return () => subscription.remove();
  }, [followSystem, updateFromSystem]);

  // Hide splash screen once everything is loaded
  useEffect(() => {
    async function hideSplash() {
      await SplashScreen.hideAsync();
    }

    // In a real app, you'd wait for all resources to load
    setTimeout(hideSplash, 1000);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <StatusBar
            barStyle={isDarkMode ? "light-content" : "dark-content"}
            backgroundColor={theme.colors.background}
            translucent={Platform.OS === "android"}
          />
          <Navigation />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
