import React, { useEffect,useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser';
import { useGetCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from "../hooks/useCategories";
import { useAuthStore } from '../hooks/useAuthStore';

function ProtectedRoute({children }) {
    const token=useAuthStore(state=>state.token)
    const userId=useAuthStore(state=>state.userId)
    useUser(userId)
    useGetCart(userId)
    useProducts()
     useCategories()
    // console.log(categories);

  // useEffect(() => {
  //   const handleAuthChange = () => {
  //     setToken(localStorage.getItem("token")); // update token state
  //   };
  //   // event listener lagao
  //   window.addEventListener("authChange", handleAuthChange);

  //   return () => {
  //     // cleanup
  //     window.removeEventListener("authChange", handleAuthChange);
  //   };
  // }, []);

    if(!token) {
        return <Navigate to="/" replace />
    }

    
  return children 
}

export default ProtectedRoute