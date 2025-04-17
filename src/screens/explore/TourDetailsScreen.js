// src/screens/explore/TourDetailsScreen.js
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import {
  ArrowLeft,
  Heart,
  Calendar,
  Clock,
  AlertTriangle,
  MapPin,
  Package,
  Sparkles,
  Star,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Text, Button, Card } from "../../components";
import useDestinationsStore from "../../stores/destinationsStore";
import useFavoritesStore from "../../stores/favoritesStore";
import useBookingsStore from "../../stores/bookingsStore";

const TourDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { t } = useTranslation();
  const theme = useTheme();

  // Get tour details
  const tour = useDestinationsStore((state) => state.getTour(id));
  const civilization = useDestinationsStore((state) =>
    tour ? state.getCivilization(tour.civilizationId) : null
  );

  // Get favorites state using Zustand pattern
  const isFavorite = useFavoritesStore((state) => state.isFavorite(id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  // Get booking actions
  const startBooking = useBookingsStore((state) => state.startBooking);

  // Set selected tour in store when page loads
  useEffect(() => {
    if (id) {
      useDestinationsStore.getState().setSelectedTour(id);
    }

    return () => {
      // Clear selection when unmounting if needed
    };
  }, [id]);

  // If tour not found, navigate back
  if (!tour || !civilization) {
    navigation.goBack();
    return null;
  }

  const getImageSource = () => {
    // In a real app, you would use actual images here
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

  const handleBookNow = () => {
    // Start the booking process
    startBooking(tour.id);
    // Navigate to booking flow
    navigation.navigate("BookingFlow");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <Box position="relative" height={250}>
          <Image
            source={getImageSource()}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />

          {/* Back Button */}
          <TouchableOpacity
            style={[
              styles.backButton,
              { backgroundColor: theme.colors.cardBackground },
            ]}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft color={theme.colors.textPrimary} size={20} />
          </TouchableOpacity>

          {/* Favorite Button */}
          <TouchableOpacity
            style={[
              styles.favoriteButton,
              { backgroundColor: theme.colors.cardBackground },
            ]}
            onPress={() => toggleFavorite(tour.id)}
          >
            <Heart
              size={20}
              color={isFavorite ? theme.colors.error : theme.colors.textPrimary}
              fill={isFavorite ? theme.colors.error : "none"}
            />
          </TouchableOpacity>
        </Box>

        {/* Tour Title & Info */}
        <Box padding="m">
          <Text variant="header">{tour.name}</Text>

          <Box
            flexDirection="row"
            alignItems="center"
            marginTop="s"
            marginBottom="m"
          >
            <Box
              backgroundColor={
                theme.colors[civilization.accentColor] || theme.colors.primary
              }
              paddingHorizontal="s"
              paddingVertical="xs"
              borderRadius="s"
              marginRight="m"
            >
              <Text color="background" fontSize={12} fontWeight="bold">
                {t(`civilizations.${tour.civilizationId}.name`)}
              </Text>
            </Box>

            <Box flexDirection="row" alignItems="center">
              <Star
                size={16}
                color={theme.colors.secondary}
                fill={theme.colors.secondary}
              />
              <Text variant="body" marginLeft="xs">
                {tour.reviews.reduce((acc, review) => acc + review.rating, 0) /
                  tour.reviews.length}
                ({tour.reviews.length})
              </Text>
            </Box>
          </Box>

          <Text variant="body">{tour.longDescription || tour.description}</Text>
        </Box>

        {/* Tour Details Cards */}
        <Box padding="m">
          <Box flexDirection="row" marginBottom="m">
            <Card flex={1} marginRight="s" padding="m">
              <Box flexDirection="row" alignItems="center" marginBottom="s">
                <Calendar size={16} color={theme.colors.textPrimary} />
                <Text variant="caption" marginLeft="xs" fontWeight="bold">
                  {t("explore.duration")}
                </Text>
              </Box>
              <Text variant="body" fontSize={14}>
                {tour.duration} {t("explore.days")}
              </Text>
            </Card>

            <Card flex={1} padding="m">
              <Box flexDirection="row" alignItems="center" marginBottom="s">
                <AlertTriangle size={16} color={theme.colors.textPrimary} />
                <Text variant="caption" marginLeft="xs" fontWeight="bold">
                  {t("explore.difficultyLevel")}
                </Text>
              </Box>
              <Text variant="body" fontSize={14}>
                {tour.difficulty}
              </Text>
            </Card>
          </Box>

          <Card padding="m" marginBottom="m">
            <Box flexDirection="row" alignItems="center" marginBottom="s">
              <MapPin size={16} color={theme.colors.textPrimary} />
              <Text variant="caption" marginLeft="xs" fontWeight="bold">
                {t("explore.startingPoint")}
              </Text>
            </Box>
            <Text variant="body" fontSize={14}>
              {tour.startingPoint}
            </Text>
          </Card>
        </Box>

        {/* What's Included */}
        <Box padding="m">
          <Box flexDirection="row" alignItems="center" marginBottom="m">
            <Package size={20} color={theme.colors.textPrimary} />
            <Text variant="subheader" marginLeft="s">
              {t("explore.included")}
            </Text>
          </Box>

          {tour.included.map((item, index) => (
            <Box
              key={index}
              flexDirection="row"
              alignItems="center"
              marginBottom="s"
            >
              <Box
                width={8}
                height={8}
                borderRadius={4}
                backgroundColor={
                  theme.colors[civilization.accentColor] || theme.colors.primary
                }
                marginRight="s"
              />
              <Text variant="body">{item}</Text>
            </Box>
          ))}
        </Box>

        {/* Highlights */}
        <Box padding="m">
          <Box flexDirection="row" alignItems="center" marginBottom="m">
            <Sparkles size={20} color={theme.colors.textPrimary} />
            <Text variant="subheader" marginLeft="s">
              {t("explore.highlights")}
            </Text>
          </Box>

          {tour.highlights.map((item, index) => (
            <Box
              key={index}
              flexDirection="row"
              alignItems="center"
              marginBottom="s"
            >
              <Box
                width={8}
                height={8}
                borderRadius={4}
                backgroundColor={
                  theme.colors[civilization.accentColor] || theme.colors.primary
                }
                marginRight="s"
              />
              <Text variant="body">{item}</Text>
            </Box>
          ))}
        </Box>

        {/* Reviews */}
        <Box padding="m">
          <Text variant="subheader" marginBottom="m">
            {t("explore.reviews")} ({tour.reviews.length})
          </Text>

          {tour.reviews.map((review, index) => (
            <Card key={index} marginBottom="m" padding="m">
              <Box
                flexDirection="row"
                justifyContent="space-between"
                marginBottom="s"
              >
                <Text variant="body" fontWeight="bold">
                  {review.author}
                </Text>
                <Box flexDirection="row" alignItems="center">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        color={
                          i < review.rating
                            ? theme.colors.secondary
                            : theme.colors.textSecondary
                        }
                        fill={
                          i < review.rating ? theme.colors.secondary : "none"
                        }
                      />
                    ))}
                </Box>
              </Box>
              <Text variant="body">{review.comment}</Text>
            </Card>
          ))}
        </Box>
      </ScrollView>

      {/* Booking Footer */}
      <Box
        padding="m"
        backgroundColor="cardBackground"
        borderTopWidth={1}
        borderTopColor="border"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Text variant="caption">{t("explore.price")}</Text>
          <Text variant="header" color="primary">
            {tour.price} {t("explore.denarii")}
          </Text>
        </Box>

        <Button
          label={t("explore.bookNow")}
          onPress={handleBookNow}
          width={150}
        />
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default TourDetailsScreen;
