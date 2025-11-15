import api from "../api/api"

export const createCart=({ userId, productId, quantity = 1 })=>api.post(`/cart?userId=${userId}`,{productId,quantity})
export const getCart=(id)=>api.get(`/cart?userId=${id}`)
export const DeleteCartProduct=({userId,productId})=>api.delete(`/cart?userId=${userId}&productId=${productId}`)