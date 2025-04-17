// src/navigation/BookingNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CalendarSelectionScreen from "../screens/booking/CalendarSelectionScreen";
import TravelerInfoScreen from "../screens/booking/TravelerInfoScreen";
import PaymentScreen from "../screens/booking/PaymentScreen";
import ConfirmationScreen from "../screens/booking/ConfirmationScreen";

const Stack = createStackNavigator();

const BookingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="CalendarSelection"
        component={CalendarSelectionScreen}
      />
      <Stack.Screen name="TravelerInfo" component={TravelerInfoScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
    </Stack.Navigator>
  );
};

export default BookingNavigator;
