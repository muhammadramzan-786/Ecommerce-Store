import { create } from "zustand";

export const useProductsStore=create((set)=>({
    products:[],
    isLoading:false,
    error:false,
    setProducts:(data)=>set({products:data}),
    setLoading:(loading)=>set({isLoading:loading}),
    setError:(error)=>set({error:error || null})
}))