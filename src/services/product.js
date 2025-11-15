import api from "../api/api";

export const getProducts=(data)=>api.get('/products',data)
export const getSingleProduct=(id)=>api.get(`/products?id=${id}`)