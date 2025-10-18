import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Cart from "../Pages/PrivatePages/Ecommerce/Cart";
import Checkout from "../Pages/PrivatePages/Ecommerce/Checkout";
import Shop from "../Pages/PrivatePages/Ecommerce/Shop";
import ProductDetails from "../Pages/PrivatePages/Ecommerce/ProductDetails";
import Home from "../Pages/Home";
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/Layout';


function PrivateRouter() {
  return (
    <Routes>
      <Route element={<ProtectedRoute><Layout header={true} footer={true} /></ProtectedRoute>}>
            <Route path='/' element={<Home/>} />
            <Route path='/shop' element={<Shop/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/product-details' element={<ProductDetails/>} />
            <Route path='/cart' element={<Cart/>} />
      </Route>

            {/* Agar koi unknown route aaye to login pe redirect kar do */}
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
  )
}

export default PrivateRouter