import React, { useEffect,useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser';
import { useGetCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from "../hooks/useCategories";

function ProtectedRoute({children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleAuthChange = () => {
      setToken(localStorage.getItem("token")); // update token state
    };
    // event listener lagao
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      // cleanup
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

    if(!token) {
        return <Navigate to="/login" replace />
    }
    const userId=localStorage.getItem("userId")
    useUser(userId)
    useGetCart(userId)
    const products=useProducts()
    const categories= useCategories()
    // console.log(categories);
    
  return children 
}

export default ProtectedRoute