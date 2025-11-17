import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Cart from "../Pages/PrivatePages/Cart";
import Checkout from "../Pages/PrivatePages/Checkout";
import Shop from "../Pages/PrivatePages/Shop";
import ProductDetails from "../Pages/PrivatePages/ProductDetails";
import Home from "../Pages/Home";
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/Layout';
import Orders from '../Pages/PrivatePages/Orders';
import Profile from '../Pages/PrivatePages/Profile';
import ProfileLayout from '../Pages/PrivatePages/ProfileLayout';


function PrivateRouter() {
    const location=useLocation()
  useEffect(()=>{
    window.scrollTo({
        top:0,
        left:0,
        behavior:"smooth"
    })
  },[location])
  return (
    <Routes>
      <Route element={<ProtectedRoute><Layout header={true} footer={true} /></ProtectedRoute>}>
            <Route path='/' element={<Home/>} />
            <Route path='/shop' element={<Shop/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/product-details/:id' element={<ProductDetails/>} />
            <Route path='/cart' element={<Cart/>} />
            
            <Route path='/profileLayout' element={<ProfileLayout/>} >
              <Route index element={<Profile/>} />
              <Route path='orders' element={<Orders/>} />
            </Route>
      </Route>

            {/* Agar koi unknown route aaye to login pe redirect kar do */}
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
  )
}

export default PrivateRouter