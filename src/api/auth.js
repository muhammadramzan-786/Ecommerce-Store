import api from "./api";

export const login=(data)=>api.post('/userLogin',data)
export const signup = (data) => 
  api.post('/users', JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json"
    }
  });
