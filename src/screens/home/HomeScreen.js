// src/screens/home/HomeScreen.js
import React, { useEffect } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { Search, Bell } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  Text,
  TourCard,
  CivilizationCard,
  SpecialOfferCard,
  SectionHeader,
} from "../../components";
import useAuthStore from "../../stores/authStore";
import useDestinationsStore from "../../stores/destinationsStore";

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Get user from auth store
  const user = useAuthStore((state) => state.user);

  // Get destinations data
  const civilizations = useDestinationsStore((state) => state.civilizations);
  const getFeaturedTours = useDestinationsStore(
    (state) => state.getFeaturedTours
  );
  const featuredTours = getFeaturedTours();

  // Mock special offers data
  const specialOffers = [
    {
      id: "offer1",
      title: t("home.chariotIncluded"),
      description:
        "Save 50 denarii on Egyptian expeditions with included chariot transportation!",
      accentColor: "accentEgypt",
      tourId: "egypt-1",
    },
    {
      id: "offer2",
      title: t("home.gladiatorShow"),
      description:
        "Book any Greek tour and receive a complimentary gladiator show ticket in Athens!",
      accentColor: "accentGreece",
      tourId: "greece-1",
    },
    {
      id: "offer3",
      title: t("home.imperialDiscount"),
      description:
        "Imperial citizen discount! 10% off all tours when you show your citizenship papers.",
      accentColor: "primary",
      tourId: null,
    },
  ];

  const handleTourPress = (tourId) => {
    // Set selected tour in the store
    useDestinationsStore.getState().setSelectedTour(tourId);
    // Navigate to tour details
    navigation.navigate("TourDetails", { id: tourId });
  };

  const handleCivilizationPress = (civilizationId) => {
    // Set selected civilization in the store
    useDestinationsStore.getState().setSelectedCivilization(civilizationId);
    // Navigate to civilization screen
    navigation.navigate("ExploreTab", {
      screen: "Civilization",
      params: { id: civilizationId },
    });
  };

  const handleSpecialOfferPress = (offer) => {
    if (offer.tourId) {
      handleTourPress(offer.tourId);
    } else {
      // Handle general offer
      navigation.navigate("ExploreTab", { screen: "Destinations" });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle={
          theme.colors.background === "#121212"
            ? "light-content"
            : "dark-content"
        }
        backgroundColor={theme.colors.background}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          padding="m"
        >
          <Box>
            <Text variant="header">
              {t("home.welcomeBack", {
                name: user?.name.split(" ")[0] || "Traveler",
              })}
            </Text>
            <Text variant="body" marginTop="xs">
              {t("general.tagline")}
            </Text>
          </Box>

          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileTab")}
            style={styles.iconButton}
          >
            <Bell color={theme.colors.textPrimary} size={24} />
          </TouchableOpacity>
        </Box>

        {/* Search Bar */}
        <Box paddingHorizontal="m" marginBottom="m">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ExploreTab", { screen: "Destinations" })
            }
            activeOpacity={0.8}
          >
            <Box
              flexDirection="row"
              alignItems="center"
              padding="m"
              backgroundColor="cardBackground"
              borderRadius="m"
              borderWidth={1}
              borderColor="border"
            >
              <Search color={theme.colors.textSecondary} size={20} />
              <Text variant="body" color="textSecondary" marginLeft="m">
                {t("general.search")}
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>

        {/* Featured Tours */}
        <SectionHeader
          title={t("home.featuredTours")}
          onPress={() =>
            navigation.navigate("ExploreTab", { screen: "Destinations" })
          }
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: theme.spacing.m }}
        >
          {featuredTours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              onPress={() => handleTourPress(tour.id)}
            />
          ))}
        </ScrollView>

        {/* Special Offers */}
        <SectionHeader
          title={t("home.specialOffers")}
          onPress={() => {
            /* Handle view all special offers */
          }}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: theme.spacing.m }}
        >
          {specialOffers.map((offer) => (
            <SpecialOfferCard
              key={offer.id}
              offer={offer}
              onPress={() => handleSpecialOfferPress(offer)}
            />
          ))}
        </ScrollView>

        {/* Popular Destinations */}
        <SectionHeader
          title={t("home.popularDestinations")}
          onPress={() =>
            navigation.navigate("ExploreTab", { screen: "Destinations" })
          }
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: theme.spacing.m }}
        >
          {civilizations.map((civilization) => (
            <CivilizationCard
              key={civilization.id}
              civilization={civilization}
              onPress={() => handleCivilizationPress(civilization.id)}
            />
          ))}
        </ScrollView>

        {/* Seasonal Tours */}
        <SectionHeader
          title={t("home.seasonalTours")}
          onPress={() =>
            navigation.navigate("ExploreTab", { screen: "Destinations" })
          }
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: theme.spacing.m,
            paddingBottom: theme.spacing.m,
          }}
        >
          {/* Using the first two tours from each civilization as "seasonal" examples */}
          {civilizations
            .slice(0, 2)
            .flatMap((civ) =>
              useDestinationsStore
                .getState()
                .getToursByCivilization(civ.id)
                .slice(0, 1)
            )
            .map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                size="medium"
                onPress={() => handleTourPress(tour.id)}
              />
            ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
