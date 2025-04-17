// src/navigation/HomeNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home/HomeScreen";
import TourDetailsScreen from "../screens/explore/TourDetailsScreen";
import BookingNavigator from "./BookingNavigator";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TourDetails" component={TourDetailsScreen} />
      <Stack.Screen
        name="BookingFlow"
        component={BookingNavigator}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
