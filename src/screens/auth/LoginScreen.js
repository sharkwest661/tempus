// src/screens/auth/LoginScreen.js
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { Box, Text, Button } from "../../components";
import useAuthStore from "../../stores/authStore";

const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Get authentication state and actions following Zustand patterns
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const handleLogin = () => {
    if (username.trim() === "" || password === "") {
      // Show validation error
      return;
    }

    login(username, password);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Box flex={1} padding="l">
            {/* Header with back button */}
            <TouchableOpacity
              onPress={() => {
                clearError();
                navigation.goBack();
              }}
              style={styles.backButton}
            >
              <ArrowLeft color={theme.colors.textPrimary} size={24} />
            </TouchableOpacity>

            <Box marginTop="xl">
              <Text variant="header">{t("auth.login")}</Text>
              <Text variant="body" marginTop="s">
                {t("auth.loginSubtitle")}
              </Text>
            </Box>

            {/* Login Form */}
            <Box marginTop="xl">
              {/* Username Input */}
              <Text variant="body" marginBottom="s">
                {t("auth.username")}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.cardBackground,
                    borderColor: theme.colors.border,
                    color: theme.colors.textPrimary,
                  },
                ]}
                placeholder={t("auth.username")}
                placeholderTextColor={theme.colors.textSecondary}
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  if (error) clearError();
                }}
                autoCapitalize="none"
              />

              {/* Password Input */}
              <Text variant="body" marginTop="l" marginBottom="s">
                {t("auth.password")}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.colors.cardBackground,
                    borderColor: theme.colors.border,
                    color: theme.colors.textPrimary,
                  },
                ]}
                placeholder={t("auth.password")}
                placeholderTextColor={theme.colors.textSecondary}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (error) clearError();
                }}
                secureTextEntry
              />

              {/* Error message */}
              {error ? (
                <Text variant="caption" color="error" marginTop="s">
                  {error}
                </Text>
              ) : null}

              {/* Forgot password link */}
              <TouchableOpacity
                onPress={() => {
                  /* Handle forgot password */
                }}
                style={{ alignSelf: "flex-end", marginTop: 10 }}
              >
                <Text variant="caption" color="primary">
                  {t("auth.forgotPassword")}
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <Button
                label={t("auth.login")}
                onPress={handleLogin}
                marginTop="l"
                disabled={isLoading}
              />

              {/* Sign up link */}
              <Box flexDirection="row" justifyContent="center" marginTop="l">
                <Text variant="body">{t("auth.noAccount")}</Text>
                <TouchableOpacity
                  onPress={() => {
                    clearError();
                    navigation.navigate("Signup");
                  }}
                  style={{ marginLeft: 5 }}
                >
                  <Text variant="body" color="primary">
                    {t("auth.signup")}
                  </Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default LoginScreen;
