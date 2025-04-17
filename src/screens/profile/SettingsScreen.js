// src/screens/profile/SettingsScreen.js
import React from "react";
import { ScrollView, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Moon,
  Sun,
  Globe,
  Bell,
  FileText,
  HelpCircle,
} from "lucide-react-native";
import { Box, Text, Card } from "../../components";
import useThemeStore from "../../stores/themeStore";
import i18n from "../../i18n";

const SettingsScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Get theme state and actions following Zustand patterns
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const followSystem = useThemeStore((state) => state.followSystem);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const toggleFollowSystem = useThemeStore((state) => state.toggleFollowSystem);

  // Language options
  const languages = [
    { code: "en", name: "English" },
    { code: "az", name: "Azərbaycan" },
  ];

  const currentLanguage = i18n.language;

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    // Save language preference
    import("@react-native-async-storage/async-storage").then((AsyncStorage) => {
      AsyncStorage.default.setItem("language", langCode);
    });
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
        <Text variant="header">{t("profile.settings")}</Text>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Theme Settings */}
        <Box padding="m">
          <Text variant="subheader" marginBottom="m">
            {t("profile.theme")}
          </Text>

          <Card padding="m" marginBottom="m">
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="m"
            >
              <Box flexDirection="row" alignItems="center">
                <Box
                  width={40}
                  height={40}
                  borderRadius="l"
                  backgroundColor="secondaryTransparent"
                  justifyContent="center"
                  alignItems="center"
                  marginRight="m"
                >
                  <Sun size={20} color={theme.colors.primary} />
                </Box>
                <Text variant="body">{t("profile.lightTheme")}</Text>
              </Box>
              <Switch
                value={!isDarkMode && !followSystem}
                onValueChange={() => {
                  if (followSystem || isDarkMode) {
                    useThemeStore.getState().setThemeMode(false);
                  }
                }}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primary,
                }}
                thumbColor={
                  !isDarkMode && !followSystem
                    ? theme.colors.secondary
                    : theme.colors.cardBackground
                }
              />
            </Box>

            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="m"
            >
              <Box flexDirection="row" alignItems="center">
                <Box
                  width={40}
                  height={40}
                  borderRadius="l"
                  backgroundColor="primaryTransparent"
                  justifyContent="center"
                  alignItems="center"
                  marginRight="m"
                >
                  <Moon size={20} color={theme.colors.primary} />
                </Box>
                <Text variant="body">{t("profile.darkTheme")}</Text>
              </Box>
              <Switch
                value={isDarkMode && !followSystem}
                onValueChange={() => {
                  if (followSystem || !isDarkMode) {
                    useThemeStore.getState().setThemeMode(true);
                  }
                }}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primary,
                }}
                thumbColor={
                  isDarkMode && !followSystem
                    ? theme.colors.secondary
                    : theme.colors.cardBackground
                }
              />
            </Box>

            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box flexDirection="row" alignItems="center">
                <Box
                  width={40}
                  height={40}
                  borderRadius="l"
                  backgroundColor="infoTransparent"
                  justifyContent="center"
                  alignItems="center"
                  marginRight="m"
                >
                  <Globe size={20} color={theme.colors.info} />
                </Box>
                <Text variant="body">{t("profile.followSystem")}</Text>
              </Box>
              <Switch
                value={followSystem}
                onValueChange={toggleFollowSystem}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primary,
                }}
                thumbColor={
                  followSystem
                    ? theme.colors.secondary
                    : theme.colors.cardBackground
                }
              />
            </Box>
          </Card>
        </Box>

        {/* Language Settings */}
        <Box padding="m">
          <Text variant="subheader" marginBottom="m">
            {t("profile.language")}
          </Text>

          <Card padding="m" marginBottom="m">
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                onPress={() => handleLanguageChange(language.code)}
                style={{
                  marginBottom:
                    language.code !== languages[languages.length - 1].code
                      ? theme.spacing.m
                      : 0,
                }}
              >
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text variant="body">{language.name}</Text>
                  <Box
                    width={20}
                    height={20}
                    borderRadius={"m"}
                    borderWidth={2}
                    borderColor="primary"
                    backgroundColor={
                      currentLanguage === language.code
                        ? "primary"
                        : "transparent"
                    }
                    justifyContent="center"
                    alignItems="center"
                  />
                </Box>
              </TouchableOpacity>
            ))}
          </Card>
        </Box>

        {/* Other Settings */}
        <Box padding="m">
          <Text variant="subheader" marginBottom="m">
            {t("general.appName")}
          </Text>

          <TouchableOpacity style={{ marginBottom: theme.spacing.m }}>
            <Card
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              padding="m"
            >
              <Box flexDirection="row" alignItems="center">
                <Box
                  width={40}
                  height={40}
                  borderRadius="l"
                  backgroundColor="errorTransparent"
                  justifyContent="center"
                  alignItems="center"
                  marginRight="m"
                >
                  <Bell size={20} color={theme.colors.warning} />
                </Box>
                <Text variant="body">{t("profile.notifications")}</Text>
              </Box>
              <ArrowLeft
                size={20}
                color={theme.colors.textSecondary}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </Card>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginBottom: theme.spacing.m }}>
            <Card
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              padding="m"
            >
              <Box flexDirection="row" alignItems="center">
                <Box
                  width={40}
                  height={40}
                  borderRadius="l"
                  backgroundColor="accentGreeceTransparent"
                  justifyContent="center"
                  alignItems="center"
                  marginRight="m"
                >
                  <FileText size={20} color={theme.colors.accentGreece} />
                </Box>
                <Text variant="body">{t("profile.privacyPolicy")}</Text>
              </Box>
              <ArrowLeft
                size={20}
                color={theme.colors.textSecondary}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </Card>
          </TouchableOpacity>

          <TouchableOpacity>
            <Card
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              padding="m"
            >
              <Box flexDirection="row" alignItems="center">
                <Box
                  width={40}
                  height={40}
                  borderRadius="l"
                  backgroundColor="accentPersiaTransparent"
                  justifyContent="center"
                  alignItems="center"
                  marginRight="m"
                >
                  <HelpCircle size={20} color={theme.colors.accentPersia} />
                </Box>
                <Text variant="body">{t("profile.helpCenter")}</Text>
              </Box>
              <ArrowLeft
                size={20}
                color={theme.colors.textSecondary}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </Card>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
