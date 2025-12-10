import React, { useState } from 'react'
import loginImg from '../../assets/images/loginImg.png'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import { useLogin } from '../../hooks/useLogin';
import AppLink from '../../components/AppLink';
import Input from "../../components/Input";
import { useSignUp } from '../../hooks/useUser';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '../../validation/signupSchema';

function Signup() {
  const [showHidePass, setShowHidePass] = useState(false)

  const {register,handleSubmit, reset,formState:{errors},trigger}=useForm({
    resolver:yupResolver(signupSchema),
    defaultValues:{
    name: '',
    email: '',
    password: ''
  },
  mode:"onChange",
  reValidateMode:"onChange"
  })

  const navigate = useNavigate();
  const { loading:loginLoading, handleLogin } = useLogin()

  const { isPending:loading, mutate, isError, error }=useSignUp()

  const signUp = (data) => {
  mutate(data, {
    onSuccess:async () => {
          const success=await handleLogin({
          email: data.email,
          password: data.password
        })
        if(success){
          reset()
          navigate("/");
        }  
    },
  });
};

const { googleLogin, siUpLoading, userExLoading, loginLoading:lgLoading } = useGoogleAuth()
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50  to-emerald-100">
      {(loginLoading || siUpLoading || userExLoading || lgLoading) && (
        <div className='fixed inset-0 z-40 bg-[#0000007a] h-screen w-screen flex items-center justify-center'>
          <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="bg-white rounded-3xl shadow-2xl w-full overflow-hidden border border-gray-100" style={{ maxWidth: 1200 }}>
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left Side - Image Section */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 py-12 px-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 flex flex-col justify-center items-center text-center w-full">
              <div className="mb-8">
                <img 
                  src={loginImg} 
                  alt="Sign Up" 
                  className="w-80 h-80 object-contain drop-shadow-2xl"
                />
              </div>
              <h2 className="text-4xl font-bold mb-4">Join Us Today!</h2>
              <p className="text-green-100 text-lg mb-8 max-w-md">
                Create your account and discover a world of amazing products with exclusive member benefits.
              </p>
              <div className="w-24 h-1 bg-white/30 rounded-full mb-6"></div>
              <p className="text-green-200 mb-6">
                Already have an account?
              </p>
              <AppLink 
                to="/login" 
                className="inline-flex items-center gap-2 px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 hover:scale-105"
              >
                Sign In
                <FaArrowRight className="text-sm" />
              </AppLink>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="w-full lg:w-1/2 py-12 px-8 lg:px-12">
            <div className="max-w-md mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="lg:hidden mb-6">
                  <img 
                    src={loginImg} 
                    alt="Sign Up" 
                    className="w-32 h-32 mx-auto object-contain"
                  />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text ">
                  Create Account
                </h1>
                <p className="text-gray-600 text-lg">
                  Join thousands of happy customers
                </p>
              </div>

              <form onSubmit={handleSubmit(signUp)} className="space-y-5">
                {/* Full Name Input */}
                <div className="space-y-1 mb-1">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                    <Input {...register("name")} error={errors.name} onBlur={()=>trigger("name")} id="name"  name="name" placeholder="Enter your full name" />
                    <p className={`text-red-500 text-sm mt-1 h-5 transition-opacity duration-200 ${errors.name ? "opacity-100" : "opacity-0"}`}>
                      {errors.name?.message || " "}
                    </p>
                </div>

                {/* Email Input */}
                <div className="space-y-1 mb-1">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                    <Input {...register("email")} error={errors.email} onBlur={()=>trigger("email")} type="email" id="email" 
                      name="email" placeholder="Enter your email" />
                    <p className={`text-red-500 text-sm mt-1 h-5 transition-opacity duration-200 ${errors.email ? "opacity-100" : "opacity-0"}`}>
                      {errors.email?.message || " "}
                    </p>
                </div>

                {/* Password Input */}
                <div className="space-y-1 mb-1">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Input {...register("password")} error={errors.password} onBlur={()=>trigger("password")}
                      type={showHidePass ? "text" : "password"}
                      id="password" name="password" placeholder="Create a strong password" />
                    <button
                      type="button"
                      onClick={() => setShowHidePass(!showHidePass)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showHidePass ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className={`text-red-500 text-sm mt-1 h-5 transition-opacity duration-200 ${errors.password ? "opacity-100" : "opacity-0"}`}>
                    {errors.password?.message || " "}
                  </p>
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3 px-4 mt-2 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      Create Account
                      <FaArrowRight className="text-sm" />
                    </div>
                  )}
                </button>

                {/* Divider */}
                <div className="relative flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-500 text-sm">Or sign up with</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Social Sign Up Buttons */}
                <div className="grid grid-cols-1 gap-4">
                  <button onClick={googleLogin}
                    type="button"
                    className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors font-medium"
                  >
                    <FcGoogle className="text-red-500 text-2xl" />
                    Google
                  </button>
                  {/* <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors font-medium"
                  >
                    <FaFacebook className="text-blue-600" />
                    Facebook
                  </button> */}
                </div>
              </form>

              {/* Login Link */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <AppLink 
                    to="/login"
                    className="text-[#4B3EC4] font-semibold hover:opacity-90 transition-colors hover:underline"
                  >
                    Sign in
                  </AppLink>
                </p>
              </div>

              {/* Security Note */}
              <div className="text-center mt-6">
                <p className="text-xs text-gray-500">
                  Your personal information is securely encrypted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup