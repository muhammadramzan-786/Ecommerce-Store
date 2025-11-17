import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrder, getOrders } from "../services/orders";

export function useGetOrders(id) {
    return useQuery({
        queryKey:["orders",id],
        queryFn:async()=>(await getOrders(id)).data,
        enabled:!!id,
        initialData: {},
    })
    
}

export function useAddOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (_,vars) => qc.invalidateQueries(["orders",vars.userId]),
  });
}