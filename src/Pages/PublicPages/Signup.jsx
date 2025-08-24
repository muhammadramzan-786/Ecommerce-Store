import React, { useEffect, useState } from 'react'
import loginImg from '../../assets/images/loginImg.png'
import { Link } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const [showHidePass,setShowHidePass]=useState(false)
  const [formData,setFormData]=useState({
      fullName:'',
      email:'',
      password:''
    })
    const handleInputChange=(e)=>{
      const{name,value}=e.target
      setFormData(prev=>({
        ...prev,[name]:value
      }))
    }
  
    useEffect(()=>{
      console.log(formData);
      
    },[formData])
  return (
    <div>
      <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-2xl w-full overflow-hidden" style={{maxWidth: 1000}}>
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-purple py-10 px-10 text-center">
            <img src={loginImg} />
            <h2 className="text-white text-2xl font-bold mt-6">Welcome!</h2>
              <p className="text-purple-200 mt-2">
                Already have an account?
              </p>
              <Link to="/login" 
                className="mt-4 px-6 py-2 inline-block bg-white text-purple-700 rounded-full font-semibold hover:bg-purple-50 transition-all"
              >
                Login
              </Link>
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                <p>Enter your information to register</p>
              </div>
              <div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="fullName" className="text-xs font-semibold px-1">Full name</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg" /></div>
                      <input type="text" id='fullName' name='fullName' onChange={handleInputChange} className="w-full -ml-10 px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple" placeholder="John Smith" />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="email" className="text-xs font-semibold px-1">Email</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg" /></div>
                      <input type="email" id='email' name='email' onChange={handleInputChange} className="w-full -ml-10 px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple" placeholder="johnsmith@example.com" />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label htmlFor="password" className="text-xs font-semibold px-1">Password</label>
                    <div className="flex relative">
                      
                        <input type={showHidePass ? "text" : "password"}
                          id="password" name="password" onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple"
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
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button className="block w-full bg-purple text-white rounded-lg px-3 py-3 font-semibold">REGISTER NOW</button>
                  </div>
                </div>
                <div className="text-center mt-6">
                <p className="text-gray-600">
                  Already have an account?
                   {' '}<Link to="/login"
                    type="button"
                    
                    className="text-purple-600 font-semibold hover:underline focus:outline-none"
                  >
                    Login
                  </Link>
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup