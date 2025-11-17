import api from "../api/api";

export const getOrders=(id)=>api.get(`/orders?userId=${id}`)
export const createOrder=(data)=>api.post(`/orders`,data)