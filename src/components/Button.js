// src/components/Button.js
import React from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@shopify/restyle";
import Box from "./Box";
import Text from "./Text";

const Button = ({
  label,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  ...rest
}) => {
  const theme = useTheme();

  // Button variants
  const variants = {
    primary: {
      backgroundColor: "primary",
      textColor: "secondary",
    },
    secondary: {
      backgroundColor: "secondary",
      textColor: "primary",
    },
    outline: {
      backgroundColor: "transparent",
      textColor: "primary",
      borderWidth: 1,
      borderColor: "primary",
    },
  };

  // Button sizes
  const sizes = {
    small: {
      paddingVertical: "s",
      paddingHorizontal: "m",
      fontSize: 14,
    },
    medium: {
      paddingVertical: "m",
      paddingHorizontal: "l",
      fontSize: 16,
    },
    large: {
      paddingVertical: "l",
      paddingHorizontal: "xl",
      fontSize: 18,
    },
  };

  const variantStyle = variants[variant];
  const sizeStyle = sizes[size];

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.8}>
      <Box
        backgroundColor={variantStyle.backgroundColor}
        paddingVertical={sizeStyle.paddingVertical}
        paddingHorizontal={sizeStyle.paddingHorizontal}
        borderRadius="m"
        opacity={disabled ? 0.5 : 1}
        borderWidth={variantStyle.borderWidth || 0}
        borderColor={variantStyle.borderColor || "transparent"}
        {...rest}
      >
        <Text
          color={variantStyle.textColor}
          fontWeight="600"
          textAlign="center"
          fontSize={sizeStyle.fontSize}
        >
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default Button;
