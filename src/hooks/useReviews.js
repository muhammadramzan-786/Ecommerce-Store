import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productReviews, reviewed_products, submitReview, unreviewed_products } from "../services/reviews";
import { useAuthStore } from "./useAuthStore";

export function useGetUnReviewedProducts(){
    const userId=useAuthStore(state=>state?.userId)
    return useQuery({
        queryKey:["unreviewed-products", userId],
        queryFn:async ()=> (await unreviewed_products(userId)).data,
    })
}

export function useGetReviewedProducts(){
    const userId=useAuthStore(state=>state?.userId)
    return useQuery({
        queryKey:["reviewed-products", userId],
        queryFn:async ()=> (await reviewed_products(userId)).data,
    })
}

export function useGetProductReviews(id){
    return useQuery({
        queryKey:['products-reviews',id],
        queryFn:async ()=>(await productReviews(id)).data,
    })
}

export function useSubmitReview(params) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn:submitReview,
        onSuccess:()=> qc.invalidateQueries(["reviews"])
    })
}