import api from "../api/api";

export const getContact=()=>api.get("/contact")
export const createContact=({ userId, fullName, email, message })=>api.post("/contact", { userId, fullName, email, message })