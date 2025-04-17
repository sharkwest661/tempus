// src/components/SpecialOfferCard.js
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@shopify/restyle";
import { Tag } from "lucide-react-native";
import Box from "./Box";
import Text from "./Text";
import Card from "./Card";

const SpecialOfferCard = ({ offer, onPress }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card
        flexDirection="row"
        alignItems="center"
        padding="m"
        marginRight="m"
        width={280}
      >
        <Box
          backgroundColor={
            theme.colors[offer.accentColor] || theme.colors.primary
          }
          width={40}
          height={40}
          borderRadius={20}
          justifyContent="center"
          alignItems="center"
          marginRight="m"
        >
          <Tag size={20} color={theme.colors.background} />
        </Box>

        <Box flex={1}>
          <Text variant="subheader" numberOfLines={1}>
            {offer.title}
          </Text>
          <Text variant="caption" marginTop="xs" numberOfLines={2}>
            {offer.description}
          </Text>
        </Box>
      </Card>
    </TouchableOpacity>
  );
};

export default SpecialOfferCard;
