import React, { useEffect, useState } from 'react'
import loginImg from '../../assets/images/loginImg.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from '../../api/auth';
import { toast } from 'react-toastify';
import { useLogin } from '../../hooks/useLogin';

function Login() {
    const [showHidePass,setShowHidePass]=useState(false)
  const [formData,setFormData]=useState({
    email:'test@gmail.com',
    password:'test'
  })
    // const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

  const handleInputChange=(e)=>{
    const{name,value}=e.target
    setFormData(prev=>({
      ...prev,[name]:value
    }))
  }
   const { handleLogin, loading }=useLogin()
const loginFormSubmit = (e) => {
  e.preventDefault();
  handleLogin(formData);
  navigate("/");
}

  return (

  <div className="h-full flex items-center justify-center px-5 py-5 bg-gray-200">
    <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-2xl w-full overflow-hidden" style={{maxWidth: 1000}}>
      <div className="md:flex w-full">
        <div className="hidden md:block w-1/2 bg-purple py-10 px-10 text-center">
        <img src={loginImg} />
        <h2 className="text-white text-2xl font-bold mt-6">Welcome!</h2>
              <p className="text-purple-200 mt-2">
                Don't have an account? Register now!
              </p>
              <Link to="/signup" 
                className="mt-4 px-6 py-2 inline-block bg-white text-purple-700 rounded-full font-semibold hover:bg-purple-50 transition-all"
              >
                Register
              </Link>
        </div>
        <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
          <div className="text-center mb-10">
            <h1 className="font-bold text-3xl text-gray-900">LOGIN</h1>
            <p>Sign in to continue to your account</p>
          </div>
          <form onSubmit={loginFormSubmit}>

            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <label htmlFor="email" className="text-xs font-semibold px-1 text-black mb-1">Email</label>
                  <input type="email" id='email' onChange={handleInputChange} name='email' defaultValue='test@gmail.com' className="w-full px-3 py-2 rounded-lg border-1 border-gray-200 outline-none focus:border-purple" placeholder="johnsmith@example.com" />
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-6">
                <label htmlFor="password" className="text-xs font-semibold px-1 text-black mb-1">Password</label>
                <div className="flex relative">
                  <input type={showHidePass ? "text" : "password"} defaultValue='test'
                    id="password" name="password" onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border-1 border-gray-200 outline-none focus:border-purple"
                    placeholder="************"
                  />
                  <button
                    type="button"
                    onClick={() => setShowHidePass(!showHidePass)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showHidePass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex -mx-3 mb-5">
                  <div className="w-full px-3 flex justify-between items-center">
                    
                    <a href="#" className="text-purple-600 text-sm hover:underline">Forgot password?</a>
                  </div>
                </div>
              <div className="w-full mb-5">
                <button className=" w-full bg-purple text-white rounded-lg px-3 py-3 font-semibold flex items-center justify-center">
                  {loading && (
                     <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                  )}
                  Login
                  </button>
              </div>

            
          </form>
          <div className="text-center mt-6">
                <p className="text-gray-600">
                  Don't have an account?
                  {" "}<Link to="/signup"
                    type="button"
                    
                    className="text-purple-600 font-semibold hover:underline focus:outline-none"
                  >
                    Register
                  </Link>
                </p>
              </div>
        </div>
      </div>
    </div>
  </div>


  )
}

export default Login