import React, { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ContactUs from '../Pages/ContactUs';

const ProfileLayout=lazy(()=>import("../Pages/PrivatePages/ProfileLayout"))
const Profile=lazy(()=>import("../Pages/PrivatePages/Profile"))
const Orders=lazy(()=>import("../Pages/PrivatePages/Orders"))
const Layout=lazy(()=>import("../components/Layout"))
const ProtectedRoute=lazy(()=>import("./ProtectedRoute"))
const Home=lazy(()=>import("../Pages/Home"))
const ProductDetails=lazy(()=>import("../Pages/PublicPages/ProductDetails"))
const Shop=lazy(()=>import("../Pages/PublicPages/Shop"))
const Checkout=lazy(()=>import("../Pages/PrivatePages/Checkout"))
const Cart=lazy(()=>import("../Pages/PublicPages/Cart"))
const Category=lazy(()=>import("../Pages/PublicPages/Category"))
const ChangePassword=lazy(()=>import("../Pages/PrivatePages/ChangePassword"))

function PrivateRouter() {
  //   const location=useLocation()
  // useEffect(()=>{
  //   window.scrollTo({
  //       top:0,
  //       left:0,
  //       behavior:"smooth"
  //   })
  // },[location])
  return (
    <Suspense fallback={<div>Loading ....</div>}>
    <Routes>
      <Route element={<ProtectedRoute><Layout header={true} footer={true} /></ProtectedRoute>}>
            <Route path='/' element={<Home/>} />
            <Route path='/shop' element={<Shop/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/product-details/:id' element={<ProductDetails/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/contactUs' element={<ContactUs/>} />
            <Route path='/category/:name' element={<Category/>} />
            
            
            <Route path='/profileLayout' element={<ProfileLayout/>} >
              <Route index element={<Profile/>} />
              <Route path='orders' element={<Orders/>} />
              <Route path='changePassword' element={<ChangePassword/>} />
            </Route>
      </Route>

            {/* Agar koi unknown route aaye to login pe redirect kar do */}
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
        </Suspense>
  )
}

export default PrivateRouter