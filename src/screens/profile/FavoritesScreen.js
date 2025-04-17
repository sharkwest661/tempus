// src/screens/profile/FavoritesScreen.js
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Heart } from "lucide-react-native";
import { Box, Text, TourCard } from "../../components";
import useFavoritesStore from "../../stores/favoritesStore";
import useDestinationsStore from "../../stores/destinationsStore";

const FavoritesScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Get favorites from store following Zustand patterns
  const favorites = useFavoritesStore((state) => state.favorites);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  // Get tours from destinations store
  const tours = useDestinationsStore((state) => state.tours);

  // Filter tours to only show favorites
  const favoriteTours = tours.filter((tour) => favorites.includes(tour.id));

  const handleTourPress = (tourId) => {
    // Set selected tour in the store
    useDestinationsStore.getState().setSelectedTour(tourId);
    // Navigate to tour details
    navigation.navigate("ExploreTab", {
      screen: "TourDetails",
      params: { id: tourId },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <Box
        flexDirection="row"
        alignItems="center"
        padding="m"
        borderBottomWidth={1}
        borderBottomColor="border"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: theme.spacing.m }}
        >
          <ArrowLeft color={theme.colors.textPrimary} size={24} />
        </TouchableOpacity>
        <Text variant="header">{t("profile.favorites")}</Text>
      </Box>

      {favoriteTours.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: theme.spacing.m }}
        >
          {favoriteTours.map((tour) => (
            <Box key={tour.id} marginBottom="m">
              <TourCard
                tour={tour}
                onPress={() => handleTourPress(tour.id)}
                style={{ width: "100%" }}
              />
            </Box>
          ))}

          {/* Clear Favorites Button */}
          <TouchableOpacity
            onPress={clearFavorites}
            style={[
              styles.clearButton,
              {
                backgroundColor: theme.colors.cardBackground,
                borderColor: theme.colors.error,
              },
            ]}
          >
            <Heart size={20} color={theme.colors.error} />
            <Text variant="body" color="error" marginLeft="s">
              {t("profile.clearFavorites")}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <Box flex={1} justifyContent="center" alignItems="center" padding="l">
          <Box
            width={80}
            height={80}
            borderRadius={40}
            backgroundColor={theme.colors.secondary + "30"}
            justifyContent="center"
            alignItems="center"
            marginBottom="l"
          >
            <Heart size={40} color={theme.colors.primary} />
          </Box>
          <Text variant="subheader" textAlign="center">
            {t("profile.noFavorites")}
          </Text>
          <Text
            variant="body"
            textAlign="center"
            marginTop="m"
            color="textSecondary"
          >
            {t("profile.addSomeFavorites")}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ExploreTab", { screen: "Destinations" })
            }
            style={[
              styles.exploreButton,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Text variant="body" color="secondary">
              {t("explore.exploreByCivilization")}
            </Text>
          </TouchableOpacity>
        </Box>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 20,
  },
  exploreButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
});

export default FavoritesScreen;
