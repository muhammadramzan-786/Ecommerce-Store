import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  loading:false,
  setUser: (userData) => set({ user: userData }),
  setLoading:(loading)=>set({loading:loading})
}));
