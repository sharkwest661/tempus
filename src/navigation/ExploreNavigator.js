// src/navigation/ExploreNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DestinationsScreen from "../screens/explore/DestinationsScreen";
import CivilizationScreen from "../screens/explore/CivilizationScreen";
import TourDetailsScreen from "../screens/explore/TourDetailsScreen";
import BookingNavigator from "./BookingNavigator";

const Stack = createStackNavigator();

const ExploreNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Destinations" component={DestinationsScreen} />
      <Stack.Screen name="Civilization" component={CivilizationScreen} />
      <Stack.Screen name="TourDetails" component={TourDetailsScreen} />
      <Stack.Screen
        name="BookingFlow"
        component={BookingNavigator}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

export default ExploreNavigator;
