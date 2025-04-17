// src/screens/bookings/ActiveBookingsScreen.js
import React, { useMemo } from "react";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, MapPin, Search } from "lucide-react-native";
import { Box, Text, Card } from "../../components";
import useBookingsStore from "../../stores/bookingsStore";
import useDestinationsStore from "../../stores/destinationsStore";

const ActiveBookingsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Get function references
  const getActiveBookings = useBookingsStore(
    (state) => state.getActiveBookings
  );
  const getTour = useDestinationsStore((state) => state.getTour);

  // Calculate derived data once with useMemo
  const activeBookings = useMemo(
    () => getActiveBookings(),
    [getActiveBookings]
  );

  const handleBookingPress = (bookingId) => {
    navigation.navigate("BookingDetails", { id: bookingId });
  };

  const handleHistoryPress = () => {
    navigation.navigate("BookingHistory");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <Box padding="m">
        <Text variant="header">{t("profile.activeBookings")}</Text>
        <Text variant="body" marginTop="xs" color="textSecondary">
          {t("booking.upcomingTrips")}
        </Text>
      </Box>

      {/* Search Bar */}
      <Box paddingHorizontal="m" marginBottom="m">
        <TouchableOpacity activeOpacity={0.8}>
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
              {t("booking.searchBookings")}
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>

      {/* Filter Tabs */}
      <Box flexDirection="row" paddingHorizontal="m" marginBottom="m">
        <TouchableOpacity
          style={[
            styles.tabButton,
            {
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.primary,
            },
          ]}
        >
          <Text variant="body" color="secondary">
            {t("booking.active")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleHistoryPress}
          style={[
            styles.tabButton,
            {
              backgroundColor: "transparent",
              borderColor: theme.colors.border,
              marginLeft: theme.spacing.s,
            },
          ]}
        >
          <Text variant="body" color="textSecondary">
            {t("booking.history")}
          </Text>
        </TouchableOpacity>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false}>
        {activeBookings.length > 0 ? (
          <Box padding="m">
            {activeBookings.map((booking) => {
              const tour = getTour(booking.tourId);
              return (
                <TouchableOpacity
                  key={booking.id}
                  onPress={() => handleBookingPress(booking.id)}
                  style={{ marginBottom: theme.spacing.m }}
                >
                  <Card padding="m">
                    <Box
                      flexDirection="row"
                      justifyContent="space-between"
                      marginBottom="s"
                    >
                      <Text variant="subheader">{tour?.name}</Text>
                      <Text
                        variant="caption"
                        color="success"
                        backgroundColor="successTransparent"
                        paddingHorizontal="s"
                        paddingVertical="xs"
                        borderRadius="s"
                      >
                        {t("booking.confirmed")}
                      </Text>
                    </Box>

                    <Box
                      flexDirection="row"
                      alignItems="center"
                      marginBottom="s"
                    >
                      <Calendar size={16} color={theme.colors.textSecondary} />
                      <Text variant="body" marginLeft="s" color="textSecondary">
                        {new Date(
                          booking.travelDates.startDate
                        ).toLocaleDateString()}{" "}
                        -{" "}
                        {new Date(
                          booking.travelDates.endDate
                        ).toLocaleDateString()}
                      </Text>
                    </Box>

                    <Box
                      flexDirection="row"
                      alignItems="center"
                      marginBottom="m"
                    >
                      <MapPin size={16} color={theme.colors.textSecondary} />
                      <Text variant="body" marginLeft="s" color="textSecondary">
                        {tour?.startingPoint}
                      </Text>
                    </Box>

                    <Box
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                      padding="s"
                      backgroundColor="background"
                      borderRadius="s"
                    >
                      <Text variant="caption">
                        {t("booking.confirmationCode")}
                      </Text>
                      <Text variant="body" fontWeight="bold">
                        {booking.confirmationCode}
                      </Text>
                    </Box>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </Box>
        ) : (
          <Box flex={1} justifyContent="center" alignItems="center" padding="l">
            <Box
              width={80}
              height={80}
              borderRadius={"xl"}
              backgroundColor="secondaryTransparent"
              justifyContent="center"
              alignItems="center"
              marginBottom="l"
            >
              <Calendar size={40} color={theme.colors.primary} />
            </Box>
            <Text variant="subheader" textAlign="center">
              {t("profile.noBookings")}
            </Text>
            <Text
              variant="body"
              textAlign="center"
              marginTop="m"
              color="textSecondary"
            >
              {t("booking.noBookingsDescription")}
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
                {t("booking.exploreTours")}
              </Text>
            </TouchableOpacity>
          </Box>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
  },
  exploreButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
});

export default ActiveBookingsScreen;
