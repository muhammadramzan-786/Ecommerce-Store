import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/category";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await getCategories()).data,
  });
}