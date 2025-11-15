import { useQuery } from "@tanstack/react-query";
import { getProducts, getSingleProduct } from "../services/product";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => (await getProducts()).data,
  });
}

export function useSingleProduct(id){
  return useQuery({
    queryKey:["products",id],
    queryFn:async()=>(await getSingleProduct(id)).data,
    enabled:!!id
  })
}