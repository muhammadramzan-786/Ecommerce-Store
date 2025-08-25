import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Cart from "../Pages/PrivatePages/Ecommerce/Cart";
import Checkout from "../Pages/PrivatePages/Ecommerce/Checkout";
import Shop from "../Pages/PrivatePages/Ecommerce/Shop";
import ProductDetails from "../Pages/PrivatePages/Ecommerce/ProductDetails";
import Home from "../Pages/Home";
import ProtectedRoute from './ProtectedRoute';


function PrivateRouter() {
  return (
    <Routes>
            <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
            <Route path='/shop' element={<ProtectedRoute><Shop/></ProtectedRoute>} />
            <Route path='/checkout' element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
            <Route path='/checkout' element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
            <Route path='/product-details' element={<ProductDetails/>} />
            <Route path='/cart' element={<Cart/>} />
            {/* Agar koi unknown route aaye to login pe redirect kar do */}
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
  )
}

export default PrivateRouter