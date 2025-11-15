import api from "../api/api";

export const getCategories=(data)=>api.get('/category',data)