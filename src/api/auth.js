import api from "./api";

export const login=(data)=>api.post('/userLogin',data)
export const signup=(data)=>api.post('/users',data)
export const getUser=(id)=>api.get(`/users?id=${id}`)
export const updateUser=({id,...data})=>api.put(`/users?id=${id}`,data)

export const forgotPassword=({ email })=>api.post('/userLogin?action=forgotPassword', { email })
export const resetPassword=({ token, password })=>api.post('/userLogin?action=resetPassword', { token, password })
export const signUp=(data)=>api.post('/users',data)
export const userExist=({ email })=>api.post(`/userLogin?action=checkUserExists`,{email})

// export const signup = (data) => 
//   api.post('/users', JSON.stringify(data), {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });
