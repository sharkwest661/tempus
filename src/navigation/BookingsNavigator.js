// src/navigation/BookingsNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ActiveBookingsScreen from "../screens/bookings/ActiveBookingsScreen";
import BookingHistoryScreen from "../screens/bookings/BookingHistoryScreen";
import BookingDetailsScreen from "../screens/bookings/BookingDetailsScreen";

const Stack = createStackNavigator();

const BookingsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ActiveBookings" component={ActiveBookingsScreen} />
      <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} />
      <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
    </Stack.Navigator>
  );
};

export default BookingsNavigator;
