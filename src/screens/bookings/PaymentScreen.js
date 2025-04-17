// src/screens/booking/PaymentScreen.js
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Landmark,
  Coins,
  Repeat,
  Users,
  Check,
} from "lucide-react-native";
import { Box, Text, Button, Card } from "../../components";
import useBookingsStore from "../../stores/bookingsStore";
import useDestinationsStore from "../../stores/destinationsStore";

const PaymentScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Get booking state and actions
  const currentBooking = useBookingsStore((state) => state.currentBooking);
  const setPaymentInfo = useBookingsStore((state) => state.setPaymentInfo);
  const calculateTotal = useBookingsStore((state) => state.calculateTotal);

  // Get selected tour details
  const tour = useDestinationsStore((state) =>
    state.getTour(currentBooking?.tourId)
  );

  // Payment method state
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Helper function to ensure we use valid theme color keys
  const getColorKey = (colorKey) => {
    return theme.colors[colorKey] ? colorKey : "primary";
  };

  // Payment methods
  const paymentMethods = [
    {
      id: "treasury",
      name: t("booking.imperialTreasury"),
      icon: Landmark,
      color: getColorKey("accentEgypt"),
    },
    {
      id: "moneylender",
      name: t("booking.localMoneylender"),
      icon: Coins,
      color: getColorKey("accentGreece"),
    },
    {
      id: "trade",
      name: t("booking.trade"),
      icon: Repeat,
      color: getColorKey("accentChina"),
    },
    {
      id: "slave",
      name: t("booking.slave"),
      icon: Users,
      color: getColorKey("accentPersia"),
    },
  ];

  // Calculate total price based on number of travelers
  const totalPrice = calculateTotal(tour?.price || 0);

  const handleContinue = () => {
    if (!selectedPayment) {
      // Show error (in a real app)
      return;
    }

    // Save payment info to booking store
    setPaymentInfo(selectedPayment);

    // Navigate to confirmation screen
    navigation.navigate("Confirmation");
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
        <Text variant="header">{t("booking.payment")}</Text>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tour Summary */}
        <Box padding="m">
          <Card padding="m" marginBottom="m">
            <Text variant="subheader">{tour?.name}</Text>
            <Text variant="body" marginTop="s" color="textSecondary">
              {tour?.duration} {t("explore.days")}
            </Text>

            <Box height={1} backgroundColor="border" marginVertical="m" />

            <Box
              flexDirection="row"
              justifyContent="space-between"
              marginBottom="s"
            >
              <Text variant="body">{t("explore.price")}</Text>
              <Text variant="body">
                {tour?.price} {t("explore.denarii")}
              </Text>
            </Box>

            <Box
              flexDirection="row"
              justifyContent="space-between"
              marginBottom="s"
            >
              <Text variant="body">{t("booking.travelers")}</Text>
              <Text variant="body">
                x{currentBooking?.travelers?.travelers?.length || 1}
              </Text>
            </Box>

            <Box height={1} backgroundColor="border" marginVertical="m" />

            <Box flexDirection="row" justifyContent="space-between">
              <Text variant="subheader">{t("booking.total")}</Text>
              <Text variant="subheader" color="primary">
                {totalPrice} {t("explore.denarii")}
              </Text>
            </Box>
          </Card>
        </Box>

        {/* Payment Methods */}
        <Box padding="m">
          <Text variant="subheader" marginBottom="m">
            {t("booking.selectPaymentMethod")}
          </Text>

          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              onPress={() => setSelectedPayment(method.id)}
              style={{ marginBottom: theme.spacing.m }}
            >
              <Card
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                padding="m"
                backgroundColor={
                  selectedPayment === method.id
                    ? method.color
                    : "cardBackground"
                }
                style={{
                  opacity: selectedPayment === method.id ? 0.1 : 1,
                  borderColor:
                    selectedPayment === method.id
                      ? theme.colors[method.color]
                      : theme.colors.border,
                  borderWidth: 1,
                }}
              >
                <Box flexDirection="row" alignItems="center">
                  <Box
                    width={40}
                    height={40}
                    borderRadius={20}
                    backgroundColor={method.color}
                    style={{ opacity: 0.2 }}
                    justifyContent="center"
                    alignItems="center"
                    marginRight="m"
                  >
                    <method.icon size={20} color={theme.colors[method.color]} />
                  </Box>
                  <Text variant="body">{method.name}</Text>
                </Box>

                {selectedPayment === method.id && (
                  <Box
                    width={24}
                    height={24}
                    borderRadius={12}
                    backgroundColor={method.color}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Check size={16} color="white" />
                  </Box>
                )}
              </Card>
            </TouchableOpacity>
          ))}
        </Box>

        {/* Payment Information */}
        <Box padding="m" marginBottom="l">
          <Text variant="caption" color="textSecondary">
            {t("booking.paymentDisclaimer")}
          </Text>
        </Box>
      </ScrollView>

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
        <Button
          label={t("general.next")}
          onPress={handleContinue}
          disabled={!selectedPayment}
        />
      </Box>
    </SafeAreaView>
  );
};

export default PaymentScreen;
