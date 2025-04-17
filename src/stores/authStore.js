// src/stores/authStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: "1",
    username: "marcus",
    password: "password123", // In a real app, never store plain text passwords
    name: "Marcus Aurelius",
    citizenship: "Roman",
    profileImage: null,
  },
  {
    id: "2",
    username: "livia",
    password: "password123",
    name: "Livia Drusilla",
    citizenship: "Roman",
    profileImage: null,
  },
];

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Login user
      login: (username, password) => {
        set({ isLoading: true, error: null });

        // Simulate API call delay
        setTimeout(() => {
          const foundUser = MOCK_USERS.find(
            (user) => user.username === username && user.password === password
          );

          if (foundUser) {
            // Remove password from user object before storing
            const { password, ...userWithoutPassword } = foundUser;
            set({
              user: userWithoutPassword,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: "Invalid username or password",
            });
          }
        }, 1000);
      },

      // Register new user
      register: (username, password, name, citizenship) => {
        set({ isLoading: true, error: null });

        // Simulate API call delay
        setTimeout(() => {
          // Check if username already exists
          const userExists = MOCK_USERS.some(
            (user) => user.username === username
          );

          if (userExists) {
            set({
              isLoading: false,
              error: "Username already exists",
            });
            return;
          }

          // Create new user
          const newUser = {
            id: (MOCK_USERS.length + 1).toString(),
            username,
            password,
            name,
            citizenship,
            profileImage: null,
          };

          // Add to mock users (in a real app, this would be a server-side operation)
          MOCK_USERS.push(newUser);

          // Log user in after registration
          const { password: _, ...userWithoutPassword } = newUser;
          set({
            user: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        }, 1000);
      },

      // Login as guest
      loginAsGuest: () => {
        set({
          user: {
            id: "guest",
            username: "guest",
            name: "Roman Traveler",
            citizenship: "Roman",
            isGuest: true,
          },
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      // Logout user
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Update user profile
      updateProfile: (updates) => {
        set((state) => ({
          user: {
            ...state.user,
            ...updates,
          },
        }));
      },

      // Clear error state
      clearError: () => set({ error: null }),
    }),
    {
      name: "tempus-tours-auth",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
