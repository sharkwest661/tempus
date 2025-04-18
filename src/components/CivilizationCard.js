// src/components/CivilizationCard.js
import React from "react";
import { Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import Box from "./Box";
import Text from "./Text";
import Card from "./Card";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.7;

const CivilizationCard = ({ civilization, onPress, style }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Determine image placeholder
  const getImageSource = () => {
    // In a real app, you would use actual images here
    switch (civilization.id) {
      case "egypt":
        return require("../../assets/images/egypt-placeholder.png");
      case "greece":
        return require("../../assets/images/greece-placeholder.png");
      case "china":
        return require("../../assets/images/china-placeholder.png");
      case "persia":
        return require("../../assets/images/persia-placeholder.png");
      case "carthage":
        return require("../../assets/images/carthage-placeholder.png");
      default:
        return require("../../assets/images/civilization-placeholder.png");
    }
  };

  // Get accent color key for the civilization
  const getAccentColorKey = () => {
    if (!civilization.accentColor) return "primary";

    // Make sure the key exists in theme.colors
    return theme.colors[civilization.accentColor]
      ? civilization.accentColor
      : "primary";
  };

  const accentColorKey = getAccentColorKey();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card
        width={CARD_WIDTH}
        height={200}
        marginRight="m"
        overflow="hidden"
        style={style}
      >
        {/* Background Image */}
        <Image
          source={getImageSource()}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
          resizeMode="cover"
        />

        {/* Gradient Overlay */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          height="60%"
          justifyContent="flex-end"
          padding="m"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <Text variant="subheader" color="secondary" marginBottom="xs">
            {t(`civilizations.${civilization.id}.name`) || civilization.name}
          </Text>

          <Text variant="caption" color="background" numberOfLines={2}>
            {t(`civilizations.${civilization.id}.description`) ||
              civilization.description}
          </Text>

          <Box flexDirection="row" marginTop="s">
            <Box
              backgroundColor={accentColorKey}
              paddingHorizontal="s"
              paddingVertical="xs"
              borderRadius="s"
            >
              <Text color="background" fontSize={12}>
                {t(`civilizations.${civilization.id}.regions`) ||
                  civilization.regions.join(", ")}
              </Text>
            </Box>
          </Box>
        </Box>
      </Card>
    </TouchableOpacity>
  );
};

export default CivilizationCard;
