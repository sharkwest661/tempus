export const getColorFromValue = (theme, colorValue) => {
  // If it's already a theme color key, just return it
  if (typeof colorValue === "string" && colorValue.startsWith("accent")) {
    return colorValue;
  }

  // If it's a hex value, find the corresponding theme key
  const colorEntry = Object.entries(theme.colors).find(
    ([_, value]) => value === colorValue
  );
  if (colorEntry) {
    return colorEntry[0]; // Return the key name
  }

  // Fallback to primary color if not found
  return "primary";
};
