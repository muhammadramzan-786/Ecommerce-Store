import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCart, DeleteCartProduct, getCart } from "../services/cart";
import { useCartStore } from "../stores/cartStore";

// -------------------------------
// GET CART
// -------------------------------
export function useGetCart(userId) {
  const setCart=useCartStore((state)=>state.setCart)
  return useQuery({
    queryKey: ["cart",userId],
    // queryFn:  () =>  getCart(userId).then((res)=>{res.data;setCart(res.data)}),
    queryFn:async()=>{
      const res=await getCart(userId)
      if(res.data){
        setCart(res.data)
      }
      return res.data
    },
    enabled:!!userId,
    staleTime: 1000 * 60 * 5,
  });
}

// -------------------------------
// ADD TO CART
// -------------------------------
export function useAddCart() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createCart,
    onSuccess: (_,vars) => qc.invalidateQueries(["cart",vars.userId]),
  });
}

// -------------------------------
// DELETE CART ITEM
// -------------------------------
export function useDeleteCartProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: DeleteCartProduct,
    onSuccess: (_,vars) => qc.invalidateQueries(["cart",vars.userId]),
  });
}

