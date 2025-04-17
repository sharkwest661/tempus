// src/theme/themes.js
import { createTheme } from "@shopify/restyle";

export const lightTheme = createTheme({
  colors: {
    primary: "#6A040F",
    secondary: "#E6CCB2",
    background: "#F7F3E3",
    cardBackground: "#FFFFFF",
    textPrimary: "#262322",
    textSecondary: "rgba(38, 35, 34, 0.7)",
    accentEgypt: "#023E8A",
    accentGreece: "#606C38",
    accentChina: "#AE2012",
    accentPersia: "#118AB2",
    border: "rgba(106, 4, 15, 0.2)",
    error: "#CF1124",
    success: "#0A6640",
    warning: "#CB6E17",
    info: "#0E566C",
    transparent: "transparent",
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 64,
  },
  borderRadii: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    none: 0,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    defaults: {
      fontSize: 16,
      color: "textPrimary",
    },
    header: {
      fontWeight: "bold",
      fontSize: 24,
      color: "textPrimary",
    },
    subheader: {
      fontSize: 20,
      fontWeight: "600",
      color: "textPrimary",
    },
    body: {
      fontSize: 16,
      color: "textPrimary",
    },
    caption: {
      fontSize: 14,
      color: "textSecondary",
    },
    button: {
      fontSize: 16,
      fontWeight: "600",
      color: "secondary",
    },
  },
  // Define other theme elements like shadows, animations, etc.
});

export const darkTheme = createTheme({
  ...lightTheme,
  colors: {
    primary: "#7D5BA6",
    secondary: "#FFD166",
    background: "#121212",
    cardBackground: "#1E1E1E",
    textPrimary: "#F8F9FA",
    textSecondary: "#ADB5BD",
    accentEgypt: "#8C5FF7",
    accentGreece: "#00B4D8",
    accentChina: "#FF5C8A",
    accentPersia: "#00F5D4",
    border: "rgba(125, 91, 166, 0.3)",
    error: "#FF8080",
    success: "#57D9A3",
    warning: "#FFB266",
    info: "#66D9FF",
    transparent: "transparent",
  },
});
