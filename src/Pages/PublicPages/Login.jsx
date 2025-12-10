import React, { useState } from "react";
import loginImg from "../../assets/images/loginImg.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLogin } from "../../hooks/useLogin";
import AppLink from "../../components/AppLink";
import Input from "../../components/Input";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from "../../validation/loginSchema";

function Login() {
  const [showHidePass, setShowHidePass] = useState(false);
  const [formData, setFormData] = useState({
    email: "test@gmail.com",
    password: "test",
  });

  const {register, handleSubmit, formState:{errors } ,trigger}=useForm({resolver : yupResolver(loginSchema),defaultValues:{
    email: "test@gmail.com",
    password: "test",
  },
  mode: "onChange",           // typing par validate
  reValidateMode: "onChange"
})
  
  const navigate = useNavigate();

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const { handleLogin, loading, error } = useLogin();

  const loginFormSubmit = async (data) => {
    const success = await handleLogin(data);

    if (success) {
      navigate("/");
    }
  };

const { googleLogin, siUpLoading, userExLoading, loginLoading } = useGoogleAuth()
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      {(loading || siUpLoading || userExLoading || loginLoading) && (
        <div className="fixed inset-0 z-40 bg-[#0000007a] h-screen w-screen flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div
        className="bg-white rounded-3xl shadow-2xl w-full overflow-hidden border border-gray-100"
        style={{ maxWidth: 1200 }}
      >
        <div className="flex flex-col lg:flex-row w-full">
          {/* Left Side - Image Section */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 py-12 px-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 flex flex-col justify-center items-center text-center w-full">
              <div className="mb-8">
                <img
                  src={loginImg}
                  alt="Login"
                  className="w-80 h-80 object-contain drop-shadow-2xl"
                />
              </div>
              <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-purple-100 text-lg mb-8 max-w-md">
                Sign in to access your personalized dashboard and continue your
                shopping journey.
              </p>
              <div className="w-24 h-1 bg-white/30 rounded-full mb-6"></div>
              <p className="text-purple-200 mb-6">New to our platform?</p>
              <AppLink
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 hover:scale-105"
              >
                Create Account
                <FaArrowRight className="text-sm" />
              </AppLink>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full lg:w-1/2 py-12 px-8 lg:px-12">
            <div className="max-w-md mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="lg:hidden mb-6">
                  <img
                    src={loginImg}
                    alt="Login"
                    className="w-32 h-32 mx-auto object-contain"
                  />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">
                  Welcome Back
                </h1>
                <p className="text-gray-600 text-lg">
                  Sign in to your account to continue
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-fade-in">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    {error}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(loginFormSubmit)} className="space-y-5">
                {/* Email Input */}
                <div className="space-y-2 mb-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </label>
                  <Input {...register("email")} onBlur={() => trigger("email")}
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    error={errors.email}
                  />
                   <p className={`text-red-500 text-sm mt-1 h-5 transition-opacity duration-200 ${errors.email ? "opacity-100" : "opacity-0"}`}>
  {errors.email?.message || " "}
</p>

                </div>

                {/* Password Input */}
                <div className="space-y-2 mb-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Password
                    </label>
                    <AppLink
                      to="/forgotPassword"
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
                    >
                      Forgot password?
                    </AppLink>
                  </div>
                  <div className="relative">
                    <Input {...register("password")}
                      type={showHidePass ? "text" : "password"} onBlur={() => trigger("password")}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      error={errors.password}
                    />
                    <button
                      type="button"
                      onClick={() => setShowHidePass(!showHidePass)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showHidePass ? (
                        <FaEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                               <p className={`text-red-500 text-sm mt-1 h-5 transition-opacity duration-200 ${errors.password ? "opacity-100" : "opacity-0"}`}>
  {errors.password?.message || " "}
</p>
          
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing In...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      Sign In
                      <FaArrowRight className="text-sm" />
                    </div>
                  )}
                </button>

                {/* Divider */}
                <div className="relative flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-500 text-sm">
                    Or continue with
                  </span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={googleLogin}
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

              {/* Sign Up Link */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <AppLink
                    to="/signup"
                    className="text-purple-600 font-semibold hover:text-purple-700 transition-colors hover:underline"
                  >
                    Create account
                  </AppLink>
                </p>
              </div>

              {/* Security Note */}
              <div className="text-center mt-6">
                <p className="text-xs text-gray-500">
                  Your data is securely encrypted and protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Login;
