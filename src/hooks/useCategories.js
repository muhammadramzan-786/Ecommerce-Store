import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/category";
import { useCategoryStore } from "../stores/categoryStore";

export function useCategories() {
  const setcategories=useCategoryStore((state)=>state.setCategories)
  const setCategoryLoading=useCategoryStore((state)=>state.setCategoryLoading)
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      setCategoryLoading(true)
      const res=await getCategories()
      
      // console.log(res);
      if(res.data){
        setcategories(res.data)
      }else{
        setcategories([])
      }
        
        setCategoryLoading(false)
      return res.data
    },
  });
}