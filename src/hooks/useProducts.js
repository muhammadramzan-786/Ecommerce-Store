import { useQuery } from "@tanstack/react-query";
import { getProducts, getSingleProduct } from "../services/product";
import { useProductsStore } from "../stores/productsStore";

export function useProducts() {
  const setProducts=useProductsStore((state)=>state.setProducts)
  const setLoading =useProductsStore((state)=>state.setLoading)
  const setError =useProductsStore((state)=>state.setError )
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res=await getProducts()
      if(res.data){
        setProducts(res.data)
        // console.log(res.data);
      }else{
        setProducts([])
      }
        
      return res.data
    },
        onError: (err) => {
      setError(err.message);
      setLoading(false);
    },
    onSettled:()=>{
      setLoading(false)
    },
    onMutate:()=>{
      setLoading(true)
      setError(null)
    }
  });
}

export function useSingleProduct(id){
  return useQuery({
    queryKey:["products",id],
    queryFn:async()=>(await getSingleProduct(id)).data,
    enabled:!!id
  })
}