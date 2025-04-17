// src/screens/auth/WelcomeScreen.js
import React from "react";
import { Image, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { Box, Text, Button } from "../../components";
import useAuthStore from "../../stores/authStore";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const loginAsGuest = useAuthStore((state) => state.loginAsGuest);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Box flex={1} padding="l" justifyContent="space-between">
        <Box alignItems="center" marginTop="xl">
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
          <Box marginTop="l">
            <Text variant="header" textAlign="center">
              {t("auth.welcome")}
            </Text>
            <Text variant="body" textAlign="center" marginTop="s">
              {t("auth.welcomeSubtitle")}
            </Text>
          </Box>
        </Box>

        {/* Roman scene image */}
        <Box alignItems="center" marginVertical="xl">
          <Image
            source={require("../../assets/images/welcome-illustration.png")}
            style={{ width: "100%", height: 250 }}
            resizeMode="contain"
          />
        </Box>

        {/* Buttons */}
        <Box marginBottom="l">
          <Button
            label={t("auth.login")}
            onPress={() => navigation.navigate("Login")}
            marginBottom="m"
          />
          <Button
            label={t("auth.signup")}
            variant="secondary"
            onPress={() => navigation.navigate("Signup")}
            marginBottom="m"
          />
          <Button
            label={t("auth.guestMode")}
            variant="outline"
            onPress={loginAsGuest}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
