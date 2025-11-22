import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrder, deleteOrder, getOrders } from "../services/orders";

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

export function useDeleteOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: (_,vars) => qc.invalidateQueries(["orders",vars.orderId]),
  });
}