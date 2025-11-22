import api from "./api";

export const login=(data)=>api.post('/userLogin',data)
export const signup=(data)=>api.post('/users',data)
export const getUser=(id)=>api.get(`/users?id=${id}`)
export const updateUser=({id,...data})=>api.put(`/users?id=${id}`,data)

// export const signup = (data) => 
//   api.post('/users', JSON.stringify(data), {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });
