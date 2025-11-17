import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  setUser: (userData, token) =>
    set({
      user: userData,
      token: token,
      isLoggedIn: true,
    }),

  updateUser: (newData) =>
    set((state) => ({
      user: { ...state.user, ...newData },
    })),

  logout: () =>
    set({
      user: null,
      token: null,
      isLoggedIn: false,
    }),
}));
