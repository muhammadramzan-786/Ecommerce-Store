import { create } from "zustand";

export const useCategoryStore=create((set)=>({
    categories:[],
    loading:false,
    setCategories:(data)=>set({categories:data}),
    setCategoryLoading:(loading)=>set({loading:loading}),
}))