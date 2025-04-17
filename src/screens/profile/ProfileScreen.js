// src/screens/profile/ProfileScreen.js
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  User,
  Heart,
  CalendarDays,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react-native";
import { Box, Text, Card } from "../../components";
import useAuthStore from "../../stores/authStore";

const ProfileScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Get user from auth store following Zustand patterns
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const profileOptions = [
    {
      icon: Heart,
      title: t("profile.favorites"),
      screen: "Favorites",
      color: theme.colors.error,
    },
    {
      icon: CalendarDays,
      title: t("profile.bookingHistory"),
      screen: "BookingHistory",
      color: theme.colors.accentEgypt,
    },
    {
      icon: Settings,
      title: t("profile.settings"),
      screen: "Settings",
      color: theme.colors.textSecondary,
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Box padding="m">
          <Text variant="header">{t("profile.profile")}</Text>
        </Box>

        {/* User Info Card */}
        <Box padding="m">
          <Card flexDirection="row" alignItems="center" padding="m">
            <Box
              width={70}
              height={70}
              borderRadius={"xl"}
              backgroundColor="secondary"
              justifyContent="center"
              alignItems="center"
              marginRight="m"
            >
              {user.profileImage ? (
                <Image
                  source={{ uri: user.profileImage }}
                  style={{ width: 70, height: 70, borderRadius: 35 }}
                />
              ) : (
                <User size={30} color={theme.colors.primary} />
              )}
            </Box>

            <Box flex={1}>
              <Text variant="subheader">{user.name}</Text>
              <Text variant="body" marginTop="xs" color="textSecondary">
                {user.isGuest
                  ? t("auth.guestMode")
                  : `${t("auth.citizenship")}: ${user.citizenship}`}
              </Text>
            </Box>

            {!user.isGuest && (
              <TouchableOpacity
                onPress={() => {
                  /* Handle edit profile */
                }}
              >
                <Text variant="body" color="primary">
                  {t("profile.editProfile")}
                </Text>
              </TouchableOpacity>
            )}
          </Card>
        </Box>

        {/* Profile Options */}
        <Box padding="m">
          {profileOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(option.screen)}
              style={{ marginBottom: theme.spacing.m }}
            >
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
                    borderRadius={"l"}
                    backgroundColor={option.color}
                    opacity={0.2}
                    justifyContent="center"
                    alignItems="center"
                    marginRight="m"
                  >
                    <option.icon size={20} color={option.color} />
                  </Box>
                  <Text variant="body">{option.title}</Text>
                </Box>
                <ChevronRight size={20} color={theme.colors.textSecondary} />
              </Card>
            </TouchableOpacity>
          ))}
        </Box>

        {/* Logout Button */}
        <Box padding="m">
          <TouchableOpacity onPress={handleLogout}>
            <Card
              flexDirection="row"
              alignItems="center"
              padding="m"
              backgroundColor="errorTransparent"
            >
              <Box
                width={40}
                height={40}
                borderRadius={"l"}
                backgroundColor="errorTransparent"
                justifyContent="center"
                alignItems="center"
                marginRight="m"
              >
                <LogOut size={20} color={theme.colors.error} />
              </Box>
              <Text variant="body" color="error">
                {t("profile.logout")}
              </Text>
            </Card>
          </TouchableOpacity>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
