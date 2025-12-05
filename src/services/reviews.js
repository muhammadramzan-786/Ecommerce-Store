import api from "../api/api";

export const unreviewed_products=(userId)=>api.get(`/reviews?action=unreviewed-products&userId=${userId}`)

export const reviewed_products=(userId)=>api.get(`/reviews?action=reviewed-products&userId=${userId}`)

export const productReviews=(id)=>api.get(`reviews?productId=${id}`)

export const submitReview=(data)=>api.post("/reviews",data)
