import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContact, getContact } from "../services/contact";

export function useGetContact(){
    return useQuery({
        queryKey:["contact"],
        queryFn:async ()=> (await getContact()).data,
    })
}

export function useCreateContact(params) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn:createContact,
        onSuccess:()=> qc.invalidateQueries(["contact"])
    })
}