import React, { useEffect, useState } from 'react'
import loginImg from '../../assets/images/loginImg.png'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signup ,login} from '../../api/auth';
import { toast } from 'react-toastify';
import { useLogin } from '../../hooks/useLogin';
import AppLink from '../../components/AppLink';

function Signup() {
  const [showHidePass,setShowHidePass]=useState(false)
  const [formData,setFormData]=useState({
      name:'',
      email:'',
      password:''
    })
const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange=(e)=>{
      const{name,value}=e.target
      setFormData(prev=>({
        ...prev,[name]:value
      }))
    }

    const { handleLogin }=useLogin()

    const signUp=async(e)=>{
      e.preventDefault()

      if(formData.name === '' || formData.email === '' || formData.password === ''){
        alert('Fill all fields.')
        return
      }
      setLoading(true)
      try {
        const response=await signup(formData)
        // console.log(response);
        
        if(response.status===201){
         handleLogin({
            email:formData.email,
            password:formData.password
          })
            navigate("/");
        }else{
                toast.error('Error in Signup')
        }
      } catch (error) {
        console.error("Axios error:", error.response?.data, error);
        toast.error(error.response?.data?.message || "Login failed ❌")
      }finally{
        setLoading(false)
      }
    }
  return (
      <div className="min-h-screen flex items-center justify-center px-5 py-5 bg-gray-200">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-2xl w-full overflow-hidden" style={{maxWidth: 1000}}>
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-purple py-10 px-10 text-center">
            <img src={loginImg} />
            <h2 className="text-white text-2xl font-bold mt-6">Welcome!</h2>
              <p className="text-purple-200 mt-2">
                Already have an account?
              </p>
              <AppLink to="/login" 
                className="mt-4 px-6 py-2 inline-block bg-white text-purple-700 rounded-full font-semibold hover:bg-purple-50 transition-all"
              >
                Login
              </AppLink>
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                <p>Enter your information to register</p>
              </div>
              <form onSubmit={signUp}>
                  <div className="w-full mb-5">
                    <label htmlFor="fullName" className="text-xs font-semibold px-1 text-black mb-1">Full name</label>
                      <input type="text" id='fullName' name='name' onChange={handleInputChange} className="w-full  px-3 py-2 rounded-lg border-1 border-gray-200 outline-none focus:border-purple" placeholder="John Smith" />
                  </div>

                  <div className="w-full flex flex-col mb-5">
                    <label htmlFor="email" className="text-xs font-semibold px-1 text-black mb-1">Email</label>
                      <input type="email" id='email' name='email' onChange={handleInputChange} className="w-full  px-3 py-2 rounded-lg border-1 border-gray-200 outline-none focus:border-purple" placeholder="johnsmith@example.com" />
                  </div>

                  <div className="w-full mb-8">
                    <label htmlFor="password" className="text-xs font-semibold px-1 text-black mb-1">Password</label>
                    <div className="flex relative">
                        <input type={showHidePass ? "text" : "password"}
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

                  <div className="w-full mb-5">
                    <button className="flex items-center justify-center w-full bg-purple text-white rounded-lg px-3 py-3 font-semibold">
                      {loading && (
                     <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                  )}
                      REGISTER NOW</button>
                  </div>

                <div className="text-center mt-6">
                <p className="text-gray-600">
                  Already have an account?
                   {' '}<AppLink to="/login"
                    type="button"
                    
                    className="text-purple-600 font-semibold hover:underline focus:outline-none"
                  >
                    Login
                  </AppLink>
                </p>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Signup