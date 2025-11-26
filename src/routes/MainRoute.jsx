// import React, { useEffect, useState } from 'react'
// import { BrowserRouter } from 'react-router-dom'
// import PrivateRouter from './PrivateRouter'
// import AuthRouter from './AuthRouter'
import React, { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import Login from "../Pages/PublicPages/Login";
import Signup from "../Pages/PublicPages/Signup";
import ForgotPassword from "../Pages/PublicPages/ForgotPassword";
import ContactUs from '../Pages/ContactUs';
import { useUser } from '../hooks/useUser';
import { useGetCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useAuthStore } from '../hooks/useAuthStore';
// function MainRoute() {
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   useEffect(() => {
//     const handleAuthChange = () => {
//       setToken(localStorage.getItem("token")); // update token state
//     };

//     // event listener lagao
//     window.addEventListener("authChange", handleAuthChange);

//     return () => {
//       // cleanup
//       window.removeEventListener("authChange", handleAuthChange);
//     };
//   }, []);

//   return (
//     <BrowserRouter>
//       {token ? <PrivateRouter /> : <AuthRouter />}
//     </BrowserRouter>
//   )
// }

// export default MainRoute

function MainRoute() {
    const token=useAuthStore(state=>state.token)
    const userId=useAuthStore(state=>state.userId)
    useUser(userId)
    useGetCart(userId)
    useProducts()
    useCategories()
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route element={<Layout header={true} footer={true} />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/category/:name" element={<Category />} />
        </Route>

        {/* Private Pages */}
        <Route element={<ProtectedRoute><Layout header={true} footer={true} /></ProtectedRoute>}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profileLayout" element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="changePassword" element={<ChangePassword />} />
          </Route>
        </Route>

        {/* Auth Pages */}
        <Route element={<Layout header={false} footer={false} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default MainRoute