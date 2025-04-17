// src/screens/booking/CalendarSelectionScreen.js
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Calendar } from "lucide-react-native";
import { Box, Text, Button } from "../../components";
import useBookingsStore from "../../stores/bookingsStore";
import useDestinationsStore from "../../stores/destinationsStore";

const CalendarSelectionScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Get booking state and actions
  const currentBooking = useBookingsStore((state) => state.currentBooking);
  const setTravelDates = useBookingsStore((state) => state.setTravelDates);

  // Get selected tour details
  const tour = useDestinationsStore((state) =>
    state.getTour(currentBooking?.tourId)
  );

  // State for date selection
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + (tour?.duration || 7)))
  );

  const handleContinue = () => {
    // Save dates to booking store
    setTravelDates(startDate.toISOString(), endDate.toISOString());

    // Navigate to next screen
    navigation.navigate("TravelerInfo");
  };

  const handleCancel = () => {
    // Cancel booking process
    useBookingsStore.getState().cancelBookingProcess();

    // Navigate back to tour details
    navigation.goBack();
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
          onPress={handleCancel}
          style={{ marginRight: theme.spacing.m }}
        >
          <ArrowLeft color={theme.colors.textPrimary} size={24} />
        </TouchableOpacity>
        <Text variant="header">{t("booking.selectDates")}</Text>
      </Box>

      {/* Tour Info */}
      <Box
        padding="m"
        backgroundColor="cardBackground"
        margin="m"
        borderRadius="m"
      >
        <Text variant="subheader">{tour?.name}</Text>
        <Text variant="body" marginTop="s" color="textSecondary">
          {tour?.duration} {t("explore.days")} • {tour?.price}{" "}
          {t("explore.denarii")}
        </Text>
      </Box>

      {/* Calendar Placeholder */}
      <Box
        margin="m"
        padding="xl"
        backgroundColor="cardBackground"
        borderRadius="m"
        alignItems="center"
        justifyContent="center"
      >
        <Calendar size={60} color={theme.colors.primary} />
        <Text variant="body" marginTop="m" textAlign="center">
          {t("booking.calendarPlaceholder")}
        </Text>

        {/* In a real app, you would implement a proper calendar component here */}
        <Box marginTop="l">
          <Box flexDirection="row" alignItems="center" marginBottom="m">
            <Text variant="body" marginRight="m">
              {t("booking.departureDate")}:
            </Text>
            <Text variant="subheader" color="primary">
              {startDate.toLocaleDateString()}
            </Text>
          </Box>

          <Box flexDirection="row" alignItems="center">
            <Text variant="body" marginRight="m">
              {t("booking.returnDate")}:
            </Text>
            <Text variant="subheader" color="primary">
              {endDate.toLocaleDateString()}
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Booking Information */}
      <Box padding="m">
        <Text variant="caption" color="textSecondary" marginBottom="m">
          {t("booking.dateSelectionInfo")}
        </Text>
      </Box>

      {/* Continue Button */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        padding="m"
        backgroundColor="cardBackground"
        borderTopWidth={1}
        borderTopColor="border"
      >
        <Button label={t("general.next")} onPress={handleContinue} />
      </Box>
    </SafeAreaView>
  );
};

export default CalendarSelectionScreen;
