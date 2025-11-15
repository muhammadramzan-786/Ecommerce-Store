import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/auth";

export function useUser(id) {
    return useQuery({
        queryKey:["user",id],
        queryFn:async()=>(await getUser(id)).data,
        enabled:!!id
    })
    
}