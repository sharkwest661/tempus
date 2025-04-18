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

    primaryTransparent: "rgba(106, 4, 15, 0.3)",
    secondaryTransparent: "rgba(230, 204, 178, 0.3)",
    accentEgyptTransparent: "rgba(2, 62, 138, 0.3)",
    accentGreeceTransparent: "rgba(96, 108, 56, 0.3)",
    accentChinaTransparent: "rgba(174, 32, 18, 0.3)",
    accentPersiaTransparent: "rgba(17, 138, 178, 0.3)",
    errorTransparent: "rgba(207, 17, 36, 0.3)",
    successTransparent: "rgba(10, 102, 64, 0.3)",
    warningTransparent: "rgba(203, 110, 23, 0.3)",
    infoTransparent: "rgba(14, 86, 108, 0.3)",
    textSecondaryTransparent: "rgba(38, 35, 34, 0.2)",
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
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    none: 0,
  },
  fontSizes: {
    small: 12,
    medium: 14,
    large: 16,
    xlarge: 20,
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

    // Adding all transparent variants for dark theme
    primaryTransparent: "rgba(125, 91, 166, 0.3)",
    secondaryTransparent: "rgba(255, 209, 102, 0.3)",
    accentEgyptTransparent: "rgba(140, 95, 247, 0.3)",
    accentGreeceTransparent: "rgba(0, 180, 216, 0.3)",
    accentChinaTransparent: "rgba(255, 92, 138, 0.3)",
    accentPersiaTransparent: "rgba(0, 245, 212, 0.3)",
    errorTransparent: "rgba(255, 128, 128, 0.3)",
    successTransparent: "rgba(87, 217, 163, 0.3)",
    warningTransparent: "rgba(255, 178, 102, 0.3)",
    infoTransparent: "rgba(102, 217, 255, 0.3)",
    textSecondaryTransparent: "rgba(173, 181, 189, 0.2)",
  },
});
