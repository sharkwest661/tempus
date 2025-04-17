// src/stores/favoritesStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      // Add a tour to favorites
      addFavorite: (tourId) => {
        // Check if already in favorites
        if (get().favorites.includes(tourId)) {
          return;
        }

        set((state) => ({
          favorites: [...state.favorites, tourId],
        }));
      },

      // Remove a tour from favorites
      removeFavorite: (tourId) => {
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== tourId),
        }));
      },

      // Toggle favorite status
      toggleFavorite: (tourId) => {
        if (get().favorites.includes(tourId)) {
          get().removeFavorite(tourId);
        } else {
          get().addFavorite(tourId);
        }
      },

      // Check if a tour is in favorites
      isFavorite: (tourId) => {
        return get().favorites.includes(tourId);
      },

      // Get all favorite tour IDs
      getFavorites: () => {
        return get().favorites;
      },

      // Clear all favorites
      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "tempus-tours-favorites",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useFavoritesStore;
