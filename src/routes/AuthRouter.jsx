import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Pages/PublicPages/Login";
import Signup from "../Pages/PublicPages/Signup";
import ForgotPassword from "../Pages/PublicPages/ForgotPassword";
import Layout from '../components/Layout';

function AuthRouter() {
  return (
    <Routes>
      <Route element={<Layout header={false} footer={false} />}>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
      </Route>
        {/* Agar koi unknown route aaye to login pe redirect kar do */}
        <Route path='*' element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default AuthRouter