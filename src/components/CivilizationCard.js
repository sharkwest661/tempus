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
        return require("../../assets/images/egypt-placeholder.jpg");
      case "greece":
        return require("../../assets/images/greece-placeholder.jpg");
      case "china":
        return require("../../assets/images/china-placeholder.jpg");
      case "persia":
        return require("../../assets/images/persia-placeholder.jpg");
      case "carthage":
        return require("../../assets/images/carthage-placeholder.jpg");
      default:
        return require("../../assets/images/civilization-placeholder.jpg");
    }
  };

  // Get accent color for the civilization
  const getAccentColor = () => {
    return theme.colors[civilization.accentColor] || theme.colors.primary;
  };

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
          backgroundColor="rgba(0,0,0,0.6)"
          justifyContent="flex-end"
          padding="m"
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
              backgroundColor={getAccentColor()}
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
