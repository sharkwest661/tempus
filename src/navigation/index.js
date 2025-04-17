// src/navigation/index.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "@shopify/restyle";
import { StatusBar } from "react-native";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import useAuthStore from "../stores/authStore";
import { darkTheme } from "../theme/themes";
import { DefaultTheme } from "@react-navigation/native";

const Navigation = () => {
  const theme = useTheme();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Use the default navigation theme structure
  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.cardBackground,
      text: theme.colors.textPrimary,
      border: theme.colors.border,
      notification: theme.colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar
        barStyle={
          theme.colors.background === darkTheme.colors.background
            ? "light-content"
            : "dark-content"
        }
        backgroundColor={theme.colors.background}
      />
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
