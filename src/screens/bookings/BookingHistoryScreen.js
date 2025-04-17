// src/screens/bookings/BookingHistoryScreen.js
import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Calendar, MapPin } from "lucide-react-native";
import { Box, Text, Card } from "../../components";
import useBookingsStore from "../../stores/bookingsStore";
import useDestinationsStore from "../../stores/destinationsStore";

const BookingHistoryScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Get booking history
  const bookingHistory = useBookingsStore((state) => state.getBookingHistory());

  const handleBookingPress = (bookingId) => {
    navigation.navigate("BookingDetails", { id: bookingId });
  };

  const getTourForBooking = (tourId) => {
    return useDestinationsStore.getState().getTour(tourId);
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
        <Text variant="header">{t("profile.bookingHistory")}</Text>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false}>
        {bookingHistory.length > 0 ? (
          <Box padding="m">
            {bookingHistory.map((booking) => {
              const tour = getTourForBooking(booking.tourId);
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
                        color="textSecondary"
                        backgroundColor={theme.colors.textSecondary + "20"}
                        paddingHorizontal="s"
                        paddingVertical="xs"
                        borderRadius="s"
                      >
                        {t("booking.completed")}
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
                      backgroundColor={theme.colors.background}
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
              borderRadius={40}
              backgroundColor={theme.colors.secondary + "30"}
              justifyContent="center"
              alignItems="center"
              marginBottom="l"
            >
              <Calendar size={40} color={theme.colors.primary} />
            </Box>
            <Text variant="subheader" textAlign="center">
              {t("booking.noHistoryYet")}
            </Text>
            <Text
              variant="body"
              textAlign="center"
              marginTop="m"
              color="textSecondary"
            >
              {t("booking.historyDescription")}
            </Text>
          </Box>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingHistoryScreen;
