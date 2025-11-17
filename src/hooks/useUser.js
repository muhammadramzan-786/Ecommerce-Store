import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/auth";
import { useUserStore } from "../stores/userStore";

export function useUser(id) {
    const setUser=useUserStore((state)=>state.setUser)
    return useQuery({
        
        queryKey:["user",id],
        queryFn: async () => {
  const res = await getUser(id);

  if (!res.data || (Array.isArray(res.data) && res.data.length === 0)) {
    throw new Error("USER_NOT_FOUND");
  }
setUser(res?.data)
  return res.data;
},
        enabled:!!id,
        onSuccess:(data)=>{
            console.log("API DATA:", data);
            const user=Array.isArray(data)?data[0]:data
            console.log("EXTRACTED USER:", user);
            setUser(user, user?.token)
        },
        initialData: {},
    })
    
}