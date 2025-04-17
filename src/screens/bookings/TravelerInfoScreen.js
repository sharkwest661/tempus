// src/screens/booking/TravelerInfoScreen.js
import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Plus, User, Trash2 } from "lucide-react-native";
import { Box, Text, Button, Card } from "../../components";
import useBookingsStore from "../../stores/bookingsStore";
import useAuthStore from "../../stores/authStore";

const TravelerInfoScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Get user from auth store
  const user = useAuthStore((state) => state.user);

  // Get booking state and actions
  const currentBooking = useBookingsStore((state) => state.currentBooking);
  const setTravelers = useBookingsStore((state) => state.setTravelers);

  // Initialize travelers state with primary traveler (the user)
  const [travelers, setTravelersState] = useState([
    {
      id: "1",
      name: user.name,
      age: "35", // Default age
      isPrimary: true,
    },
  ]);

  const [specialRequests, setSpecialRequests] = useState("");

  const addTraveler = () => {
    const newTraveler = {
      id: (travelers.length + 1).toString(),
      name: "",
      age: "",
      isPrimary: false,
    };
    setTravelersState([...travelers, newTraveler]);
  };

  const removeTraveler = (id) => {
    setTravelersState(travelers.filter((traveler) => traveler.id !== id));
  };

  const updateTraveler = (id, field, value) => {
    setTravelersState(
      travelers.map((traveler) =>
        traveler.id === id ? { ...traveler, [field]: value } : traveler
      )
    );
  };

  const handleContinue = () => {
    // Validate traveler info
    const isValid = travelers.every(
      (traveler) => traveler.name.trim() !== "" && traveler.age.trim() !== ""
    );

    if (!isValid) {
      // Show error (in a real app)
      return;
    }

    // Save travelers to booking store
    const travelersData = {
      travelers,
      specialRequests,
    };
    setTravelers(travelersData);

    // Navigate to next screen
    navigation.navigate("Payment");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
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
          <Text variant="header">{t("booking.travelerInfo")}</Text>
        </Box>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Primary Traveler */}
          <Box padding="m">
            <Text variant="subheader" marginBottom="m">
              {t("booking.primaryTraveler")}
            </Text>

            <Card padding="m" marginBottom="m">
              <Box marginBottom="m">
                <Text variant="body" marginBottom="s">
                  {t("booking.nameOfTraveler")}
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.border,
                      color: theme.colors.textPrimary,
                    },
                  ]}
                  value={travelers[0].name}
                  onChangeText={(text) => updateTraveler("1", "name", text)}
                  placeholder={t("booking.nameOfTraveler")}
                  placeholderTextColor={theme.colors.textSecondary}
                />
              </Box>

              <Box>
                <Text variant="body" marginBottom="s">
                  {t("booking.age")}
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.border,
                      color: theme.colors.textPrimary,
                    },
                  ]}
                  value={travelers[0].age}
                  onChangeText={(text) => updateTraveler("1", "age", text)}
                  placeholder={t("booking.age")}
                  placeholderTextColor={theme.colors.textSecondary}
                  keyboardType="number-pad"
                />
              </Box>
            </Card>
          </Box>

          {/* Additional Travelers */}
          {travelers.length > 1 && (
            <Box padding="m">
              <Text variant="subheader" marginBottom="m">
                {t("booking.additionalTravelers")}
              </Text>

              {travelers
                .filter((traveler) => !traveler.isPrimary)
                .map((traveler) => (
                  <Card key={traveler.id} padding="m" marginBottom="m">
                    <Box
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                      marginBottom="m"
                    >
                      <Box flexDirection="row" alignItems="center">
                        <User size={20} color={theme.colors.textPrimary} />
                        <Text variant="body" marginLeft="s">
                          {t("booking.traveler")} {traveler.id}
                        </Text>
                      </Box>
                      <TouchableOpacity
                        onPress={() => removeTraveler(traveler.id)}
                      >
                        <Trash2 size={20} color={theme.colors.error} />
                      </TouchableOpacity>
                    </Box>

                    <Box marginBottom="m">
                      <Text variant="body" marginBottom="s">
                        {t("booking.nameOfTraveler")}
                      </Text>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            backgroundColor: theme.colors.background,
                            borderColor: theme.colors.border,
                            color: theme.colors.textPrimary,
                          },
                        ]}
                        value={traveler.name}
                        onChangeText={(text) =>
                          updateTraveler(traveler.id, "name", text)
                        }
                        placeholder={t("booking.nameOfTraveler")}
                        placeholderTextColor={theme.colors.textSecondary}
                      />
                    </Box>

                    <Box>
                      <Text variant="body" marginBottom="s">
                        {t("booking.age")}
                      </Text>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            backgroundColor: theme.colors.background,
                            borderColor: theme.colors.border,
                            color: theme.colors.textPrimary,
                          },
                        ]}
                        value={traveler.age}
                        onChangeText={(text) =>
                          updateTraveler(traveler.id, "age", text)
                        }
                        placeholder={t("booking.age")}
                        placeholderTextColor={theme.colors.textSecondary}
                        keyboardType="number-pad"
                      />
                    </Box>
                  </Card>
                ))}
            </Box>
          )}

          {/* Add Traveler Button */}
          <Box padding="m">
            <TouchableOpacity
              onPress={addTraveler}
              style={[
                styles.addButton,
                {
                  backgroundColor: theme.colors.primary + "20",
                  borderColor: theme.colors.primary,
                },
              ]}
            >
              <Plus size={20} color={theme.colors.primary} />
              <Text variant="body" color="primary" marginLeft="s">
                {t("booking.addTraveler")}
              </Text>
            </TouchableOpacity>
          </Box>

          {/* Special Requests */}
          <Box padding="m">
            <Text variant="subheader" marginBottom="m">
              {t("booking.specialRequests")}
            </Text>

            <Card padding="m" marginBottom="l">
              <TextInput
                style={[
                  styles.textArea,
                  {
                    backgroundColor: theme.colors.background,
                    borderColor: theme.colors.border,
                    color: theme.colors.textPrimary,
                  },
                ]}
                value={specialRequests}
                onChangeText={setSpecialRequests}
                placeholder={t("booking.specialRequestsPlaceholder")}
                placeholderTextColor={theme.colors.textSecondary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </Card>
          </Box>

          {/* Spacing for bottom button */}
          <Box height={80} />
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
          <Button label={t("general.next")} onPress={handleContinue} />
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 10,
    fontSize: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "dashed",
  },
});

export default TravelerInfoScreen;
