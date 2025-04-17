// src/stores/bookingsStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

const useBookingsStore = create(
  persist(
    (set, get) => ({
      bookings: [],
      currentBooking: null,
      bookingStep: 0, // 0: calendar, 1: traveler info, 2: payment, 3: confirmation
      isLoading: false,
      error: null,

      // Start a new booking for a tour
      startBooking: (tourId) => {
        set({
          currentBooking: {
            id: uuidv4(),
            tourId,
            travelDates: null,
            travelers: [],
            totalPrice: 0,
            paymentMethod: null,
            status: "draft",
            createdAt: new Date().toISOString(),
          },
          bookingStep: 0,
        });
      },

      // Set travel dates
      setTravelDates: (startDate, endDate) => {
        set((state) => ({
          currentBooking: {
            ...state.currentBooking,
            travelDates: { startDate, endDate },
          },
          bookingStep: 1,
        }));
      },

      // Add traveler information
      setTravelers: (travelers) => {
        set((state) => ({
          currentBooking: {
            ...state.currentBooking,
            travelers,
          },
          bookingStep: 2,
        }));
      },

      // Calculate total price (called after setting travelers)
      calculateTotal: (tourPrice) => {
        const travelerCount = get().currentBooking.travelers.length;
        const totalPrice = tourPrice * travelerCount;

        set((state) => ({
          currentBooking: {
            ...state.currentBooking,
            totalPrice,
          },
        }));

        return totalPrice;
      },

      // Set payment information
      setPaymentInfo: (paymentMethod) => {
        set((state) => ({
          currentBooking: {
            ...state.currentBooking,
            paymentMethod,
            status: "confirmed",
          },
          bookingStep: 3,
        }));
      },

      // Confirm and save the booking
      confirmBooking: () => {
        set((state) => {
          const confirmedBooking = {
            ...state.currentBooking,
            confirmationCode: generateConfirmationCode(),
            confirmedAt: new Date().toISOString(),
          };

          return {
            bookings: [...state.bookings, confirmedBooking],
            currentBooking: null,
            bookingStep: 0,
          };
        });
      },

      // Cancel current booking process
      cancelBookingProcess: () => {
        set({
          currentBooking: null,
          bookingStep: 0,
        });
      },

      // Get all bookings
      getAllBookings: () => {
        return get().bookings;
      },

      // Get active bookings (future travel dates)
      getActiveBookings: () => {
        const now = new Date();
        return get().bookings.filter(
          (booking) =>
            booking.status === "confirmed" &&
            new Date(booking.travelDates.endDate) >= now
        );
      },

      // Get booking history (past travel dates)
      getBookingHistory: () => {
        const now = new Date();
        return get().bookings.filter(
          (booking) =>
            booking.status === "confirmed" &&
            new Date(booking.travelDates.endDate) < now
        );
      },

      // Get a specific booking by ID
      getBookingById: (id) => {
        return get().bookings.find((booking) => booking.id === id);
      },

      // Cancel a confirmed booking
      cancelBooking: (id) => {
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === id
              ? {
                  ...booking,
                  status: "cancelled",
                  cancelledAt: new Date().toISOString(),
                }
              : booking
          ),
        }));
      },

      // Get current booking step
      getCurrentStep: () => {
        return get().bookingStep;
      },

      // Navigate to a specific booking step
      goToStep: (step) => {
        set({ bookingStep: step });
      },

      // Clear error state
      clearError: () => set({ error: null }),
    }),
    {
      name: "tempus-tours-bookings",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        bookings: state.bookings,
      }),
    }
  )
);

// Helper function to generate a confirmation code
const generateConfirmationCode = () => {
  // Format: ROME-XXXX where X is an uppercase letter or number
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "ROME-";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
};

export default useBookingsStore;
