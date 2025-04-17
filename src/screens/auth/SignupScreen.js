// src/screens/auth/SignupScreen.js
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

const SignupScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [validationError, setValidationError] = useState("");

  // Get auth state and actions
  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const handleSignup = () => {
    // Clear any previous errors
    setValidationError("");
    clearError();

    // Validate form
    if (username.trim() === "" || password === "" || name.trim() === "") {
      setValidationError(t("auth.allFieldsRequired"));
      return;
    }

    if (password !== confirmPassword) {
      setValidationError(t("auth.passwordsMustMatch"));
      return;
    }

    // All validation passed, register user
    register(username, password, name, "Roman");
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
              <Text variant="header">{t("auth.signup")}</Text>
              <Text variant="body" marginTop="s">
                {t("auth.signupSubtitle")}
              </Text>
            </Box>

            {/* Signup Form */}
            <Box marginTop="l">
              {/* Full Name Input */}
              <Text variant="body" marginBottom="s">
                {t("auth.name")}
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
                placeholder={t("auth.name")}
                placeholderTextColor={theme.colors.textSecondary}
                value={name}
                onChangeText={setName}
              />

              {/* Username Input */}
              <Text variant="body" marginTop="l" marginBottom="s">
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
                onChangeText={setUsername}
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
                onChangeText={setPassword}
                secureTextEntry
              />

              {/* Confirm Password Input */}
              <Text variant="body" marginTop="l" marginBottom="s">
                {t("auth.confirmPassword")}
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
                placeholder={t("auth.confirmPassword")}
                placeholderTextColor={theme.colors.textSecondary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              {/* Error message */}
              {validationError || error ? (
                <Text variant="caption" color="error" marginTop="s">
                  {validationError || error}
                </Text>
              ) : null}

              {/* Signup Button */}
              <Button
                label={t("auth.signup")}
                onPress={handleSignup}
                marginTop="l"
                disabled={isLoading}
              />

              {/* Login link */}
              <Box flexDirection="row" justifyContent="center" marginTop="l">
                <Text variant="body">{t("auth.haveAccount")}</Text>
                <TouchableOpacity
                  onPress={() => {
                    clearError();
                    navigation.navigate("Login");
                  }}
                  style={{ marginLeft: 5 }}
                >
                  <Text variant="body" color="primary">
                    {t("auth.login")}
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

export default SignupScreen;
