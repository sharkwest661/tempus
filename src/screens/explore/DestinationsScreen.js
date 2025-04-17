// src/screens/explore/DestinationsScreen.js
import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { Search, SlidersHorizontal } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Text, CivilizationCard } from "../../components";
import useDestinationsStore from "../../stores/destinationsStore";

const DestinationsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Get civilizations from store
  const civilizations = useDestinationsStore((state) => state.civilizations);

  const handleCivilizationPress = (civilizationId) => {
    // Set selected civilization in the store
    useDestinationsStore.getState().setSelectedCivilization(civilizationId);
    // Navigate to civilization screen
    navigation.navigate("Civilization", { id: civilizationId });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <Box padding="m">
        <Text variant="header">{t("explore.destinations")}</Text>
        <Text variant="body" marginTop="xs">
          {t("explore.exploreByCivilization")}
        </Text>
      </Box>

      {/* Search & Filter */}
      <Box flexDirection="row" paddingHorizontal="m" marginBottom="m">
        <TouchableOpacity activeOpacity={0.8} style={{ flex: 1 }}>
          <Box
            flexDirection="row"
            alignItems="center"
            padding="m"
            backgroundColor="cardBackground"
            borderRadius="m"
            borderWidth={1}
            borderColor="border"
            marginRight="s"
          >
            <Search color={theme.colors.textSecondary} size={20} />
            <Text variant="body" color="textSecondary" marginLeft="m">
              {t("general.search")}
            </Text>
          </Box>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.filterButton,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <SlidersHorizontal color={theme.colors.textPrimary} size={20} />
        </TouchableOpacity>
      </Box>

      {/* List of civilizations */}
      <FlatList
        data={civilizations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Box paddingHorizontal="m" marginBottom="m">
            <CivilizationCard
              civilization={item}
              onPress={() => handleCivilizationPress(item.id)}
              style={{ width: "100%" }}
            />
          </Box>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
});

export default DestinationsScreen;
