// src/screens/bookings/BookingDetailsScreen.js
import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Calendar,
  Users,
  MapPin,
  Clock,
  CreditCard,
} from "lucide-react-native";
import { Box, Text, Card, Button } from "../../components";
import useBookingsStore from "../../stores/bookingsStore";
import useDestinationsStore from "../../stores/destinationsStore";

const BookingDetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { t } = useTranslation();
  const theme = useTheme();

  // Get booking details
  const booking = useBookingsStore((state) => state.getBookingById(id));

  // If booking not found, navigate back
  if (!booking) {
    navigation.goBack();
    return null;
  }

  // Get tour details
  const tour = useDestinationsStore((state) => state.getTour(booking.tourId));

  // Get civilization details
  const civilization = useDestinationsStore((state) =>
    state.getCivilization(tour?.civilizationId)
  );

  const isActive = new Date(booking.travelDates.endDate) >= new Date();

  const handleCancel = () => {
    // Cancel booking
    useBookingsStore.getState().cancelBooking(booking.id);
    navigation.goBack();
  };

  const handleViewTour = () => {
    // Set selected tour in the store
    useDestinationsStore.getState().setSelectedTour(tour.id);
    // Navigate to tour details
    navigation.navigate("ExploreTab", {
      screen: "TourDetails",
      params: { id: tour.id },
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
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
        <Text variant="header">{t("booking.bookingDetails")}</Text>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Confirmation Status */}
        <Box
          backgroundColor={isActive ? "success" : "textSecondary"}
          padding="m"
        >
          <Text variant="body" color="secondary" textAlign="center">
            {isActive
              ? t("booking.confirmedStatus")
              : t("booking.completedStatus")}
          </Text>
        </Box>

        {/* Booking Code */}
        <Box padding="m">
          <Card padding="m" marginBottom="m">
            <Text variant="caption" textAlign="center" marginBottom="s">
              {t("booking.confirmationCode")}
            </Text>
            <Text variant="header" textAlign="center" color="primary">
              {booking.confirmationCode}
            </Text>
          </Card>
        </Box>

        {/* Tour Info */}
        <Box padding="m">
          <Text variant="subheader" marginBottom="m">
            {t("booking.tourInformation")}
          </Text>

          <Card padding="m" marginBottom="m">
            <Text variant="subheader">{tour?.name}</Text>

            <Box
              flexDirection="row"
              alignItems="center"
              marginTop="m"
              marginBottom="s"
            >
              <MapPin size={16} color={theme.colors.textSecondary} />
              <Text variant="body" marginLeft="s" color="textSecondary">
                {civilization?.name || tour?.civilizationId}
              </Text>
            </Box>

            <Box flexDirection="row" alignItems="center" marginBottom="s">
              <Clock size={16} color={theme.colors.textSecondary} />
              <Text variant="body" marginLeft="s" color="textSecondary">
                {tour?.duration} {t("explore.days")}
              </Text>
            </Box>

            <TouchableOpacity
              onPress={handleViewTour}
              style={[
                styles.viewButton,
                { backgroundColor: theme.colors.primary + "20" },
              ]}
            >
              <Text variant="body" color="primary" textAlign="center">
                {t("booking.viewTour")}
              </Text>
            </TouchableOpacity>
          </Card>
        </Box>

        {/* Travel Dates */}
        <Box padding="m">
          <Text variant="subheader" marginBottom="m">
            {t("booking.travelDates")}
          </Text>

          <Card padding="m" marginBottom="m">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              marginBottom="m"
            >
              <Box>
                <Text variant="caption" color="textSecondary">
                  {t("booking.departureDate")}
                </Text>
                <Text variant="body">
                  {formatDate(booking.travelDates.startDate)}
                </Text>
              </Box>

              <Box
                width={40}
                height={40}
                borderRadius={"l"}
                backgroundColor="secondary"
                justifyContent="center"
                alignItems="center"
              >
                <Calendar size={20} color={theme.colors.primary} />
              </Box>

              <Box>
                <Text variant="caption" color="textSecondary" textAlign="right">
                  {t("booking.returnDate")}
                </Text>
                <Text variant="body">
                  {formatDate(booking.travelDates.endDate)}
                </Text>
              </Box>
            </Box>
          </Card>
        </Box>

        {/* Travelers */}
        <Box padding="m">
          <Text variant="subheader" marginBottom="m">
            {t("booking.travelers")}
          </Text>

          <Card padding="m" marginBottom="m">
            {booking.travelers?.travelers?.map((traveler, index) => (
              <Box
                key={index}
                flexDirection="row"
                alignItems="center"
                marginBottom={
                  index === booking.travelers.travelers.length - 1 ? 0 : "m"
                }
              >
                <Box
                  width={40}
                  height={40}
                  borderRadius={"l"}
                  backgroundColor={
                    traveler.isPrimary
                      ? theme.colors.primary + "20"
                      : theme.colors.secondary + "20"
                  }
                  justifyContent="center"
                  alignItems="center"
                  marginRight="m"
                >
                  <Users
                    size={20}
                    color={
                      traveler.isPrimary
                        ? theme.colors.primary
                        : theme.colors.textPrimary
                    }
                  />
                </Box>
                <Box flex={1}>
                  <Text variant="body">{traveler.name}</Text>
                  <Text variant="caption" color="textSecondary">
                    {traveler.isPrimary
                      ? t("booking.primaryTraveler")
                      : t("booking.additionalTraveler")}
                  </Text>
                </Box>
                <Text variant="body">{traveler.age}</Text>
              </Box>
            ))}
          </Card>
        </Box>

        {/* Payment Info */}
        <Box padding="m">
          <Text variant="subheader" marginBottom="m">
            {t("booking.paymentInformation")}
          </Text>

          <Card padding="m" marginBottom="m">
            <Box flexDirection="row" alignItems="center" marginBottom="m">
              <Box
                width={40}
                height={40}
                borderRadius={"l"}
                backgroundColor="accentEgyptTransparent"
                justifyContent="center"
                alignItems="center"
                marginRight="m"
              >
                <CreditCard size={20} color={theme.colors.accentEgypt} />
              </Box>
              <Box flex={1}>
                <Text variant="body">
                  {t(`booking.${booking.paymentMethod}`)}
                </Text>
                <Text variant="caption" color="textSecondary">
                  {t("booking.paidOn", {
                    date: formatDate(booking.confirmedAt),
                  })}
                </Text>
              </Box>
            </Box>

            <Box height={1} backgroundColor="border" marginBottom="m" />

            <Box flexDirection="row" justifyContent="space-between">
              <Text variant="subheader">{t("booking.total")}</Text>
              <Text variant="subheader" color="primary">
                {booking.totalPrice} {t("explore.denarii")}
              </Text>
            </Box>
          </Card>
        </Box>

        {/* Special Requests */}
        {booking.travelers?.specialRequests ? (
          <Box padding="m">
            <Text variant="subheader" marginBottom="m">
              {t("booking.specialRequests")}
            </Text>

            <Card padding="m" marginBottom="l">
              <Text variant="body">{booking.travelers.specialRequests}</Text>
            </Card>
          </Box>
        ) : null}

        {/* Cancel Button (only for active bookings) */}
        {isActive && (
          <Box padding="m" marginBottom="l">
            <Button
              label={t("booking.cancelBooking")}
              variant="outline"
              onPress={handleCancel}
              backgroundColor="errorTransparent"
              borderColor={theme.colors.error}
              labelColor="error"
            />
          </Box>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
});

export default BookingDetailsScreen;
