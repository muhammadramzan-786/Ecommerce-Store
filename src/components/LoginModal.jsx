import React, { useEffect, useState } from 'react'
import Button from './Button'
import { FaTimes } from "react-icons/fa";
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useAuthStore } from '../hooks/useAuthStore';
import { useGetCart } from '../hooks/useCart';

function LoginModal({ isModal, closeModal }) {
  const [showHidePass, setShowHidePass] = useState(false)
  const userId = useAuthStore(state=>state.userId)
  const { refetch } = useGetCart(userId);

  const [formData, setFormData] = useState({
    email: 'test@gmail.com',
    password: 'test'
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev, [name]: value
    }))
  }

  useEffect(()=>{
        if(userId){
        console.log("in");
        
        refetch()
    }
  },[userId])
  const { handleLogin, loading } = useLogin()

  const loginFormSubmit = (e) => {
    e.preventDefault();
    handleLogin(formData, closeModal);

    
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center p-4 z-50 transition-all duration-500 ${
      isModal 
        ? "opacity-100 visible backdrop-blur-sm bg-black/50" 
        : "opacity-0 invisible backdrop-blur-0 bg-black/0"
    }`}>
      
      {/* Modal Container */}
      <div className={`relative w-full max-w-md transform transition-all duration-500 ${
        isModal ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
      }`}>
        
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute -top-3 -right-3 p-3 bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10 group"
        >
          <FaTimes className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        {/* Modal Content */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-5 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <FaLock className="text-white text-2xl" />
            </div>
            <h1 className="font-bold text-2xl text-white mb-2">Welcome Back</h1>
            <p className="text-blue-100 text-sm">Sign in to continue to your account</p>
          </div>

          {/* Form Section */}
          <div className="px-6 py-8">
            <form onSubmit={loginFormSubmit} className="space-y-6">
              
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <FaEnvelope className="w-4 h-4 mr-2 text-purple-600" />
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    id="email" 
                    onChange={handleInputChange} 
                    name="email" 
                    defaultValue="test@gmail.com" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    placeholder="johnsmith@example.com" 
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <FaLock className="w-4 h-4 mr-2 text-purple-600" />
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input 
                    type={showHidePass ? "text" : "password"} 
                    defaultValue="test"
                    id="password" 
                    name="password" 
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowHidePass(!showHidePass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showHidePass ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl py-4 font-semibold flex items-center justify-center transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-xl disabled:shadow"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Demo Credentials */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mt-3">
                <p className="text-sm text-blue-800 font-medium text-center">
                  Demo Credentials
                </p>
                <p className="text-xs text-blue-600 text-center mt-1">
                  Email: test@gmail.com | Password: test
                </p>
              </div>
            </form>

            {/* Footer */}
            <div className="text-center mt-5 pt-5 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold transition-colors hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal