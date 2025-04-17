// src/components/SectionHeader.js
import React from "react";
import { TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react-native";
import { useTheme } from "@shopify/restyle";
import Box from "./Box";
import Text from "./Text";

const SectionHeader = ({ title, onPress, showViewAll = true }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      marginVertical="m"
      paddingHorizontal="m"
    >
      <Text variant="subheader">{title}</Text>

      {showViewAll && (
        <TouchableOpacity onPress={onPress}>
          <Box flexDirection="row" alignItems="center">
            <Text variant="caption" color="primary" marginRight="xs">
              {t("home.viewAll")}
            </Text>
            <ChevronRight size={16} color={theme.colors.primary} />
          </Box>
        </TouchableOpacity>
      )}
    </Box>
  );
};

export default SectionHeader;
