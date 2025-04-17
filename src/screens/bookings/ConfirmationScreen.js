// src/screens/booking/ConfirmationScreen.js
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckCircle, Scroll, Calendar, Users, X } from "lucide-react-native";
import { Box, Text, Button, Card } from "../../components";
import useBookingsStore from "../../stores/bookingsStore";
import useDestinationsStore from "../../stores/destinationsStore";

const ConfirmationScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Get booking state and actions
  const currentBooking = useBookingsStore((state) => state.currentBooking);
  const confirmBooking = useBookingsStore((state) => state.confirmBooking);

  // Get selected tour details
  const tour = useDestinationsStore((state) =>
    state.getTour(currentBooking?.tourId)
  );

  // Confirm the booking when screen loads
  useEffect(() => {
    confirmBooking();
  }, []);

  // Sample preparation tips
  const preparationTips = [
    t("booking.prepTip1"),
    t("booking.prepTip2"),
    t("booking.prepTip3"),
    t("booking.prepTip4"),
  ];

  const handleClose = () => {
    // Navigate back to the main app
    navigation.navigate("HomeTab");
  };

  const handleViewBookings = () => {
    // Navigate to bookings screen
    navigation.navigate("BookingsTab");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Close Button */}
      <Box flexDirection="row" justifyContent="flex-end" padding="m">
        <TouchableOpacity onPress={handleClose}>
          <X size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Success Banner */}
        <Box alignItems="center" padding="l">
          <CheckCircle size={80} color={theme.colors.success} />
          <Text variant="header" marginTop="m" textAlign="center">
            {t("booking.bookingComplete")}
          </Text>
          <Text
            variant="body"
            marginTop="s"
            textAlign="center"
            color="textSecondary"
          >
            {t("booking.bookingConfirmedMessage")}
          </Text>
        </Box>

        {/* Confirmation Code */}
        <Box padding="m">
          <Card
            padding="m"
            marginBottom="m"
            backgroundColor="successTransparent"
            borderColor={theme.colors.success}
            borderWidth={1}
          >
            <Text variant="body" textAlign="center" marginBottom="s">
              {t("booking.confirmationCode")}
            </Text>
            <Text variant="header" textAlign="center" color="success">
              ROME-MCXXV
            </Text>
          </Card>
        </Box>

        {/* Tour Summary */}
        <Box padding="m">
          <Text variant="subheader" marginBottom="m">
            {t("booking.tripSummary")}
          </Text>

          <Card padding="m" marginBottom="m">
            <Text variant="subheader">{tour?.name}</Text>
            <Text variant="body" marginTop="s" color="textSecondary">
              {tour?.duration} {t("explore.days")}
            </Text>

            <Box
              flexDirection="row"
              alignItems="center"
              marginTop="m"
              marginBottom="s"
            >
              <Calendar size={20} color={theme.colors.textPrimary} />
              <Text variant="body" marginLeft="s">
                {new Date(
                  currentBooking?.travelDates?.startDate
                ).toLocaleDateString()}{" "}
                -{" "}
                {new Date(
                  currentBooking?.travelDates?.endDate
                ).toLocaleDateString()}
              </Text>
            </Box>

            <Box flexDirection="row" alignItems="center">
              <Users size={20} color={theme.colors.textPrimary} />
              <Text variant="body" marginLeft="s">
                {currentBooking?.travelers?.travelers?.length}{" "}
                {t("booking.travelers")}
              </Text>
            </Box>
          </Card>
        </Box>

        {/* Preparation Tips */}
        <Box padding="m">
          <Box flexDirection="row" alignItems="center" marginBottom="m">
            <Scroll size={20} color={theme.colors.textPrimary} />
            <Text variant="subheader" marginLeft="s">
              {t("booking.preparationTips")}
            </Text>
          </Box>

          <Card padding="m" marginBottom="l">
            {preparationTips.map((tip, index) => (
              <Box
                key={index}
                flexDirection="row"
                alignItems="flex-start"
                marginBottom={index === preparationTips.length - 1 ? 0 : "m"}
              >
                <Box
                  width={8}
                  height={8}
                  borderRadius={"xs"}
                  backgroundColor="primary"
                  marginTop="s"
                  marginRight="s"
                />
                <Text variant="body">{tip}</Text>
              </Box>
            ))}
          </Card>
        </Box>
      </ScrollView>

      {/* Bottom Buttons */}
      <Box
        padding="m"
        backgroundColor="cardBackground"
        borderTopWidth={1}
        borderTopColor="border"
      >
        <Button
          label={t("booking.viewBookings")}
          onPress={handleViewBookings}
          marginBottom="m"
        />
        <Button
          label={t("booking.backToHome")}
          variant="outline"
          onPress={handleClose}
        />
      </Box>
    </SafeAreaView>
  );
};

export default ConfirmationScreen;
