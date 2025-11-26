import { create } from "zustand";

export const useCartStore=create((set)=>({
    cart:{ items: [] },
    setCart:(data)=>set({cart:data}),
    // updateQuantity: (id, change) =>
    // set((state) => ({
    //   cart: {
    //     ...state.cart,
    //     items: state.cart.items.map((item) => {
    //       if (item._id === id) {
    //         const newQuantity = change;
    //         console.log(newQuantity);
            
    //         if (newQuantity >= 1 ) {
    //             console.log("inner");
    //           return { ...item, quantity: newQuantity };
    //         }
    //       }
    //       return item;
    //     }),
    //   },
    // })),
}))