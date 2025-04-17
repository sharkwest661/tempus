// src/components/TourCard.js
import React from "react";
import { Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { Heart } from "lucide-react-native";
import Box from "./Box";
import Text from "./Text";
import Card from "./Card";
import useFavoritesStore from "../stores/favoritesStore";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.75;

const TourCard = ({ tour, onPress, style, size = "large" }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Get favorite state using Zustand pattern
  const isFavorite = useFavoritesStore((state) => state.isFavorite(tour.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  // Determine image placeholder based on civilization
  const getImageSource = () => {
    // In a real app, you would use actual images here
    // For now we use placeholder images based on the tour's civilization
    switch (tour.civilizationId) {
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
        return require("../../assets/images/tour-placeholder.jpg");
    }
  };

  // Card size variants
  const cardSizes = {
    large: {
      width: CARD_WIDTH,
      imageHeight: 160,
    },
    medium: {
      width: width * 0.6,
      imageHeight: 140,
    },
    small: {
      width: width * 0.4,
      imageHeight: 120,
    },
  };

  const sizeStyle = cardSizes[size] || cardSizes.large;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card
        width={sizeStyle.width}
        marginRight="m"
        overflow="hidden"
        style={style}
      >
        {/* Tour Image */}
        <Box position="relative">
          <Image
            source={getImageSource()}
            style={{
              width: "100%",
              height: sizeStyle.imageHeight,
              borderTopLeftRadius: theme.borderRadii.m,
              borderTopRightRadius: theme.borderRadii.m,
            }}
            resizeMode="cover"
          />

          {/* Favorite Button */}
          <TouchableOpacity
            style={[
              styles.heartButton,
              { backgroundColor: theme.colors.cardBackground },
            ]}
            onPress={() => toggleFavorite(tour.id)}
          >
            <Heart
              size={20}
              color={
                isFavorite ? theme.colors.error : theme.colors.textSecondary
              }
              fill={isFavorite ? theme.colors.error : "none"}
            />
          </TouchableOpacity>
        </Box>

        {/* Tour Info */}
        <Box padding="m">
          <Text variant="subheader" numberOfLines={1}>
            {tour.name}
          </Text>

          <Box flexDirection="row" alignItems="center" marginTop="s">
            <Box
              backgroundColor={
                tour.civilizationId
                  ? theme.colors[
                      `accent${
                        tour.civilizationId.charAt(0).toUpperCase() +
                        tour.civilizationId.slice(1)
                      }`
                    ] || theme.colors.primary
                  : ""
              }
              paddingHorizontal="s"
              paddingVertical="xs"
              borderRadius="s"
              marginRight="s"
            >
              <Text color="background" fontSize={12} fontWeight="bold">
                {t(`civilizations.${tour.civilizationId}.name`)}
              </Text>
            </Box>
          </Box>

          <Text variant="caption" marginTop="s" numberOfLines={2}>
            {tour.description}
          </Text>

          <Box flexDirection="row" justifyContent="space-between" marginTop="m">
            <Box>
              <Text variant="caption">{t("explore.price")}</Text>
              <Text variant="subheader" color="primary">
                {tour.price} {t("explore.denarii")}
              </Text>
            </Box>
            <Box>
              <Text variant="caption">{t("explore.duration")}</Text>
              <Text variant="body">
                {tour.duration} {t("explore.days")}
              </Text>
            </Box>
          </Box>
        </Box>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heartButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default TourCard;
