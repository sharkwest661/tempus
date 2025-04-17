// src/screens/explore/CivilizationScreen.js
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  AlertTriangle,
  Sun,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Text, TourCard, Card, SectionHeader } from "../../components";
import useDestinationsStore from "../../stores/destinationsStore";

const CivilizationScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { t } = useTranslation();
  const theme = useTheme();

  // Get civilization and its tours
  const civilization = useDestinationsStore((state) =>
    state.getCivilization(id)
  );
  const tours = useDestinationsStore((state) =>
    state.getToursByCivilization(id)
  );

  // Get selected civilization from store
  useEffect(() => {
    if (id) {
      useDestinationsStore.getState().setSelectedCivilization(id);
    }

    return () => {
      // Clear selection when unmounting if needed
    };
  }, [id]);

  // If civilization not found, navigate back
  if (!civilization) {
    navigation.goBack();
    return null;
  }

  const getImageSource = () => {
    // In a real app, you would use actual images here
    switch (civilization.id) {
      case "egypt":
        return require("../../../assets/images/egypt-placeholder.jpg");
      case "greece":
        return require("../../../assets/images/greece-placeholder.jpg");
      case "china":
        return require("../../../assets/images/china-placeholder.jpg");
      case "persia":
        return require("../../../assets/images/persia-placeholder.jpg");
      case "carthage":
        return require("../../../assets/images/carthage-placeholder.jpg");
      default:
        return require("../../../assets/images/civilization-placeholder.jpg");
    }
  };

  const handleTourPress = (tourId) => {
    // Set selected tour in the store
    useDestinationsStore.getState().setSelectedTour(tourId);
    // Navigate to tour details
    navigation.navigate("TourDetails", { id: tourId });
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

          {/* Civilization Name Overlay */}
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            padding="m"
            backgroundColor="rgba(0,0,0,0.6)"
          >
            <Text variant="header" color="secondary">
              {t(`civilizations.${civilization.id}.name`) || civilization.name}
            </Text>
          </Box>
        </Box>

        {/* Civilization Description */}
        <Box padding="m">
          <Text variant="body">{civilization.longDescription}</Text>
        </Box>

        {/* Travel Info Cards */}
        <Box paddingHorizontal="m">
          <Box flexDirection="row" marginBottom="m">
            <Card flex={1} marginRight="s" padding="m">
              <Box flexDirection="row" alignItems="center" marginBottom="s">
                <MapPin size={16} color={theme.colors.textPrimary} />
                <Text variant="caption" marginLeft="xs" fontWeight="bold">
                  {t("explore.travelTime")}
                </Text>
              </Box>
              <Text variant="body" fontSize={14}>
                {civilization.travelTimeFromRome}
              </Text>
            </Card>

            <Card flex={1} padding="m">
              <Box flexDirection="row" alignItems="center" marginBottom="s">
                <AlertTriangle size={16} color={theme.colors.textPrimary} />
                <Text variant="caption" marginLeft="xs" fontWeight="bold">
                  {t("explore.dangerLevel")}
                </Text>
              </Box>
              <Text variant="body" fontSize={14}>
                {civilization.dangerLevel}
              </Text>
            </Card>
          </Box>

          <Box flexDirection="row" marginBottom="m">
            <Card flex={1} marginRight="s" padding="m">
              <Box flexDirection="row" alignItems="center" marginBottom="s">
                <Sun size={16} color={theme.colors.textPrimary} />
                <Text variant="caption" marginLeft="xs" fontWeight="bold">
                  {t("explore.bestSeason")}
                </Text>
              </Box>
              <Text variant="body" fontSize={14}>
                {civilization.bestSeasonToVisit}
              </Text>
            </Card>

            <Card flex={1} padding="m">
              <Box flexDirection="row" alignItems="center" marginBottom="s">
                <Calendar size={16} color={theme.colors.textPrimary} />
                <Text variant="caption" marginLeft="xs" fontWeight="bold">
                  {t("explore.localCurrency")}
                </Text>
              </Box>
              <Text variant="body" fontSize={14}>
                {civilization.localCurrency}
              </Text>
            </Card>
          </Box>
        </Box>

        {/* Key Attractions */}
        <Box padding="m">
          <Text variant="subheader" marginBottom="m">
            Key Attractions
          </Text>
          {civilization.keyAttractions.map((attraction, index) => (
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
              <Text variant="body">{attraction}</Text>
            </Box>
          ))}
        </Box>

        {/* Available Tours */}
        <SectionHeader title={t("explore.tourPackages")} showViewAll={false} />

        <Box paddingHorizontal="m">
          {tours.map((tour) => (
            <Box key={tour.id} marginBottom="m">
              <TourCard
                tour={tour}
                onPress={() => handleTourPress(tour.id)}
                style={{ width: "100%" }}
              />
            </Box>
          ))}
        </Box>
      </ScrollView>
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
});

export default CivilizationScreen;
