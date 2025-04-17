// src/screens/profile/TravelStatsScreen.js
import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  BarChart2,
  Check,
  Calendar,
  Coins,
  Clock,
} from "lucide-react-native";
import { Box, Text, Card, Button } from "../../components";
import useBookingsStore from "../../stores/bookingsStore";
import useDestinationsStore from "../../stores/destinationsStore";

const TravelStatsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Get bookings data
  const allBookings = useBookingsStore((state) => state.getAllBookings());
  const tours = useDestinationsStore((state) => state.tours);
  const civilizations = useDestinationsStore((state) => state.civilizations);

  // Calculate stats
  const calculateStats = () => {
    if (allBookings.length === 0) {
      return {
        totalSpent: 0,
        totalDays: 0,
        visitedCivilizations: [],
        destinationCounts: {},
      };
    }

    let totalSpent = 0;
    let totalDays = 0;
    const visitedCivs = new Set();
    const destCounts = {};

    // Initialize destination counts
    civilizations.forEach((civ) => {
      destCounts[civ.id] = 0;
    });

    // Process bookings
    allBookings.forEach((booking) => {
      const tour = tours.find((t) => t.id === booking.tourId);
      if (!tour) return;

      // Update stats
      visitedCivs.add(tour.civilizationId);
      destCounts[tour.civilizationId] =
        (destCounts[tour.civilizationId] || 0) + 1;
      totalSpent += booking.totalPrice || 0;

      // Calculate days
      if (booking.travelDates) {
        const start = new Date(booking.travelDates.startDate);
        const end = new Date(booking.travelDates.endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        totalDays += diffDays;
      } else if (tour.duration) {
        totalDays += tour.duration;
      }
    });

    return {
      totalSpent,
      totalDays,
      visitedCivilizations: Array.from(visitedCivs),
      destinationCounts: destCounts,
    };
  };

  const stats = calculateStats();

  // If no bookings yet, show empty state
  if (allBookings.length === 0) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
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
          <Text variant="header">{t("profile.travelStats")}</Text>
        </Box>

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
            <BarChart2 size={40} color={theme.colors.primary} />
          </Box>
          <Text variant="subheader" textAlign="center">
            {t("profile.noStatsYet")}
          </Text>
          <Text
            variant="body"
            textAlign="center"
            marginTop="m"
            color="textSecondary"
          >
            {t("profile.bookForStats")}
          </Text>
          <Button
            label={t("booking.exploreTours")}
            onPress={() =>
              navigation.navigate("ExploreTab", { screen: "Destinations" })
            }
            marginTop="l"
          />
        </Box>
      </SafeAreaView>
    );
  }

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
        <Text variant="header">{t("profile.travelStats")}</Text>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary Stats */}
        <Box padding="m">
          <Box flexDirection="row" marginBottom="m">
            <Card
              flex={1}
              padding="m"
              marginRight="s"
              flexDirection="row"
              alignItems="center"
            >
              <Box
                width={40}
                height={40}
                borderRadius={20}
                backgroundColor={theme.colors.primary + "20"}
                justifyContent="center"
                alignItems="center"
                marginRight="m"
              >
                <Calendar size={20} color={theme.colors.primary} />
              </Box>
              <Box>
                <Text variant="caption" color="textSecondary">
                  {t("profile.totalBookings")}
                </Text>
                <Text variant="subheader" color="primary">
                  {allBookings.length}
                </Text>
              </Box>
            </Card>

            <Card flex={1} padding="m" flexDirection="row" alignItems="center">
              <Box
                width={40}
                height={40}
                borderRadius={20}
                backgroundColor={theme.colors.accentEgypt + "20"}
                justifyContent="center"
                alignItems="center"
                marginRight="m"
              >
                <Coins size={20} color={theme.colors.accentEgypt} />
              </Box>
              <Box>
                <Text variant="caption" color="textSecondary">
                  {t("profile.totalSpent")}
                </Text>
                <Text variant="subheader" color="primary">
                  {stats.totalSpent} {t("explore.denarii")}
                </Text>
              </Box>
            </Card>
          </Box>

          <Card padding="m" flexDirection="row" alignItems="center">
            <Box
              width={40}
              height={40}
              borderRadius={20}
              backgroundColor={theme.colors.accentGreece + "20"}
              justifyContent="center"
              alignItems="center"
              marginRight="m"
            >
              <Clock size={20} color={theme.colors.accentGreece} />
            </Box>
            <Box>
              <Text variant="caption" color="textSecondary">
                {t("profile.daysAbroad")}
              </Text>
              <Text variant="subheader" color="primary">
                {stats.totalDays} {t("explore.days")}
              </Text>
            </Box>
          </Card>
        </Box>

        {/* Civilizations Visited */}
        <Box padding="m">
          <Text variant="subheader" marginBottom="m">
            {t("profile.civilizationsVisited")}
          </Text>

          <Card padding="m" marginBottom="m">
            <Box flexDirection="row" flexWrap="wrap">
              {civilizations.map((civ) => {
                const visited = stats.visitedCivilizations.includes(civ.id);
                return (
                  <Box
                    key={civ.id}
                    flexDirection="row"
                    alignItems="center"
                    width="50%"
                    marginBottom="m"
                  >
                    <Box
                      width={24}
                      height={24}
                      borderRadius={12}
                      backgroundColor={
                        visited
                          ? theme.colors[civ.accentColor] ||
                            theme.colors.primary
                          : theme.colors.textSecondary + "30"
                      }
                      justifyContent="center"
                      alignItems="center"
                      marginRight="s"
                    >
                      {visited && (
                        <Check size={14} color={theme.colors.background} />
                      )}
                    </Box>
                    <Text
                      variant="body"
                      color={visited ? "textPrimary" : "textSecondary"}
                    >
                      {t(`civilizations.${civ.id}.name`)}
                    </Text>
                  </Box>
                );
              })}
            </Box>

            <Box height={1} backgroundColor="border" marginVertical="m" />

            <Box flexDirection="row" justifyContent="space-between">
              <Text variant="body">{t("profile.civilizationsCount")}</Text>
              <Text variant="body" fontWeight="bold">
                {stats.visitedCivilizations.length} / {civilizations.length}
              </Text>
            </Box>
          </Card>
        </Box>

        {/* Destination Comparison */}
        <Box padding="m">
          <Text variant="subheader" marginBottom="m">
            {t("profile.destinationComparison")}
          </Text>

          <Card padding="m" marginBottom="m">
            {Object.entries(stats.destinationCounts)
              .filter(([_, count]) => count > 0)
              .sort(([_, countA], [__, countB]) => countB - countA)
              .map(([civId, count]) => {
                const civ = civilizations.find((c) => c.id === civId);
                if (!civ) return null;

                const maxCount = Math.max(
                  ...Object.values(stats.destinationCounts)
                );
                const percentage = (count / maxCount) * 100;

                return (
                  <Box key={civId} marginBottom="m">
                    <Box
                      flexDirection="row"
                      justifyContent="space-between"
                      marginBottom="xs"
                    >
                      <Text variant="body">
                        {t(`civilizations.${civId}.name`)}
                      </Text>
                      <Text variant="body">
                        {count}{" "}
                        {t(count === 1 ? "profile.visit" : "profile.visits")}
                      </Text>
                    </Box>

                    <Box
                      height={8}
                      backgroundColor={theme.colors.border}
                      borderRadius={4}
                      overflow="hidden"
                    >
                      <Box
                        height={8}
                        width={`${percentage}%`}
                        backgroundColor={
                          theme.colors[civ.accentColor] || theme.colors.primary
                        }
                        borderRadius={4}
                      />
                    </Box>
                  </Box>
                );
              })}

            {Object.values(stats.destinationCounts).every(
              (count) => count === 0
            ) && (
              <Text variant="body" textAlign="center" color="textSecondary">
                {t("profile.noVisitsYet")}
              </Text>
            )}
          </Card>
        </Box>

        {/* Completion Rate */}
        <Box padding="m">
          <Text variant="subheader" marginBottom="m">
            {t("profile.completionRate")}
          </Text>

          <Card padding="m" marginBottom="l">
            <Box alignItems="center">
              <Box
                width={120}
                height={120}
                borderRadius={60}
                borderWidth={8}
                borderColor={theme.colors.secondary}
                justifyContent="center"
                alignItems="center"
                marginBottom="m"
                style={{
                  borderTopColor: theme.colors.primary,
                  transform: [
                    {
                      rotate: `${
                        (stats.visitedCivilizations.length /
                          civilizations.length) *
                        360
                      }deg`,
                    },
                  ],
                }}
              >
                <Box
                  position="absolute"
                  width={104}
                  height={104}
                  borderRadius={52}
                  backgroundColor={theme.colors.cardBackground}
                />

                <Text variant="body" color="textPrimary">
                  {Math.round(
                    (stats.visitedCivilizations.length / civilizations.length) *
                      100
                  )}
                  %
                </Text>
              </Box>

              <Text variant="body" textAlign="center">
                {t("profile.completionDescription")}
              </Text>

              {stats.visitedCivilizations.length < civilizations.length && (
                <Button
                  label={t("profile.exploreMore")}
                  onPress={() =>
                    navigation.navigate("ExploreTab", {
                      screen: "Destinations",
                    })
                  }
                  marginTop="l"
                  variant="outline"
                />
              )}
            </Box>
          </Card>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TravelStatsScreen;
