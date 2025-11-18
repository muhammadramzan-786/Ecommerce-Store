import { create } from "zustand";

export const useCartStore=create((set)=>({
    cart:[],
    setCart:(data)=>set({cart:data})
}))